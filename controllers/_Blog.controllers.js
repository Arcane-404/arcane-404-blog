import Blog from '../model/_Blog.model.js'

export const createBlog = async (req, res) => {
	try {
		// getting title, body from front end
		const { title, body } = req.body
		const id = req.auth.id

		// Create a new blog
		const newBlog = await Blog.create({
			author: {
				id
			},
			title,
			body
		})

		// return newBlog to client
		return res.status(200).json({ blog: newBlog })

	} catch (err) {
		console.log(err.message)
		// if error return err message to clinet
		return res.status(500).json({ message: err.message })
	}
}

