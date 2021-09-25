import mongoose from 'mongoose'
const Schema = mongoose.Schema

const BlogSchema = new Schema({
	author: {
		id: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		username: {
			type: String
		}
	},
	title: {
		type: String
	},
	body: {
		type: String
	},
	upvotes: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	downvotes: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	createdOn: {
		type: Date,
		default: Date.now
	}
})

const Blog = mongoose.model('Blog', BlogSchema)

export default Blog
