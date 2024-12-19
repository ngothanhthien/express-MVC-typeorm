import bcrypt from 'bcrypt'
import { User } from '@/models/User'
import jwt from 'jsonwebtoken'

export interface SignedUser {
    id: string
    username: string
}

export function compare(needle: string, hash: string): Promise<boolean> {
    return bcrypt.compare(needle, hash)
}

export function sign(user: User) {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    )
}

export function verify(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET as string)
}

export function hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
}
