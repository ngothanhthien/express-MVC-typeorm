import { NextFunction, Response, Request } from "express"
import { getRepository } from "@/models/User"
import { getRepository as guestExtraInfoRepo } from "@/models/GuestExtraInfo"
import {getCurrentVote, getRepository as guestRepo} from "@/models/Guest"
import { compare, sign, hash } from "@/plugins/jwt"

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(400).json({
            status: 'error',
            message: 'Username and password are required',
        })
        return
    }

    const userRepository = getRepository()
    const user = await userRepository.findOneBy({ username })
    if (!user) {
        res.status(400).json({ message: 'Invalid credentials' })
        return
    }

    const isMatch = await compare(password, user.password)
    if (!isMatch) {
        res.status(400).json({ message: 'Invalid credentials' })
        return
    }

    const token = sign(user)

    res.json({ token })
}

export const register =  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username, password } = req.body
    if (!username || !password) {
        res.status(400).json({message: 'Username and password are required'})
        return
    }

    const userRepository = getRepository()
    const existingUser = await userRepository.findOne({ where: { username } })
    if (existingUser) {
        res.status(400).json({ message: 'User already exists' })
        return
    }

    const hashed = await hash(password)
    const newUser = userRepository.create({ username, password: hashed })
    await userRepository.save(newUser)

    res.status(201).json({
        message: 'User registered successfully',
        userId: newUser.id,
        token: sign(newUser),
    })
}

export const getInfoByIp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const ip = req.headers['x-ip']
    if (!ip) {
        res.status(400).json({ message: 'IP is required' })
        return
    }
    const repo = guestExtraInfoRepo()
    const extraInfo = await repo.findOneBy({ ip: ip as string })
    if (!extraInfo) {
        res.status(404).json({ message: 'Guest not found' })
        return
    }
    const guest = await guestRepo().findOneBy({
        id: extraInfo.guest_id,
    })
    if (!guest) {
        next(new Error('Guest not found'))
        return
    }

    res.status(200).json({
        mail: guest.mail,
        status: guest.status,
        currentVote: await getCurrentVote(guest.mail),
    })
}
