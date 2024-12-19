import { Request, Response, NextFunction } from 'express'
import logger from '@/services/Logger'

export default (err: Error, req: Request, res: Response, next: NextFunction): void => {
    logger.error('Exception:', {
        message: err.message,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl,
        body: req.body,
        query: req.query,
        headers: req.headers,
    })

    res.status(500).json({
        status: 'error',
        message: 'Something went wrong',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
