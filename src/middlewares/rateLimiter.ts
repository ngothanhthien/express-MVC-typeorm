import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit'


export const authRateLimiter: RateLimitRequestHandler = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: {
        message: 'Too many requests',
    },
})
