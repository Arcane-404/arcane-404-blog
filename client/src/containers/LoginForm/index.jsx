import React, { useState } from 'react'
// import Login from './_LoginForm'
import { Form } from '../../components'
import { Alert, FormControls } from '../../connections'
import { useLogin } from '../../hooks'
import { authAttributes } from '../../json'
import { api } from '../../services/api'
const { EMAIL, PASSWORD } = authAttributes

const LoginForm = () => {

	const { message, loginSchemaProps } = useLogin()

	const [ resent, setResent ] = useState(false)

	const handleResent = async () => {
		if (!message?.email) return
		try {
			// post - '/user/login' - email
			const response = await api.resendVerification(message.email)
			console.log('resend', response, resent)
			setResent(true)
		} catch (error) {	console.error('sent', error) }
	}

	return (
		<Form { ...loginSchemaProps }>
			{ (props) => (
				<Form.Form>
					<Form.Heading>Welcome Back</Form.Heading>

					<FormControls.TextField name={ EMAIL } label="Email" />

					<FormControls.TextField name={ PASSWORD } label="Password" />

					<Alert status={ message.status } text={ message.text } />

					<Form.Submit text="Login" isLoading={ props.isSubmitting } />

					{ // display resend button
						(message?.notVerified && !resent) && (
							<p>
								Click here to{' '}
								<span onClick={ handleResent } role="button">
									resend email verification
								</span>
							</p>
						)
					}

					{ // display resent successful
						(message?.notVerified && resent) &&
						 <Alert status="success" text="email verification has been resent" />
					}

					<Form.Text>
						don't have an account?{' '}
						<Form.Path to="/register">sign up</Form.Path>
					</Form.Text>
				</Form.Form>
			)}
		</Form>
	)
}

export default LoginForm
