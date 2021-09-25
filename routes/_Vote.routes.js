import express from 'express'
const router = express.Router()
import { VoteControllers } from '../controllers/index.js'

router.get('/vote', VoteControllers.getVotes)


export default router
