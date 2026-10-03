import { NextResponse } from 'next/server';
import { getSessionUser } from '@/app/lib/auth-server';
import { connectToDatabase, memoryUserStore } from '@/app/lib/mongodb';
import User from '@/app/lib/models/User';

export async function GET(req) {
  try {
    const session = await getSessionUser(req);
    if (!session || !session.email) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Try to get fresh user info from DB if possible
    try {
      const db = await connectToDatabase();
      if (db) {
        const user = await User.findOne({ email: session.email }).select('-password').lean();
        if (user) {
          return NextResponse.json({
            user: {
              id: user._id.toString(),
              email: user.email,
              plan: user.plan || 'Premium',
              created_at: user.createdAt || user.created_at,
            },
          });
        }
      } else {
        const user = memoryUserStore.get(session.email);
        if (user) {
          return NextResponse.json({
            user: {
              id: user.id || user._id,
              email: user.email,
              plan: user.plan || 'Premium',
              created_at: user.created_at,
            },
          });
        }
      }
    } catch (e) {
      // Return session info as fallback
    }

    return NextResponse.json({
      user: {
        id: session.id,
        email: session.email,
        plan: session.plan || 'Premium',
        created_at: session.created_at,
      },
    });
  } catch (error) {
    console.error('[API /api/auth/me error]:', error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
