import { UtilsService } from './utilsService';

describe('UtilsService', () => {
  describe('.diff method', () => {
    test('calculates difference in seconds', () => {
      const start = new Date('2023-04-01T00:00:00Z');
      const end = new Date('2023-04-01T00:00:30Z');
      expect(UtilsService.diff(start, end, 'second')).toBe(30);
    });

    test('calculates difference in minutes', () => {
      const start = new Date('2023-04-01T00:00:00Z');
      const end = new Date('2023-04-01T00:30:00Z');
      expect(UtilsService.diff(start, end, 'minute')).toBe(30);
    });

    test('calculates difference in hours', () => {
      const start = new Date('2023-04-01T00:00:00Z');
      const end = new Date('2023-04-01T03:00:00Z');
      expect(UtilsService.diff(start, end, 'hour')).toBe(3);
    });

    test('calculates difference in days', () => {
      const start = new Date('2023-04-01T00:00:00Z');
      const end = new Date('2023-04-04T00:00:00Z');
      expect(UtilsService.diff(start, end, 'day')).toBe(3);
    });

    test('throws error for invalid unit', () => {
      const start = new Date('2023-04-01T00:00:00Z');
      const end = new Date('2023-04-01T00:00:30Z');
      expect(() => UtilsService.diff(start, end, 'weeks')).toThrow('Invalid unit of time: weeks');
    });

    test('throws error when end timestamp is before start timestamp', () => {
      const start = new Date('2023-04-01T00:00:30Z');
      const end = new Date('2023-04-01T00:00:00Z');
      expect(() => UtilsService.diff(start, end, 'second')).toThrow('End timestamp must be greater than start timestamp');
    });

  describe('.timeAgo method', () => {
    test('shows "just now" for future timestamps', () => {
      const futureTimestamp = new Date(new Date().getTime() + 1000 * 60); // 1 minute into the future
      expect(UtilsService.timeAgo(futureTimestamp)).toBe('just now');
    });

    test('shows time difference in seconds', () => {
      const pastTimestamp = new Date(new Date().getTime() - 5000); // 5 seconds ago
      expect(UtilsService.timeAgo(pastTimestamp)).toBe('5 seconds');
    });

    test('shows time difference in minutes', () => {
      const pastTimestamp = new Date(new Date().getTime() - 60000 * 75); // 75 minutes ago
      expect(UtilsService.timeAgo(pastTimestamp)).toBe('1 hour');
    });

    test('shows time difference in hours', () => {
      const pastTimestamp = new Date(new Date().getTime() - 3600000 * 18); // 18 hours ago
      expect(UtilsService.timeAgo(pastTimestamp)).toBe('18 hours');
    });

    test('shows time difference in days', () => {
      const pastTimestamp = new Date(new Date().getTime() - 86400000 * 3); // 3 days ago
      expect(UtilsService.timeAgo(pastTimestamp)).toBe('3 days');
    });
  });
  });
});
