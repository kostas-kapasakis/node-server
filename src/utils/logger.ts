import * as winston from 'winston';

const files = new winston.transports.File({ filename: 'complete.log' });
const console = new winston.transports.Console();
const customFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  });

export const logger:winston.Logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: 'Node Api =>' }),
    winston.format.timestamp(),
    customFormat,
    winston.format.prettyPrint(),
    winston.format.colorize()
  ),
})
.clear()          
.add(console)     
.add(files)       


if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}
