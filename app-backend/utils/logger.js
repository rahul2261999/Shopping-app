const { createLogger, format, transports, addColors } = require('winston');

const isProduction = process.env.NODE_ENV === 'production';
const level = process.env.LOG_LEVEL || (isProduction ? 'info' : 'debug');

// Custom colors for levels
addColors({
  error: 'bold red',
  warn: 'yellow',
  info: 'green',
  http: 'cyan',
  verbose: 'white',
  debug: 'magenta'
});

const devConsoleFormat = format.combine(
  format.colorize({ all: true }),
  format.timestamp(),
  format.errors({ stack: true }),
  format.printf((info) => {
    const { timestamp, level: lvl, message, stack, ...meta } = info;
    const metaWithoutSymbols = JSON.parse(JSON.stringify(meta));
    const metaStr = Object.keys(metaWithoutSymbols).length ? ` ${JSON.stringify(metaWithoutSymbols)}` : '';
    if (stack) {
      return `[${timestamp}] ${lvl}: ${message}${metaStr}\n${stack}`;
    }
    return `[${timestamp}] ${lvl}: ${message}${metaStr}`;
  })
);

const jsonFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.json()
);

const logger = createLogger({
  level,
  format: isProduction ? jsonFormat : devConsoleFormat,
  transports: [
    new transports.Console()
  ]
});

// Support both logger.level('message', meta) and legacy logger.level(meta, 'message')
function wrapSwap(fn) {
  return function wrapped(message, meta) {
    if (typeof message === 'object' && typeof meta === 'string') {
      return fn(meta, message);
    }
    return fn(message, meta);
  };
}

logger.info = wrapSwap(logger.info.bind(logger));
logger.warn = wrapSwap(logger.warn.bind(logger));
logger.error = wrapSwap(logger.error.bind(logger));
logger.debug = wrapSwap(logger.debug.bind(logger));
logger.verbose = wrapSwap(logger.verbose ? logger.verbose.bind(logger) : logger.info.bind(logger));

module.exports = logger;


