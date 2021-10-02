// Modularizing
import Blog from '../model/_Blog.model.js'

export const postOne = async (req, res) => {
	try {
		// console.log(req.body, req.auth)
		const { title, description, tags, categories, imageUrl } = req.body
		const { id, username } = req.auth

		const newBlog = await Blog.create({
			author: {
				id,
				username
			},
			title,
			description,
			tags,
			categories,
			imageUrl
		})
		return res.status(200).json({ blog: newBlog })

	} catch (err) {
		console.log(err.message)
		return res.status(500).json({ error: 'Blog Validation Failed' })
	}
}

// Get all blog posts
export const getAllBlogs = async (req, res) => {
	try {
		// find by "key" ex: "author.username" : "herman " || "title": "New Article"

		console.log(req.query)

		const allBlogs = await Blog.find()
		return res.status(200).json({ blogs: allBlogs })

	} catch (err) {
		res.status(500).json({ error: err.message })
	}
}

// Finding blog by id
export const searchBlogs = async (req, res) => {
	try {
		const id = req.params.id
		const foundBlog = await Blog.findById({ _id: id })
		return res.status(200).json({ blog: foundBlog })

	} catch (err) {
		return res.status(500).json({ error: err.message })
	}
}

// Update Blog by Id
export const updateBlogById = async (req, res) => {
	try {
		const id = req.params.id
		const { title, description, tags, categories, imageUrl } = req.body
		const updatedBlog = await Blog.findByIdAndUpdate(
			{ _id: id },
			{
				title,
				description,
				tags,
				categories,
				imageUrl
			},
			{ new: true }
		)
		return res.status(200).json({ blog: updatedBlog })

	} catch (err) {
		return res.status(500).json({ error: err.message })
	}
}

// Delete Blog by Id
export const deleteBlogById = async (req, res) => {
	try {
		const id = req.params.id
		const deleteBlog = await Blog.findOneAndDelete({ _id: id })
		return res.status(200).json({ message: 'successfully deleted!', blog: deleteBlog })

	} catch (err) {
		return res.status(500).json({ error: err.message })
	}
}

// Add user Id to blog upvote
export const upvoteBlog = async (req, res) => {
	try {
		const { id: blogId } = req.params
		// Make id: userId
		const { id, username } = req.auth
		const exists = await Blog.find(
			{
				'_id': blogId,
				'upvotes.id': id
			}
		)
		if (exists.length >= 1) {
			return res.status(403).json({ message: 'You have already upvoted once' })
		}
		const checkIfInsidDownpvote = checkForDownvote(id)

		if (checkIfInsidDownpvote) {
			// If vote is already in the up votes, remove the upvote
			const update = await Blog.findByIdAndUpdate(
				{ _id: blogId },
				{
					$pull: {
						downvotes: {
							id: id
						}
					},
					$push: {
						upvotes: {
							$each: [
								{ id, username }
							]
						}
					}
				},
				{ new: true }
			)
			return res.status(200).json({ updated: update })
		}
		else {
			const upvote = await Blog.findByIdAndUpdate(
				{ _id: blogId },
				{
					$push: {
						upvotes: {
							$each: [
								{ id, username }
							]
						}
					}
				},
				{ new: true }
			)
			return res.status(200).json(upvote)
		}

	} catch (err) {
		return res.status(500).json({ error: err.message })
	}
}

// Add user id to blog downvote
export const downvoteBlog = async (req, res) => {
	try {
		const { id: blogId } = req.params
		const { id, username } = req.auth
		const exists = await Blog.find(
			{
				'_id': blogId,
				'downvotes.id': id
			}
		)
		if (exists.length >= 1) {
			return res.status(403).json({ message: 'You have already downvoted once' })
		}

		const checkIfInsideUpvote = checkForUpvote(id)

		if (checkIfInsideUpvote) {
			// If vote is already in the up votes, remove the upvote
			const update = await Blog.findByIdAndUpdate(
				{ _id: blogId },
				{
					$pull: {
						upvotes: {
							id: id
						}
					},
					$push: {
						downvotes: {
							$each: [
								{ id, username }
							]
						}
					}
				},
				{ new: true }
			)
			return res.status(200).json(update)
		} else {
			// If it does not exist, add to the array =>
			const downvotes = await Blog.findByIdAndUpdate(
				{ _id: blogId },
				{
					$push: {
						downvotes: {
							$each: [
								{ id, username }
							]
						}
					}
				},
				{ new: true }
			)
			return res.status(200).json(downvotes)
		}

	} catch (err) {
		return res.status(500).json({ error: err.message })
	}
}

// Helper function to check if id is already in upvote
const checkForUpvote = async (id) => {
	const findForDownVote = await Blog.find(
		{ 'downvote.id': id }
	)
	// if there is already a vote with the id return true
	if (findForDownVote.length >= 1) {
		return true
	} else {
		return false
	}
}

// Helper function to check if id is already in downvote
const checkForDownvote = async (id) => {
	const findForUpvote = await Blog.find(
		{ 'upvote.id': id }
	)
	// if there is already a vote with the id return true
	if (findForUpvote.length >= 1) {
		return true
	} else {
		return false
	}
}

// Delete all blogs
export const deleteAllBlogs = async (req, res) => {
	try {
		await Blog.deleteMany()
		res.status(200).send('deleted all')
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
}
