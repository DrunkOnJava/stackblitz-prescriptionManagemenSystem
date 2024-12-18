import { useMemo, useRef, useEffect } from 'react';

interface MemoOptions<T> {
  maxAge?: number;
  isEqual?: (prev: T, next: T) => boolean;
}

export function useMemoizedValue<T>(
  value: T,
  deps: any[],
  options: MemoOptions<T> = {}
) {
  const {
    maxAge = Infinity,
    isEqual = (a, b) => a === b
  } = options;

  const ref = useRef<{ value: T; timestamp: number }>({
    value,
    timestamp: Date.now()
  });

  const memoizedValue = useMemo(() => {
    const now = Date.now();
    const age = now - ref.current.timestamp;

    if (age > maxAge || !isEqual(value, ref.current.value)) {
      ref.current = { value, timestamp: now };
    }

    return ref.current.value;
  }, [value, maxAge, isEqual, ...deps]);

  useEffect(() => {
    ref.current = { value: memoizedValue, timestamp: Date.now() };
  }, [memoizedValue]);

  return memoizedValue;
}