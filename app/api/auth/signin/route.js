import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase, memoryUserStore } from '@/app/lib/mongodb';
import User from '@/app/lib/models/User';
import { createToken } from '@/app/lib/auth-server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Please enter both email and password.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const db = await connectToDatabase();

    let user = null;

    if (db) {
      user = await User.findOne({ email: normalizedEmail }).lean();
    } else {
      user = memoryUserStore.get(normalizedEmail);
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const userRecord = {
      id: user._id ? user._id.toString() : user.id,
      email: user.email,
      plan: user.plan || 'Premium',
      created_at: user.created_at || user.createdAt || new Date().toISOString(),
    };

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
    console.error('[API /api/auth/signin error]:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred during sign in' },
      { status: 500 }
    );
  }
}
