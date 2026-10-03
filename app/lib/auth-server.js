import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'netflix_clone_default_jwt_secret_key_2026';

export function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return null;
  }
}

export async function getSessionUser(req) {
  // 1. Check Authorization header
  if (req) {
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = verifyToken(token);
      if (decoded) return decoded;
    }
  }

  // 2. Check cookies
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('netflix_session')?.value;
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) return decoded;
    }
  } catch (err) {
    // If running in environment where cookies() throws
  }

  return null;
}
