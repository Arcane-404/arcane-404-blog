import mongoose from 'mongoose'

const { Schema, model } = mongoose

const VerifySchema = new Schema({
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	token: {
		type: String,
		required: true
	},
	expireAt: {
		type: Date
	}
})

const Verify = model('Verify', VerifySchema)

export default Verify
