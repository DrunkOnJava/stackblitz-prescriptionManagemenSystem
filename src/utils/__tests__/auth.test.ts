import { describe, it, expect } from 'vitest';
import { validatePassword, validateEmail } from '../auth';

describe('validatePassword', () => {
  it('validates minimum length requirement', () => {
    const result = validatePassword('short');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('at least 8 characters');
  });

  it('validates uppercase letter requirement', () => {
    const result = validatePassword('password123!');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('uppercase letter');
  });

  it('validates lowercase letter requirement', () => {
    const result = validatePassword('PASSWORD123!');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('lowercase letter');
  });

  it('validates number requirement', () => {
    const result = validatePassword('Password!');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('number');
  });

  it('validates special character requirement', () => {
    const result = validatePassword('Password123');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('special character');
  });

  it('accepts valid passwords', () => {
    const result = validatePassword('Password123!');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });
});

describe('validateEmail', () => {
  it('validates correct email format', () => {
    const result = validateEmail('user@example.com');
    expect(result.isValid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('rejects invalid email formats', () => {
    const invalidEmails = [
      'invalid-email',
      'user@',
      '@domain.com',
      'user@.com',
      'user@domain.',
      'user@domain'
    ];

    invalidEmails.forEach(email => {
      const result = validateEmail(email);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Please enter a valid email address');
    });
  });
});