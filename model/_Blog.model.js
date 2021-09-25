import mongoose from 'mongoose'
const Schema = mongoose.Schema

const BlogSchema = new Schema({
	title: { type: String },
	body: { type: String },
	votes: {
		upVotes: { type: Number },
		downVotes: { type: Number }
	},
	comments: [ { type: String } ],
	createdOn: { type: Date, default: Date.now }
})

const BlogModel = mongoose.model('Blog', BlogSchema)

export default BlogModel
