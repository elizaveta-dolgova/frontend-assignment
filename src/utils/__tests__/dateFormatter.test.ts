import {formatCzechDate} from '../dateFormatter';

describe('formatCzechDate', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('valid inputs', () => {
    it('should format Date object correctly', () => {
      const date = new Date('2024-01-15');
      expect(formatCzechDate(date)).toBe('15. ledna 2024');
    });

    it('should format ISO string correctly', () => {
      expect(formatCzechDate('2024-01-15T10:30:00Z')).toBe('15. ledna 2024');
    });

    it('should format date string correctly', () => {
      expect(formatCzechDate('2024-01-15')).toBe('15. ledna 2024');
    });

    it('should format timestamp correctly', () => {
      const timestamp = new Date('2024-01-15').getTime();
      expect(formatCzechDate(timestamp)).toBe('15. ledna 2024');
    });

    it('should handle leap year correctly', () => {
      expect(formatCzechDate('2024-02-29')).toBe('29. února 2024');
    });
  });

  describe('all months in Czech', () => {
    const months = [
      {date: '2024-01-01', expected: '1. ledna 2024'},
      {date: '2024-02-01', expected: '1. února 2024'},
      {date: '2024-03-01', expected: '1. března 2024'},
      {date: '2024-04-01', expected: '1. dubna 2024'},
      {date: '2024-05-01', expected: '1. května 2024'},
      {date: '2024-06-01', expected: '1. června 2024'},
      {date: '2024-07-01', expected: '1. července 2024'},
      {date: '2024-08-01', expected: '1. srpna 2024'},
      {date: '2024-09-01', expected: '1. září 2024'},
      {date: '2024-10-01', expected: '1. října 2024'},
      {date: '2024-11-01', expected: '1. listopadu 2024'},
      {date: '2024-12-01', expected: '1. prosince 2024'},
    ];

    it.each(months)('should format $date as $expected', ({date, expected}) => {
      expect(formatCzechDate(date)).toBe(expected);
    });
  });

  describe('invalid inputs', () => {
    it('should handle invalid string', () => {
      const result = formatCzechDate('invalid-date');
      expect(result).toContain('Invalid Date');
    });

    it('should handle empty string', () => {
      const result = formatCzechDate('');
      expect(result).toContain('Invalid Date');
    });

    it('should handle NaN', () => {
      const result = formatCzechDate(NaN);
      expect(result).toContain('Invalid Date');
    });

    it('should handle invalid timestamp', () => {
      const invalidTimestamp = -8640000000000001;
      const result = formatCzechDate(invalidTimestamp);
      expect(result).toContain('Invalid Date');
    });

    it('should handle malformed date string', () => {
      const result = formatCzechDate('2024-13-45');
      expect(result).toContain('Invalid Date');
    });
  });
});
