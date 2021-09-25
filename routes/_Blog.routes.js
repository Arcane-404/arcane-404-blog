import express from 'express'

import { BlogControllers } from '../controllers/index.js'

const blogRouter = express.Router()

blogRouter
	.get('/', BlogControllers.findAll)
	.post('/create', BlogControllers.postOne)
	.put('/blog/:id', BlogControllers.updateOne)
	.delete('/blog/:id', BlogControllers.deleteOne)

export default blogRouter
