import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Test:CUHSb1Q37L0Na1JP@cluster0.ip1tc2f.mongodb.net/Netflix-clone?retryWrites=true&w=majority&appName=Cluster0';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development and serverless route executions.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, isConnected: false };
}

// In-memory fallback user store in case network connectivity to external Atlas is restricted
export const memoryUserStore = global.memoryUserStore || new Map();
if (!global.memoryUserStore) {
  global.memoryUserStore = memoryUserStore;
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Critical: fail fast, do not hang requests
      serverSelectionTimeoutMS: 5000, // 5-second timeout for server selection
    };

    mongoose.set('bufferCommands', false);

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        cached.isConnected = true;
        return mongooseInstance;
      })
      .catch((err) => {
        console.warn('[MongoDB] Connection warning (fallback mode active):', err.message);
        cached.promise = null;
        cached.isConnected = false;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    cached.isConnected = false;
    console.warn('[MongoDB] Connection error, using memory fallback:', e.message);
    return null;
  }
}
