import { Request, Response, NextFunction } from 'express';

// Mock implementation for testing
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

  // Mock middleware function
  return (req: Request, res: Response, next: NextFunction) => {
    // Simulated rate limiting logic
    if (strict) {
      console.log('Strict rate limiting applied');
    }
    next();
  };
};

// Export a default configuration for CDN file serving with higher limit
export const cdnRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // More generous for CDN file serving
  strict: false // Default to non-strict for CDN
});