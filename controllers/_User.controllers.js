import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

import { User, Verify } from '../model/index.js'

import sendVerifyEmail from '../services/_verifyEmail.js'

const tokenOptions = { expiresIn: '2h' }

// find exiting user from email
const findExistingEmail = async (email) => {
	try {
		// check if user exists
		const existingUser = await User.findOne({ email: email.toLowerCase() })

		if (existingUser) return {
			status: 409,
			message: 'User exists. Please create a new user!'
		}
		else return null

	} catch (err) {
		return {
			status: 500,
			message: err.message
		}
	}
}

// function for creating error message object
const errorMsg = (message = 'error message') => ({ message })

// function for creating user object
const createUserObj = (user) => {
	if (!user) return {}

	return {
		username: user.username,
		email: user.email,
		avatar: user.avatar,
		role: user.role,
		isVerified: user.isVerified
	}
}


// REGISTER function
export const register = async (req, res) => {

	try {
		// getting username, email, password info from frontend
		const { username, email, password } = req.body

		// check if email and/or password is supplied from user
		if ( !email || !password || email.trim() === '' || password.trim() === '') {
			return res.status(400).json(errorMsg('email and password are required'))
		}

		// check if user exists or there is an error
		const checkUser = await findExistingEmail(email)
		if (checkUser) return res.status(checkUser.status).json(errorMsg(checkUser.message))

		// encrypt user password
		const hashedPassword = await bcrypt.hash(password, 10)

		// save to db
		const newUser = new User({
			username,
			email: email.toLowerCase(),
			password: hashedPassword
		})

		const confirmToken = new Verify({
			_user: newUser._id,
			token: crypto.randomBytes(16).toString('hex')
		})

		// send email
		sendVerifyEmail(newUser.email, confirmToken.token)

		// saved token and user
		await confirmToken.save()
		await newUser.save()

		return res.status(200).json({
			message: 'Registered succesfully! Please check your email for confirmation.'
		})

	} catch (error) {
		console.error(error.message)
		return res.status(500).json(errorMsg(error.message))
	}
}

// LOGIN function
export const loginJWT = async (req, res) => {
	try {
		// getting username, email, password info from frontend
		const { email, password } = req.body

		// check if email and/or password is supplied from user
		if (!email || !password || email.trim() === '' || password.trim() === '') {
			return res.status(400).json(errorMsg('email and password are required'))
		}

		// find user based on email
		const user = await User.findOne({ email: email.toLowerCase() })

		// check user based on password
		const isPassword = await bcrypt.compare(password, user.password)

		// if user does not exist or password is not correct
		if (!(user && isPassword)) return res.status(400).json(errorMsg('invalid credential'))

		// valid user, but not verified
		if (!user.isVerified) return res.json({
			user: { email: user.email },
			message: 'please verify email'
		})

		// user object
		const userObj = createUserObj(user)

		// create token
		const tokenObj = {
			id: user._id,
			user: userObj
		}

		// auth token
		const token = jwt.sign(tokenObj, process.env.JWT_SECRET, tokenOptions)

		return res.status(200).json({
			token,
			user: userObj
		})

	} catch (error) {
		console.log(error.message)
		return res.status(500).json(errorMsg(error.message))
	}
}


// CONFIRM USER
export const confirmUser = async (req, res) => {

	const confirmToken = req?.body?.confirmId

	// unverifyed user token
	if (!confirmToken) return res.status(401).json(errorMsg('No confirm token provided, cannot verify user!'))

	try {
		// find confirmation token
		const findUser = await Verify.findOne({
			token: confirmToken
		},{
			_id: 0
		}).populate({
			path: '_user',
			select: 'isVerified'
		})

		// if cannot find user
		if (!findUser) return res.status(401).json(errorMsg('invalid token'))

		// if user is verified before
		if (findUser._user.isVerified) return res.json({ data: 'email confirmed!' })

		// find the user by id and update verification status
		const confirmedUser = await User.findById(findUser._user._id)
		confirmedUser.isVerified = true
		await confirmedUser.save()

		return res.json({ data: 'email confirmed!' })

	} catch (error) {
		console.log(error.message)
		return res.status(500).json(errorMsg(error.message))
	}
}

// RESEND CONFIRMATION
export const resendConfirm = async (req, res) => {
	const { email } = req.body

	// check for email
	if (!email) return res.status(400).json(errorMsg('email is required for resending confirmation'))

	try {

		const findUser = await User.findOne({ email })

		// check if user does not exist
		if (!findUser) return res.status(404).json(errorMsg('user does not exist'))

		// check if user is verified
		if (findUser.isVerified) return res.json({ data: 'email verified' })

		// find and update new token
		const tokenUpdate = { token: crypto.randomBytes(16).toString('hex') }

		const confirmToken = await Verify.findOneAndUpdate({
			_user: findUser._id
		},
		tokenUpdate,
		{
			new: true,
			upsert: true
		})

		// send email
		sendVerifyEmail(findUser.email, confirmToken.token)

		return res.json({ data: 'email confirmation is sent!' })

	} catch (err) {
		return res.status(500).json(errorMsg(err.message))
	}

}


// VALIDATE_TOKEN function
export const validateToken = async (req, res) => {

	// get token from header
	const token = req.header('x-auth-token')
	if (!token) return res.status(401).json(errorMsg('missing auth header'))

	try {
		const verified = jwt.verify(token, process.env.JWT_SECRET)
		if (!verified) return res.status(401).json(errorMsg(''))

		// find if user exists
		const verifiedUser = await User.findById(verified.id)
		if (!verifiedUser) return res.status(401).json(errorMsg('cannot find user'))

		return res.json(createUserObj(verifiedUser))

	} catch (err) {
		res.status(500).json(errorMsg(err.message))
	}

}
