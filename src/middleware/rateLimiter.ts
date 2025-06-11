import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import winston from 'winston'; // Added logging support

// Configure logger for rate limit events
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'rate-limit.log' })
  ]
});

/**
 * Creates a rate limiting middleware to prevent abuse
 * @param {Object} options - Configuration options for rate limiting
 * @param {number} options.windowMs - Time window in milliseconds
 * @param {number} options.max - Maximum number of requests allowed per IP
 * @param {boolean} [options.strict] - Enable strict mode with additional logging
 * @returns {Function} Express middleware for rate limiting
 */
export const createRateLimiter = (
  options: {
    windowMs?: number;
    max?: number;
    strict?: boolean;
  } = {}
) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes default
    max = 100, // default limit per IP
    strict = false // added for more granular control
  } = options;

  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      status: 'error',
      message: 'Too many requests, please try again later.',
    },
    handler: (req: Request, res: Response, next: NextFunction, options) => {
      const clientIp = req.ip || 'Unknown';
      
      // Log rate limit events
      logger.warn('Rate limit exceeded', {
        ip: clientIp,
        path: req.path,
        method: req.method
      });

      // In strict mode, add more detailed logging
      if (strict) {
        logger.error('Strict rate limit violation', {
          details: {
            ip: clientIp,
            userAgent: req.get('User-Agent'),
            referrer: req.get('Referrer')
          }
        });
      }

      res.status(options.statusCode).json(options.message);
    },
  });
};

// Export a default configuration for CDN file serving with higher limit
export const cdnRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // More generous for CDN file serving
  strict: false // Default to non-strict for CDN
});