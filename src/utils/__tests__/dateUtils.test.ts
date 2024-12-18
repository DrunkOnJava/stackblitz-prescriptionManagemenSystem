import { describe, it, expect, beforeEach, vi } from 'vitest';
import { formatDistanceToNow } from '../dateUtils';

describe('formatDistanceToNow', () => {
  beforeEach(() => {
    // Mock current date to ensure consistent test results
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-02-28T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('formats just now correctly', () => {
    const date = new Date('2024-02-28T11:59:30Z'); // 30 seconds ago
    expect(formatDistanceToNow(date)).toBe('just now');
  });

  it('formats minutes correctly', () => {
    const date = new Date('2024-02-28T11:58:00Z'); // 2 minutes ago
    expect(formatDistanceToNow(date)).toBe('2m ago');
  });

  it('formats hours correctly', () => {
    const date = new Date('2024-02-28T09:00:00Z'); // 3 hours ago
    expect(formatDistanceToNow(date)).toBe('3h ago');
  });

  it('formats days correctly', () => {
    const date = new Date('2024-02-25T12:00:00Z'); // 3 days ago
    expect(formatDistanceToNow(date)).toBe('3d ago');
  });

  it('formats older dates as full date string', () => {
    const date = new Date('2024-02-20T12:00:00Z'); // More than a week ago
    expect(formatDistanceToNow(date)).toBe(date.toLocaleDateString());
  });
});