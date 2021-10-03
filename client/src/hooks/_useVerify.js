import {
	useEffect,
	useCallback,
	useState
} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { EmailConsumer } from '../context'
import { api } from '../services/api'
import { delay } from '../utils/_helpers'

const initialMessage = {
	status: undefined,
	text: undefined
}

const initialResent = {
	status: false,
	text: 'Resend email for verification'
}

const DELAY_CONFIRMATION = 1500

const useVerify = () => {

	const { email } = EmailConsumer()

	// hook to redirect route
	const { confirmId } = useParams()
	const history = useHistory()
	const navigate = useCallback((path) => history.push(path), [ history ])

	const [ message, setMessage ] = useState(initialMessage)
	const [ resent, setResent ] = useState(initialResent)

	const verifyWarning = () => {
		setMessage({
			status: 'warning',
			text: 'Unable to verify account.'
		})
	}

	// resend verification via email link
	const resendLink = async () => {
		if (!email) return null
		if (resent.status) return null

		try {
			// post - '/user/login' - email
			const { data } = await api.resendVerification(email)
			setResent({
				status: true,
				text: data.message
			})
		} catch (error) {	console.error('resend', error) }
	}

	useEffect(() => {
		(async () => {
			// check if confirmId is not included
			if (resent.status) return null
			if (!confirmId) return verifyWarning()

			try {
				// post - '/user/confirm' - confirmId
				const { data } = await api.makeConfirmation(confirmId)

				setMessage({
					status: data.status, // success
					text: data.message
				})

				delay(DELAY_CONFIRMATION).then(() => {
					setMessage(initialMessage)
					navigate('/login')
				})
			} catch (error) {
				console.error('verify', error)
				verifyWarning()
			}
		})()
	}, [ navigate, resent, confirmId ])

	return {
		message,
		resent,
		resendLink
	}
}

export default useVerify
