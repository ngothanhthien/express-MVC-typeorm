import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { SignedUser } from "@/plugins/jwt"

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        res.sendStatus(401)
        return
    }

    const token = authHeader.split(' ')[1]

    if (!process.env.JWT_SECRET) {
        throw new Error('Missing JWT_SECRET')
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, userPayload) => {
        if (err) {
            res.sendStatus(403)
            return
        }

        req.user = userPayload as SignedUser
        next()
    })
}
