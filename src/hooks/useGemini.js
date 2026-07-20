import { useCallback, useEffect, useRef, useState } from 'react';
import { callGemini } from '../services/geminiService';

const CACHE_STORAGE_KEY = 'exam-prep-gemini-cache-v1';
const DEFAULT_COOLDOWN_SECONDS = 45;
const MAX_CACHE_ENTRIES = 20;

function hashString(value) {
  let hash = 5381;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 33) ^ value.charCodeAt(index);
  }

  return `g${Math.abs(hash >>> 0).toString(36)}`;
}

function loadCache() {
  try {
    const raw = window.localStorage.getItem(CACHE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function persistCache(cache) {
  try {
    window.localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(cache));
  } catch {
    // Ignore cache persistence failures.
  }
}

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

function trimCache(cache) {
  const entries = Object.entries(cache);
  if (entries.length <= MAX_CACHE_ENTRIES) {
    return cache;
  }

  return Object.fromEntries(
    entries
      .sort((left, right) => (left[1]?.createdAt || 0) - (right[1]?.createdAt || 0))
      .slice(entries.length - MAX_CACHE_ENTRIES),
  );
}

export function useGemini() {
  const [loadingKey, setLoadingKey] = useState(null);
  const [error, setError] = useState('');
  const [cooldowns, setCooldowns] = useState({});
  const [tick, setTick] = useState(Date.now());
  const cacheRef = useRef(null);

  if (cacheRef.current === null) {
    cacheRef.current = typeof window === 'undefined' ? {} : loadCache();
  }

  useEffect(() => {
    const hasActiveCooldown = Object.values(cooldowns).some((endsAt) => endsAt > Date.now());

    if (!hasActiveCooldown) {
      return undefined;
    }

    const intervalId = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(intervalId);
  }, [cooldowns]);

  const getCacheKey = useCallback(
    ({ key, prompt, systemPrompt }) => hashString(`${key}::${systemPrompt}::${prompt}`),
    [],
  );

  const storeCache = useCallback((cacheKey, value) => {
    const nextCache = trimCache({
      ...(cacheRef.current || {}),
      [cacheKey]: {
        createdAt: Date.now(),
        value,
      },
    });

    cacheRef.current = nextCache;
    persistCache(nextCache);
  }, []);

  const getCachedValue = useCallback((cacheKey) => cacheRef.current?.[cacheKey]?.value || '', []);

  const generate = useCallback(
    async ({ key, prompt, systemPrompt }) => {
      const cacheKey = getCacheKey({ key, prompt, systemPrompt });
      const cachedValue = getCachedValue(cacheKey);

      if (cachedValue) {
        setError('');
        return cachedValue;
      }

      setLoadingKey(key);
      setError('');

      try {
        const result = await callGemini({ prompt, systemPrompt });
        storeCache(cacheKey, result);
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
    [getCacheKey, getCachedValue, storeCache],
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
