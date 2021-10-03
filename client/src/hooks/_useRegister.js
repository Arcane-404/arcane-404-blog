import { useState } from 'react'
import * as yup from 'yup'
import { EmailConsumer } from '../context'
import { authAttributes } from '../json'
import { api } from '../services/api'

const {
	AVATAR,
	USERNAME,
	EMAIL,
	PASSWORD,
	PASSWORD_CONFIRM
} = authAttributes

const initialMessage = {
	status: undefined,
	text: undefined
}

const useRegister = () => {

	const { setEmail } = EmailConsumer()

	const [ message, setMessage ] = useState(initialMessage)

	// Formik prop: initial state values
	const initialValues = {
		[AVATAR]: '',
		[USERNAME]: '',
		[EMAIL]: '',
		[PASSWORD]: '',
		[PASSWORD_CONFIRM]: ''
	}

	// Formik prop: to check validation on values
	const validationSchema = yup.object({
		[EMAIL]: yup.string().required().email(),
		[PASSWORD]: yup.string().required().min(6).max(16),
		[PASSWORD_CONFIRM]: yup.string()
			.required(`please confirm your ${ PASSWORD }`)
			.oneOf([ yup.ref(PASSWORD) ], `${ PASSWORD } must match`)
	})

	// Formik prop: to check verification & handle submit
	const onSubmit = async (values, actions) => {
		const { passwordConfirm, ...body } = values

		try {
			// post - '/blog/register' - body
			const { data } = await api.registerUser(body)

			actions.setSubmitting(false)
			actions.resetForm()

			setEmail(data.email)
			setMessage({
				status: data.status,
				text: data.message
			})
		} catch (error) {
			setMessage({
				status: 'error',
				text: error.message
			})
		}
	}

	return {
		message,
		registerSchemaProps: {
			initialValues,
			validationSchema,
			onSubmit
		}
	}
}

export default useRegister
