import React from 'react'
import { Button, Frame } from '../../components'
import { Alert } from '../../connections'
// import { EmailConsumer } from '../../context'
import { useVerify } from '../../hooks'

const ConfirmPage = (props) => {

	// const confirmId = props?.match?.params?.confirmId
	// const { resent, resendLink } = EmailConsumer()
	const { message, resent, resendLink } = useVerify()

	return (
		<Frame.Main>
			<Frame.Wrapper>
				<h3>Checking verification. One moment please.</h3>

				{ message.status && (
					<>
						<Alert status={ message.status } text={ message.text } />
						<Button text={ resent.text } onClick={ resendLink } />
					</>
				)}

			</Frame.Wrapper>
		</Frame.Main>
	)
}

export default ConfirmPage
