import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { AuthConsumer } from '../context'
import { authAttributes } from '../json'
import { delay } from '../utils/_helpers'
import { api } from '../services/api'

const { EMAIL, PASSWORD } = authAttributes

const initialMessage = {
	status: undefined,
	text: undefined
}

const DELAY_LOGIN = 1000

const useLogin = () => {

	// allow user to authenticate
	const { login } = AuthConsumer()

	// hook to redirect route
	const history = useHistory()
	const navigate = (path) => history.push(path)

	// include alert message for error or success
	const [ message, setMessage ] = useState(initialMessage)

	// Formik prop: initial state values
	const initialValues = {
		[EMAIL]: '',
		[PASSWORD]: ''
	}

	// Formik prop: to check validation on values
	const validationSchema = yup.object({
		[EMAIL]: yup.string().required().email(),
		[PASSWORD]: yup.string().required()
	})

	// Formik prop: to check verification & handle submit
	const onSubmit = async (values, actions) => {
		try {
			// post - '/user/login' - values
			const { data } = await api.loginUser(values)

			if (!data.token) {
				console.log('no verify email', data)
				setMessage({
					status: data.status, // warning
					text: data.message
				})
				return
			}

			setMessage({
				status: data.status, // success
				text: 'login success'
			})

			delay(DELAY_LOGIN).then(() => {
				actions.setSubmitting(false)
				setMessage(initialMessage)
				login(data).then(() => navigate('/'))
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
		loginSchemaProps: {
			initialValues,
			validationSchema,
			onSubmit
		}
	}
}

export default useLogin
