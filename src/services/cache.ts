interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

const DEFAULT_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

export async function fetchWithCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number = DEFAULT_TTL_MS
): Promise<T> {
  const cacheKey = `portfolio_cache_${key}`;

  try {
    const cachedItem = localStorage.getItem(cacheKey);
    if (cachedItem) {
      const parsed: CacheEntry<T> = JSON.parse(cachedItem);
      const isExpired = Date.now() - parsed.timestamp > ttlMs;
      if (!isExpired && parsed.data) {
        return parsed.data;
      }
    }
  } catch (e) {
    console.warn(`Cache read warning for ${key}:`, e);
  }

  try {
    const freshData = await fetcher();
    try {
      const entry: CacheEntry<T> = {
        timestamp: Date.now(),
        data: freshData,
      };
      localStorage.setItem(cacheKey, JSON.stringify(entry));
    } catch (e) {
      console.warn(`Cache write warning for ${key}:`, e);
    }
    return freshData;
  } catch (err) {
    // If fetching live data fails, remove any cached data for this key and throw error
    try {
      localStorage.removeItem(cacheKey);
    } catch (e) {}
    throw err;
  }
}


