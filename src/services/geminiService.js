import { requestJson } from './apiClient';
import { getApiBaseUrl } from './apiClient';

export async function callGemini({
  prompt,
  systemPrompt = 'You are a senior technical interviewer.',
  retries = 3,
}) {
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await requestJson('/api/ai/generate', {
        method: 'POST',
        body: {
          prompt,
          systemPrompt,
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
