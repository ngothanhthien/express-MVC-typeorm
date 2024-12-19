import { NextFunction, Response, Request } from "express";

export const helloWorld = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.send('Hello World ' + JSON.stringify(req.query))
}

export const testError = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    next(new Error('Test error'))
}
