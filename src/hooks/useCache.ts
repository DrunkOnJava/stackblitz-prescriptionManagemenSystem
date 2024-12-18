import { useState, useCallback } from 'react';

interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of items in cache
}

export function useCache<T>(options: CacheOptions = {}) {
  const { ttl = 5 * 60 * 1000, maxSize = 100 } = options;
  const [cache] = useState(new Map<string, CacheItem<T>>());

  const set = useCallback((key: string, data: T) => {
    const now = Date.now();
    if (cache.size >= maxSize) {
      // Remove oldest entry if cache is full
      const oldestKey = Array.from(cache.entries())
        .sort(([, a], [, b]) => a.timestamp - b.timestamp)[0][0];
      cache.delete(oldestKey);
    }
    cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + ttl
    });
  }, [cache, maxSize, ttl]);

  const get = useCallback((key: string): T | null => {
    const item = cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiresAt) {
      cache.delete(key);
      return null;
    }
    
    return item.data;
  }, [cache]);

  const invalidate = useCallback((key: string) => {
    cache.delete(key);
  }, [cache]);

  const clear = useCallback(() => {
    cache.clear();
  }, [cache]);

  return { set, get, invalidate, clear };
}