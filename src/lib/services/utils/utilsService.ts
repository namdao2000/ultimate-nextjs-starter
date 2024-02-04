import { Prisma } from '@prisma/client';

export class UtilsService {
  static diff(startTimestamp: Date, endTimestamp: Date, unit: 'second' | 'minute' | 'hour' | 'day'): number {
    const millisecondsPerUnit = {
      'second': 1000,
      'minute': 60000,
      'hour': 3600000,
      'day': 86400000,
    };

    if (!(unit in millisecondsPerUnit)) {
      throw new Error(`Invalid unit of time: ${unit}`);
    }

    const startMs = startTimestamp.getTime();
    const endMs = endTimestamp.getTime();
    const differenceMs = endMs - startMs;

    if (differenceMs < 0) {
      throw new Error('End timestamp must be greater than start timestamp');
    }

    return differenceMs / millisecondsPerUnit[unit];
  }
}
