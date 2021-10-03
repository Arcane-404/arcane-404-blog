import React from 'react'
import { Form } from '../../components'
import { Alert, FormControls } from '../../connections'
import { useRegister } from '../../hooks'
import { authAttributes } from '../../json'

const {
	EMAIL,
	PASSWORD,
	PASSWORD_CONFIRM
} = authAttributes

const RegisterForm = () => {

	const { message, registerSchemaProps } = useRegister()

	return (
		<Form { ...registerSchemaProps }>
			{ (props) => (
				<Form.Form>
					<Form.Heading>Create Account</Form.Heading>

					<FormControls.TextField name={ EMAIL } label="Email" />

					<FormControls.TextField name={ PASSWORD } label="Password" />

					<FormControls.TextField name={ PASSWORD_CONFIRM } label="Confirm Password" />

					<Alert status={ message.status } text={ message.text } />

					<Form.Submit text="Register" isLoading={ props.isSubmitting } />

					<Form.Text>
						already have an account?{' '}
						<Form.Path to="/login">login</Form.Path>
					</Form.Text>
				</Form.Form>
			)}
		</Form>
	)
}

export default RegisterForm
