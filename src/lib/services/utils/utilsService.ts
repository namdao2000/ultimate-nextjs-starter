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
    const now = new Date();
    let difference = (now.getTime() - timestamp.getTime()) / 1000; // Difference in seconds

    if (difference < 60) {
      return `${Math.floor(difference)} second${difference === 1 ? '' : 's'}`;
    } else if (difference < 3600) { // Less than 1 hour
      difference /= 60; // Convert to minutes
      return `${Math.floor(difference)} min${Math.floor(difference) === 1 ? '' : 's'}`;
    } else if (difference < 86400) { // Less than 1 day
      difference /= 3600; // Convert to hours
      return `${Math.floor(difference)} hour${Math.floor(difference) === 1 ? '' : 's'}`;
    }
    difference /= 86400; // Convert to days
    return `${Math.floor(difference)} day${Math.floor(difference) === 1 ? '' : 's'}`;
  }
}
