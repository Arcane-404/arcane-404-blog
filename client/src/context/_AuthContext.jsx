import  React, {
	createContext, useContext, useMemo
} from 'react'
import { useAuth } from '../hooks'

const AuthContext = createContext(null)

const AuthConsumer = () => useContext(AuthContext)
// const AuthConsumer = () => {
// 	const context = useContext(AuthContext)
// 	if (!context) AuthConsumer()
// 	else return context
// }

export const AuthProvider = ({ children }) => {
	// const value = useAuth()
	const {
		isAuth, user, login, logout
	} = useAuth()
	const value = useMemo(() => (
		{ isAuth, user, login, logout }
	), [ isAuth, user, login, logout ])

	return (
		<AuthContext.Provider value={ value }>
			{ children }
		</AuthContext.Provider>
	)
}

export default AuthConsumer
