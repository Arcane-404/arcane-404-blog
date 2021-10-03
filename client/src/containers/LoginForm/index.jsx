import React from 'react'
import { Button, Form } from '../../components'
import { Alert, FormControls } from '../../connections'
import { useLogin, useVerify } from '../../hooks'
import { authAttributes } from '../../json'
const { EMAIL, PASSWORD } = authAttributes

const LoginForm = () => {

	const { message, loginSchemaProps } = useLogin()
	const { resent, resendLink } = useVerify()

	return (
		<Form { ...loginSchemaProps }>
			{ (props) => (
				<Form.Form>
					<Form.Heading>Welcome Back</Form.Heading>

					<FormControls.TextField name={ EMAIL } label="Email" />

					<FormControls.TextField name={ PASSWORD } label="Password" />

					{ message.status && (
						<>
							<Alert status={ message.status } text={ message.text } />
							<Button text={ resent.text } onClick={ resendLink } />
							<br />
						</>
					)}

					<Form.Submit text="Login" isLoading={ props.isSubmitting } />

					<Form.Text>
						don't have an account?{' '}
						<Form.Path to="/register">sign up</Form.Path>
					</Form.Text>
				</Form.Form>
			)}
		</Form>
	)
}

/*
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

*/

export default LoginForm
