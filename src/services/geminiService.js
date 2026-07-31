import { getApiBaseUrl, requestJson } from './apiClient';
import { getStoredAuthSession } from './authService';

export async function callGemini({
  prompt,
  systemPrompt,
  retries = 5,
}) {
  const session = getStoredAuthSession();
  const headers = {};
  if (session?.token) {
    headers.Authorization = `Bearer ${session.token}`;
  }

  // Merge role/systemPrompt directly into prompt to prevent backend systemInstruction token limits
  const fullPrompt = systemPrompt
    ? `Role/Instructions: ${systemPrompt}\n\nTask:\n${prompt}`
    : prompt;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await requestJson('/api/ai/generate', {
        method: 'POST',
        headers,
        body: {
          prompt: fullPrompt,
        },
        timeoutMs: 30000,
      });

      const text = response?.data?.text;

      if (!text) {
        throw new Error('AI returned an empty response.');
      }

      return text;
    } catch (error) {
      const status = error?.status;
      const retryable = !status || status >= 500;

      if (attempt < retries && retryable) {
        await new Promise((resolve) => window.setTimeout(resolve, 800 * 2 ** attempt));
        continue;
      }

      const message =
        error instanceof Error ? error.message : `Unable to reach the AI tutor at ${getApiBaseUrl()}.`;
      throw new Error(message);
    }
  }

  throw new Error('Unable to reach the AI tutor right now.');
}
