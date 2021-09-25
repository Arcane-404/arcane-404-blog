import express from 'express'

import { VoteControllers } from '../controllers/index.js'

const voteRouter = express.Router()

voteRouter
	.get('/', VoteControllers.getVotes)


export default voteRouter
