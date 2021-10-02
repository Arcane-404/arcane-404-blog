import nodemailer from 'nodemailer'

// EDIT: find way to have express app localhost
const verifyURL = process.env.VERIFY_URL

const htmlTemplate = token => (`
	<!DOCTYPE html>
	<html>
		<head>
			<style>
				body { font: 400 1rem sans-serif; }
			</style>
		</head>
		<body>
			<header>
				<h2>
					Thank you for registering with Arcane-404-Blog!
				</h2>
			</header>
			<main>
				<p>
					Please click here to
					<a href="${ verifyURL }/${ token }">
						confirm your acoount
					</a>
				</p>
			</main>
			<footer>
				<h5> - Arcane-404 </h5>
			</footer>
		</body>
	</html>
`)

const sendVerifyEmail = async (userEmail, token) => {
	// create email transport
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		secure: false,
		requireTLS: true,
		auth: {
			user: process.env.DONOT_EMAIL,
			pass: process.env.DONOT_PASSWORD
		}
	})

	const mailOptions = {
		from: process.env.DONOT_EMAIL,
		to: userEmail,
		subject: 'Arcane-404-Blog: Please confirm your account',
		html: htmlTemplate(token)
	}

	// send email
	transporter.sendMail(mailOptions, (err, info) => {
		if (err) return console.error(err)
		return console.log(info.response)
	})
}

export default sendVerifyEmail
