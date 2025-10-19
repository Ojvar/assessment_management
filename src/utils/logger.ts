import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as path from 'path';
import { createLogger, format, transports } from 'winston';

const logDir = path.join(process.cwd(), 'logs');

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.printf(({ level, message, timestamp, stack }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}${stack ? '\n' + stack : ''}`;
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
