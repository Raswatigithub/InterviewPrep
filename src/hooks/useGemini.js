import { useCallback, useEffect, useState } from 'react';
import { callGemini } from '../services/geminiService';

const CACHE_STORAGE_KEY = 'exam-prep-gemini-cache-v1';
const DEFAULT_COOLDOWN_SECONDS = 45;

function extractRetrySeconds(error) {
  const message = error?.payload?.message || error?.message || '';
  const match = message.match(/retry in ([0-9]+(?:\.[0-9]+)?)s/i);

  if (match) {
    const parsed = Number(match[1]);
    if (!Number.isNaN(parsed) && parsed > 0) {
      return Math.ceil(parsed);
    }
  }

  if (error?.status === 429) {
    return DEFAULT_COOLDOWN_SECONDS;
  }

  return 0;
}

export function useGemini() {
  const [loadingKey, setLoadingKey] = useState(null);
  const [error, setError] = useState('');
  const [cooldowns, setCooldowns] = useState({});
  const [tick, setTick] = useState(Date.now());

  // Purge any stale client-side cache from localStorage so all AI responses are served by backend
  useEffect(() => {
    try {
      window.localStorage.removeItem(CACHE_STORAGE_KEY);
    } catch {
      // Ignore storage cleanup failures
    }
  }, []);

  useEffect(() => {
    const hasActiveCooldown = Object.values(cooldowns).some((endsAt) => endsAt > Date.now());

    if (!hasActiveCooldown) {
      return undefined;
    }

    const intervalId = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(intervalId);
  }, [cooldowns]);

  const clearCache = useCallback(() => {
    try {
      window.localStorage.removeItem(CACHE_STORAGE_KEY);
    } catch {
      // Ignore cache clearing errors.
    }
  }, []);

  const generate = useCallback(
    async ({ key, prompt, systemPrompt }) => {
      setLoadingKey(key);
      setError('');

      try {
        // Fetch fresh result directly from interviewprep-backend
        const result = await callGemini({ prompt, systemPrompt });
        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unable to reach the AI tutor.';
        const normalizedError = new Error(message);
        normalizedError.status = err?.status;
        normalizedError.payload = err?.payload;

        const retrySeconds = extractRetrySeconds(err);
        if (retrySeconds > 0 && key) {
          setCooldowns((current) => ({
            ...current,
            [key]: Date.now() + retrySeconds * 1000,
          }));
          normalizedError.retrySeconds = retrySeconds;
        }

        setError(message);
        throw normalizedError;
      } finally {
        setLoadingKey(null);
      }
    },
    [],
  );

  const clearError = useCallback(() => setError(''), []);

  const getCooldownSeconds = useCallback(
    (key) => {
      const endsAt = cooldowns[key];
      if (!endsAt) {
        return 0;
      }

      return Math.max(0, Math.ceil((endsAt - tick) / 1000));
    },
    [cooldowns, tick],
  );

  const isCoolingDown = useCallback((key) => getCooldownSeconds(key) > 0, [getCooldownSeconds]);

  const getCooldownLabel = useCallback(
    (key, fallbackLabel) => {
      const seconds = getCooldownSeconds(key);
      return seconds > 0 ? `Retry in ${seconds}s` : fallbackLabel;
    },
    [getCooldownSeconds],
  );

  return {
    clearCache,
    clearError,
    error,
    generate,
    getCooldownLabel,
    getCooldownSeconds,
    isCoolingDown,
    isLoading: (key) => loadingKey === key,
    loadingKey,
  };
}
