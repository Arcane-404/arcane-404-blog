import express from 'express'

import {
	register, loginJWT, validateToken
} from '../controllers/_User.controllers.js'

const userRouter = express.Router()

userRouter
	.post('/register', register)
	.post('/login', loginJWT)
	.post('/validateToken', validateToken)


export default userRouter
