import express from 'express'
const router = express.Router()
import { BlogControllers } from '../controllers/index.js'
// API route to get all blogs
router.get('/blog', BlogControllers.findAll)

// Route to post a new blog
router.post('/blog', BlogControllers.postOne)

// Route to update an existing blog
router.put('/blog/:id', BlogControllers.updateOne)

// Route to delete a blog
router.delete('/blog/:id', BlogControllers.deleteOne)

export default router
