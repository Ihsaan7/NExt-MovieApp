import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase, memoryUserStore } from '@/app/lib/mongodb';
import User from '@/app/lib/models/User';
import { createToken } from '@/app/lib/auth-server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, plan = 'Premium', marketing_opt_out = false } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);

    const db = await connectToDatabase();

    let userRecord = null;

    if (db) {
      // Real MongoDB operation
      const existingUser = await User.findOne({ email: normalizedEmail }).lean();
      if (existingUser) {
        return NextResponse.json(
          { error: 'This email is already registered.' },
          { status: 400 }
        );
      }

      const newUser = await User.create({
        email: normalizedEmail,
        password: hashedPassword,
        plan,
        marketing_opt_out: Boolean(marketing_opt_out),
      });

      userRecord = {
        id: newUser._id.toString(),
        email: newUser.email,
        plan: newUser.plan,
        created_at: newUser.createdAt || newUser.created_at || new Date().toISOString(),
      };
    } else {
      // Resilient fallback memory store
      if (memoryUserStore.has(normalizedEmail)) {
        return NextResponse.json(
          { error: 'This email is already registered.' },
          { status: 400 }
        );
      }

      const mockId = 'mem_' + Date.now();
      const mockUser = {
        id: mockId,
        _id: mockId,
        email: normalizedEmail,
        password: hashedPassword,
        plan,
        marketing_opt_out: Boolean(marketing_opt_out),
        created_at: new Date().toISOString(),
      };

      memoryUserStore.set(normalizedEmail, mockUser);
      userRecord = {
        id: mockUser.id,
        email: mockUser.email,
        plan: mockUser.plan,
        created_at: mockUser.created_at,
      };
    }

    const token = createToken({
      id: userRecord.id,
      email: userRecord.email,
      plan: userRecord.plan,
      created_at: userRecord.created_at,
    });

    const response = NextResponse.json({
      success: true,
      user: userRecord,
      token,
    });

    response.cookies.set('netflix_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('[API /api/auth/signup error]:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during sign up' },
      { status: 500 }
    );
  }
}
