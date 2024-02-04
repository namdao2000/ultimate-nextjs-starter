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
});
