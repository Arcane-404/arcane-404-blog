import  React, {
	createContext,
	useContext,
	useMemo
} from 'react'
import { useStorage } from '../hooks'

const EmailContext = createContext(null)

const EmailConsumer = () => useContext(EmailContext)
// const EmailConsumer = () => {
// 	const context = useContext(EmailContext)
// 	if (!context) EmailConsumer()
// 	else return context
// }

const KEY_EMAIL = 'email'
const SAVED_EMAIL = undefined

export const EmailProvider = ({ children }) => {
	// const value = useVerify()
	const [ email, setEmail, removeEmail ] = useStorage( KEY_EMAIL, SAVED_EMAIL )

	const value = useMemo(() => (
		{ email, setEmail, removeEmail }
	), [ email, setEmail, removeEmail ])

	return (
		<EmailContext.Provider value={ value }>
			{ children }
		</EmailContext.Provider>
	)
}

export default EmailConsumer
