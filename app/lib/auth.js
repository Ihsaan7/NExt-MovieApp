'use client';

export const auth = {
  /**
   * Sign in with email & password via MongoDB API
   */
  async signInWithPassword({ email, password }) {
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { data: null, error: new Error(data.error || 'Invalid login credentials') };
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('netflix_current_user', JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem('netflix_token', data.token);
        }
      }

      return { data: { user: data.user }, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Sign up with email & password via MongoDB API
   */
  async signUp({ email, password, options = {} }) {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          marketing_opt_out: options?.data?.marketing_opt_out || false,
          plan: options?.data?.plan || 'Premium',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { data: null, error: new Error(data.error || 'Sign up failed') };
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('netflix_current_user', JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem('netflix_token', data.token);
        }
      }

      return { data: { user: data.user }, error: null };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Get current authenticated user
   */
  async getUser() {
    try {
      const headers = {};
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('netflix_token');
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      }

      const res = await fetch('/api/auth/me', { headers });
      const data = await res.json();

      if (data?.user) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('netflix_current_user', JSON.stringify(data.user));
        }
        return { data: { user: data.user }, error: null };
      }

      // Check fallback in localStorage if offline
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('netflix_current_user');
        if (saved) {
          try {
            return { data: { user: JSON.parse(saved) }, error: null };
          } catch (e) {}
        }
      }

      return { data: { user: null }, error: null };
    } catch (err) {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('netflix_current_user');
        if (saved) {
          try {
            return { data: { user: JSON.parse(saved) }, error: null };
          } catch (e) {}
        }
      }
      return { data: { user: null }, error: err };
    }
  },

  /**
   * Sign out current user and clear sessions
   */
  async signOut() {
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
    } catch (e) {}

    if (typeof window !== 'undefined') {
      localStorage.removeItem('netflix_current_user');
      localStorage.removeItem('netflix_token');
    }

    return { error: null };
  },
};
