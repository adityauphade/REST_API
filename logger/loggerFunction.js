// var winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
 
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
 
const logger = createLogger({
  format: combine(
    label({ label: 'Dummy Label' }),
    timestamp(),
    myFormat
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({ filename: 'logger/logData/error.log', level: 'error' }),
    new transports.File({ filename: 'logger/logData/info.log', level: 'info' }),
    new transports.File({ filename: 'logger/logData/status.log', level: 'status' }),
    new transports.File({ filename: 'logger/logData/combined.log' }),
  ],
});


module.exports = logger;