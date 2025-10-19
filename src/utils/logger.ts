import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as path from 'path';
import { createLogger, format, Logform, transports } from 'winston';

const logDir = path.join(process.cwd(), 'logs');

const safeString = (value: unknown): string => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean')
    return String(value);
  if (value instanceof Date) return value.toISOString();
  if (value === null || value === undefined) return '';
  return JSON.stringify(value, Object.getOwnPropertyNames(value));
};

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.printf((info: Logform.TransformableInfo) => {
      const message = safeString(info.message);

      let stack = '';
      if (info instanceof Error && info.stack) {
        stack = '\n' + safeString(info.stack);
      } else if (info.stack) {
        stack = '\n' + safeString(info.stack);
      }

      const timestamp = safeString(info.timestamp);
      const level = safeString(info.level).toUpperCase();

      return `[${timestamp}] ${level}: ${message}${stack}`;
    }),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        nestWinstonModuleUtilities.format.nestLike('HayaApp', {
          prettyPrint: true,
        }),
      ),
    }),
    new transports.File({
      filename: path.join(logDir, 'app.log'),
      level: 'info',
    }),
    new transports.File({
      filename: path.join(logDir, 'errors.log'),
      level: 'error',
    }),
  ],
});

export default logger;
