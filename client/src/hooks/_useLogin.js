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

const useLogin = () => {

	// hook to redirect route
	const history = useHistory()
	const navigate = (path) => history.push(path)

	// allow user to authenticate
	const { login } = AuthConsumer()

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

			if (!data.token && data.message) {
				 setMessage({
					status: 'error' || 'success',
					text: data.message
				})
				return
			}

			setMessage({
				status: data.status || 'success',
				text: 'login success'
			})

			delay(1500).then(() => {
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
