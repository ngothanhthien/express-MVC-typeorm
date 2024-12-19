import { SignedUser } from "@/plugins/jwt"
import { Request } from "express"

declare global {
    namespace Express {
        interface Request {
            user?: SignedUser
        }
    }
}
