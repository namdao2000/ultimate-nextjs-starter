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

  static timeAgo(timestamp: Date): string {
    const currentTime = new Date();
    const millisecondsDiff = currentTime.getTime() - timestamp.getTime();
    const millisecondsPerUnit = {
      'second': 1000,
      'minute': 60000,
      'hour': 3600000,
      'day': 86400000,
    };

    if (millisecondsDiff < 0) {
      return 'just now';
    }

    for (const [unit, milliseconds] of Object.entries(millisecondsPerUnit).reverse()) {
      const diff = millisecondsDiff / milliseconds;
      if (diff >= 1) {
        const timeUnit = diff >= 2 ? `${unit}s` : unit;
        return `${Math.floor(diff)} ${timeUnit.replace('second', 'second').replace('minute', 'min').replace('hour', 'hour').replace('day', 'day')}`;
      }
    }

    return 'just now';
  }
}
