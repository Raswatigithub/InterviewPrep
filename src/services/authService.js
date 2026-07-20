import { requestJson } from './apiClient';

const AUTH_STORAGE_KEY = 'interview-prep-auth-session';

export function getStoredAuthSession() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function persistAuthSession(session) {
  if (typeof window === 'undefined') {
    return;
  }

  if (!session) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export async function loginUser(credentials) {
  const response = await requestJson('/api/auth/login', {
    method: 'POST',
    body: {
      email: credentials.email,
      password: credentials.password,
    },
  });

  const authData = response?.data ?? response;
  const session = {
    token: authData?.token ?? null,
    user: authData?.user ?? null,
  };

  persistAuthSession(session);
  return {
    token: session.token,
    user: session.user,
    message: response?.message || 'Login successful.',
  };
}

export async function registerUser(payload) {
  const response = await requestJson('/api/auth/register', {
    method: 'POST',
    body: {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    },
  });

  const authData = response?.data ?? response;
  const session = {
    token: authData?.token ?? null,
    user: authData?.user ?? null,
  };

  persistAuthSession(session);
  return {
    token: session.token,
    user: session.user,
    message: response?.message || 'Registration successful.',
  };
}

export async function logoutUser() {
  const session = getStoredAuthSession();

  try {
    if (session?.token) {
      await requestJson('/api/auth/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
    }
  } catch {
    // Ignore logout API failure and clear the client session anyway.
  } finally {
    persistAuthSession(null);
  }
}

export async function getCurrentUser() {
  const session = getStoredAuthSession();

  if (!session?.token) {
    return null;
  }

  try {
    const response = await requestJson('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });

    return response?.data ?? response;
  } catch (error) {
    if (error?.status === 401) {
      persistAuthSession(null);
    }
    throw error;
  }
}
