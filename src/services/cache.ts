interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

const DEFAULT_TTL_MS = 15 * 60 * 1000; // 15 minutes cache

export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number = DEFAULT_TTL_MS,
  isFallback?: (data: T) => boolean
): Promise<T> {
  const cacheKey = `portfolio_cache_${key}`;

  let cachedData: T | null = null;
  try {
    const cachedItem = localStorage.getItem(cacheKey);
    if (cachedItem) {
      const parsed: CacheEntry<T> = JSON.parse(cachedItem);
      cachedData = parsed.data || null;
      const isExpired = Date.now() - parsed.timestamp > ttlMs;
      if (!isExpired && cachedData && !(isFallback && isFallback(cachedData))) {
        return cachedData;
      }
    }
  } catch (e) {
    console.warn(`Cache read warning for ${key}:`, e);
  }

  try {
    const freshData = await fetcher();
    if (!isFallback || !isFallback(freshData)) {
      try {
        const entry: CacheEntry<T> = {
          timestamp: Date.now(),
          data: freshData,
        };
        localStorage.setItem(cacheKey, JSON.stringify(entry));
      } catch (e) {
        console.warn(`Cache write warning for ${key}:`, e);
      }
    } else {
      try {
        localStorage.removeItem(cacheKey);
      } catch (e) {
        // ignore
      }
    }
    return freshData;
  } catch (err) {
    console.warn(`Fetcher failed for ${key}, falling back to cached or default data:`, err);
    if (cachedData) {
      return cachedData;
    }
    throw err;
  }
}

