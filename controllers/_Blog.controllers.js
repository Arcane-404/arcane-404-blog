// Modularizing
import BlogModel from '../model/_Blog.model.js'

export const findAll = (req, res) => {
	BlogModel.find().then((blogs) => {
		res.json(blogs)
	})
}

export const postOne = (req, res) => {
	BlogModel.create({
		title: req.body.title,
		body: req.body.body
	}).then((newBlog) => {
		res.json(newBlog)
		// console.log(newBlog)
	}).catch((err) => {
		res.json(err)
	})
}

export const updateOne = (req, res) => {
	BlogModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
		.then((updated) => {
			res.json(updated)
		}).catch((err) => res.send(err))
}

export const deleteOne = (req, res) => {
	BlogModel.findByIdAndDelete({ _id: req.params.id }).then(() => {
		res.send(`deleted ${req.params.id}`)
	}).catch((err) => res.send(err))
}
