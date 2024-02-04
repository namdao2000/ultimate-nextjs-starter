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
  });

  describe('.timeAgo method', () => {
    const now = new Date();
    const oneSecondAgo = new Date(now.getTime() - 1000);
    const twoSecondsAgo = new Date(now.getTime() - 2000);
    const oneMinuteAgo = new Date(now.getTime() - 60000);
    const twoMinutesAgo = new Date(now.getTime() - 120000);
    const oneHourAgo = new Date(now.getTime() - 3600000);
    const twoHoursAgo = new Date(now.getTime() - 7200000);
    const oneDayAgo = new Date(now.getTime() - 86400000);
    const twoDaysAgo = new Date(now.getTime() - 172800000);
    const futureTimestamp = new Date(now.getTime() + 1000);

    test('shows "1 second" when the difference is roughly 1 second', () => {
      expect(UtilsService.timeAgo(oneSecondAgo)).toBe('1 second');
    });

    test('shows "2 seconds" when the difference is roughly 2 seconds', () => {
      expect(UtilsService.timeAgo(twoSecondsAgo)).toBe('2 seconds');
    });

    test('shows "1 min" when the difference is roughly 1 minute', () => {
      expect(UtilsService.timeAgo(oneMinuteAgo)).toBe('1 min');
    });

    test('shows "2 mins" when the difference is roughly 2 minutes', () => {
      expect(UtilsService.timeAgo(twoMinutesAgo)).toBe('2 mins');
    });

    test('shows "1 hour" when the difference is roughly 1 hour', () => {
      expect(UtilsService.timeAgo(oneHourAgo)).toBe('1 hour');
    });

    test('shows "2 hours" when the difference is roughly 2 hours', () => {
      expect(UtilsService.timeAgo(twoHoursAgo)).toBe('2 hours');
    });

    test('shows "1 day" when the difference is roughly 1 day', () => {
      expect(UtilsService.timeAgo(oneDayAgo)).toBe('1 day');
    });

    test('shows "2 days" when the difference is roughly 2 days', () => {
      expect(UtilsService.timeAgo(twoDaysAgo)).toBe('2 days');
    });

    test('handles or rejects future timestamps gracefully', () => {
      expect(UtilsService.timeAgo(futureTimestamp)).toBe('0 seconds');
    });
  });
});
