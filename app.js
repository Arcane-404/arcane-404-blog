import express from 'express'
import logger from 'morgan'
import cors from 'cors'

// EDIT: we can make it into a single import
import userRoutes from './routes/User.routes.js'
import blogRoutes from './routes/Blog.routes.js'
import voteRoutes from './routes/Vote.routes.js'

const app = express()

// middleware setup
app.use(logger('combined'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// EDIT: figure out path setup
app.use('/api/users', userRoutes)
app.use('/api', blogRoutes)
app.use('/api', voteRoutes)

// EDIT: can we get the '/' route ready for react
app.get('/', (req, res) => {
	res.send('index page')
})

export default app
