import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../model/index.js'

const tokenOptions = {
	expiresIn: '2h'
}

// find exiting user from email
const findExistingEmail = async (email) => {
	try {
		// check if user exists
		const existingUser = await User.findOne({ email: email.toLowerCase() })
		if (existingUser) {
			return {
				status: 409,
				message: 'User exists. Please create a new user!'
			}
		} else {
			return null
		}
	} catch (err) {
		return {
			status: 500,
			message: err.message
		}
	}
}

// function for creating error message object
const createErrorMsg = (message = 'error message') => ({ message })

// function for creating user object
const createUserObj = (user) => {
	if (!user) {
		return {}
	}
	return {
		username: user.username,
		email: user.email,
		avatar: user.avatar,
		role: user.role
	}
}


// REGISTER function
export const register = async (req, res) => {
	try {
		// getting username, email, password info from frontend
		const { username, email, password } = req.body

		// check if email and/or password is supplied from user
		if ( !email || !password || email.trim() === '' || password.trim() === '') {
			return res.status(400).json(createErrorMsg('email and password are required'))
		}

		// check if user exists or there is an error
		const checkUser = await findExistingEmail(email)
		if (checkUser) {
			return res.status(checkUser.status).json(createErrorMsg(checkUser.message))
		}

		// encrypt user password
		const hashedPWD = await bcrypt.hash(password, 10)

		// save to db
		const newUser = await User.create({
			username,
			email: email.toLowerCase(),
			password: hashedPWD
		})

		// user
		const userObj = createUserObj(newUser)

		const tokenObj = {
			id: newUser._id,
			user: userObj
		}

		// create token
		const token = jwt.sign(tokenObj, process.env.JWT_SECRET, tokenOptions)

		// return newUsers
		return res.status(200).json({
			token, user: userObj
		})

	} catch (err) {
		console.log(err.message)
		return res.status(500).json(createErrorMsg(err.message))
	}
}


// LOGIN function
export const loginJWT = async (req, res) => {
	try {
		// getting username, email, password info from frontend
		const { email, password } = req.body

		// check if email and/or password is supplied from user
		if (!email || !password || email.trim() === '' || password.trim() === '') {
			return res.status(400).json(createErrorMsg('email and password are required'))
		}

		// find user based on email
		const user = await User.findOne({ email: email.toLowerCase() })

		// if user does not exist or password is not correct
		if (!(user && (await bcrypt.compare(password, user.password)))) {
			return res.status(400).json(createErrorMsg('invalid credential'))
		}

		// user object
		const userObj = createUserObj(user)

		// create token
		const tokenObj = {
			id: user._id,
			user: userObj
		}

		const token = jwt.sign(tokenObj, process.env.JWT_SECRET, tokenOptions)

		return res.status(200).json({
			token, user: userObj
		})

	} catch (err) {
		console.log(err.message)
		return res.status(500).json(createErrorMsg(err.message))
	}
}


// VALIDATE_TOKEN function
export const validateToken = async (req, res) => {

	// get token from header
	const token = req.header('x-auth-token')
	if (!token) return res.status(401).json(createErrorMsg('missing auth header'))

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET)
		if (!verified) return res.status(401).json(createErrorMsg(''))

		// find if user exists
		const verifiedUser = await User.findById(verified.id)
		if (!verifiedUser) return res.status(401).json(createErrorMsg('cannot find user'))

		return res.json(createUserObj(verifiedUser))

	} catch (err) {
		res.status(500).json(createErrorMsg(err.message))
	}

}
