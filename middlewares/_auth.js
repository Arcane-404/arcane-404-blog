import jwt from 'jsonwebtoken'

const authJWT = async (request, response, next) => {
	// check for token
	const token = request.header('x-auth-token')
	if (!token) {
		return response.status(401).json({ message: 'Token required!' })
	}
	try {
		const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
		if (!verifiedToken.user) {
			return response.status(401).json({ message: 'Invalid token format!' })
		}

		if (!verifiedToken.user.isVerified) {
			return response.status(401).json({ message: 'Please verify your account!' })
		}
		// set req.auth
		request.auth = {
			...request.auth,
			id: verifiedToken.id,
			username: verifiedToken.user.username
		}

		next()

	} catch (error) {
		// check if jwt error type
		if (error instanceof jwt.JsonWebTokenError) {
			return response.status(401).json({ message: error.message })
		}
		return response.status(500).json({ message: error.message })
	}

}

export default authJWT
