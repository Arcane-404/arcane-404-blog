import express from 'express'

import { BlogControllers } from '../controllers/index.js'

const blogRouter = express.Router()

blogRouter
	.post('/create', BlogControllers.createBlog)

export default blogRouter
