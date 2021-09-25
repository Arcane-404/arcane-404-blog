import mongoose from 'mongoose'
const Schema = mongoose.Schema

const VoteSchema = new Schema ({
	count: {
		type: Number
	}
})

const VoteModel = mongoose.model('Vote', VoteSchema)

export default VoteModel
