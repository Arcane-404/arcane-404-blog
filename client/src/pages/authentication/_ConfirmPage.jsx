import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { api } from '../../services/api'

const ConfirmPage = (props) => {

	// hook to redirect route
	const history = useHistory()
	const navigate = (path) => history.push(path)

	console.log('params', props.match.params)
	const confirmId = props?.match?.params?.confirmId

	useEffect(() => {
		(async () => {
			try {
				// check if confirmId is not included
				if (!confirmId) return navigate('/login')

				// post - '/user/confirm' - confirmId
				await api.makeConfirmation(confirmId)
				//history.push('/login')
			} catch (error) {
				console.error(error)
				navigate('/login')
			}
		})()
	}, [ navigate, confirmId ])

	return (
		<div>
			<p>
				Click here to{' '}
				<a href="/login">login and confirm</a>
			</p>
		</div>
	)
}

export default ConfirmPage
