import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'

import { FooterNavigation, HeaderOption } from './containers'
import {
	ConfirmPage, ContentPage, ErrorPage, HomePage, LoginPage, PostPage, RegisterPage, TopicPage 
} from './pages'
import { PrivateRoute, ProtectedRoute } from './routes'

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
				<ProtectedRoute path="/confirm/:confirmId" component={ ConfirmPage } /> {/* Confirm */}
				<ProtectedRoute path="/login" element={ LoginPage } /> {/* Login */}
				<ProtectedRoute path="/register" component={ RegisterPage } /> {/* Register */}
				<Route path="*" component={ ErrorPage } /> {/* Error Page */}
			</Switch>

			<FooterNavigation />
		</>
	)
}

export default App
