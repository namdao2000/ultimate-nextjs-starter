import pino from 'pino';

// Configured logging to work with datadog in production
export const logger = pino({
  formatters: {
    level(level) {
      return process.env.NODE_ENV === 'development'
        ? { level }
        : { status: level };
    },
  },
  serializers: {
    error: pino.stdSerializers.err,
  },
  transport:
    process.env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
        }
      : undefined,
});
