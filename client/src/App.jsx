import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { PrivateRoute, ProtectedRoute } from './routes'
import { FooterNavigation, HeaderOption } from './containers'
import { EmailProvider } from './context/provider'
import {
	HomePage,
	ContentPage,
	TopicPage,
	PostPage,
	LoginPage,
	RegisterPage,
	ConfirmPage,
	ErrorPage
} from './pages'

const App = () => {
	const [ content, setContent ] = useState(null)

	return (
		<>
			<HeaderOption />

			<Switch>
				<Route path="/" exact>
					<HomePage content={ content } setContent={ setContent } />
				</Route> {/* Home */}
				<Route path="/blog/content">
					<ContentPage content={ content } setContent={ setContent } />
				</Route> {/* Content */}
				<Route path="/admin/post" component={ PostPage } /> {/* Post */}
				<Route path="/user/topic" component={ TopicPage } /> {/* Topic */}
				<EmailProvider>
					<ProtectedRoute path="/confirm/:confirmId" component={ ConfirmPage } /> {/* Confirm */}
					<ProtectedRoute path="/login" element={ LoginPage } /> {/* Login */}
					<ProtectedRoute path="/register" component={ RegisterPage } /> {/* Register */}
				</EmailProvider>
				<Route path="*" component={ ErrorPage } /> {/* Error Page */}
			</Switch>

			<FooterNavigation />
		</>
	)
}

export default App
