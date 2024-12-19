import { Router } from 'express'
import { helloWorld, testError } from '@/controllers/Main'
import {getInfoByIp, login, register} from '@/controllers/Auth'
import { rank, sendMail, verifyMail, listCandidate, acceptVote } from '@/controllers/Vote'
import { authRateLimiter } from '@/middlewares/rateLimiter'
import { checkVotingClosed } from "@/middlewares/votingClose"

const router = Router()

router.get('/ping', checkVotingClosed, helloWorld)
router.get('/error', testError)

router.post('/auth/login', authRateLimiter, login)
router.post('/auth/register', authRateLimiter, register)

export default router
