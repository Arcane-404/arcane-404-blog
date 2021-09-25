import mongoose from 'mongoose'

const { Schema, model } = mongoose

Schema.Types.String.set('trim', true)

const UserSchema = new Schema({
	username: {
		type: String,
		default: 'anonymous'
	},
	email: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	role: {
		type: String,
		default: 'USER'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
})

export default model('User', UserSchema)
