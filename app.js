import express from 'express'
import logger from 'morgan'
import cors from 'cors'

import {
	userRoutes, blogRoutes, voteRoutes
} from './routes/index.js'

const app = express()


import auth from './middlewares/auth.js'
import authAdmin from './middlewares/auth_admin.js'

// middleware setup
app.use(logger('combined'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/vote', voteRoutes)

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

export default app
