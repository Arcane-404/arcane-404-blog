import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import {
	userRoutes, blogRoutes, voteRoutes
} from './routes/index.js'

const app = express()

// middleware setup
app.use(logger('combined'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// EDIT: figure out path setup
app.use('/api/users', userRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/vote', voteRoutes)

// EDIT: can we get the '/' route ready for react
app.get('/', (req, res) => {
	res.send('index page')
})

export default app
