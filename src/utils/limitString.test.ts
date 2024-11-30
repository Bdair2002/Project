import { limitString } from './limitString';

describe('limitString', () => {
  it('should return the original string if its length is less than or equal to the limit', () => {
    expect(limitString('hello', 5)).toBe('hello');
    expect(limitString('test', 10)).toBe('test');
  });

  it('should truncate the string and add "..." if its length exceeds the limit', () => {
    expect(limitString('hello world', 5)).toBe('hello...');
    expect(limitString('1234567890', 7)).toBe('1234567...');
  });

  it('should return "..." if length is 0', () => {
    expect(limitString('hello', 0)).toBe('...');
  });

  it('should return "..." if length is negative', () => {
    expect(limitString('hello', -5)).toBe('...');
  });

  it('should handle an empty string correctly', () => {
    expect(limitString('', 5)).toBe('');
  });
});
