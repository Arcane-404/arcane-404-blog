import { useState, useEffect } from 'react'
import { useStorage } from './'
import { api } from '../services/api'

const KEY_TOKEN = 'token'
const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN || null

const useAuth = () => {

	const [ token, setToken, removeToken ] = useStorage( KEY_TOKEN, AUTH_TOKEN )
	const [ isAuth, setAuth ] = useState( false )
	const [ user, setUser ] = useState( null )

	// initial load & login
	useEffect(() => {
		(async () => {
			if (!token) return null
			try {
				// post - '/user/validateToken' - token
				const data = await api.validateToken(token)
				setUser(data) // { user }
				setAuth(true)
			} catch (error) {
				console.error('token', error)
				removeToken()
			}
		})()
	}, [ token, removeToken ])

	// once logged in: auth == true, token is stored, include user info
	const login = (data) => new Promise((resolve, reject) => {
		if (!data?.token || !data?.user) return reject()
		setAuth(true)
		setToken(data.token)
		setUser(data.user)
		resolve()
	})

	// once logged out: auth == false, token is removed, null the user
	const logout = () => new Promise((resolve) => {
		setAuth(false)
		removeToken()
		setUser(null)
		resolve()
	})

	return {
		isAuth,
		user,
		login,
		logout
	}
}

export default useAuth
