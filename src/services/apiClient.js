const DEFAULT_TIMEOUT_MS = 30000;
const DEFAULT_BASE_URL = 'https://interviewprep-backend-etik.onrender.com';
// const DEFAULT_BASE_URL = 'http://localhost:5000';

function getBaseUrl() {
  return (import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL).replace(/\/$/, '');
}

function buildUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getBaseUrl()}${normalizedPath}`;
}

async function readResponseBody(response) {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : {};
}

export async function requestJson(path, options = {}) {
  const {
    method = 'GET',
    body,
    headers = {},
    timeoutMs = DEFAULT_TIMEOUT_MS,
  } = options;

  const controller = new window.AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(buildUrl(path), {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });

    const payload = await readResponseBody(response);

    if (!response.ok) {
      const message =
        payload?.message ||
        payload?.error ||
        payload?.code ||
        `Request failed with status ${response.status}.`;
      const error = new Error(message);
      error.status = response.status;
      error.payload = payload;
      throw error;
    }

    return payload;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }

    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

export function getApiBaseUrl() {
  return getBaseUrl();
}
