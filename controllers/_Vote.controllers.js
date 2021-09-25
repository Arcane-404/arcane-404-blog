import VoteModel from '../model/_Vote.model.js'

export const getVotes = (req, res) => {
	VoteModel.find().then((votes) => {
		res.json(votes)
	}).catch((err) => res.send(err))
}

export const updateVotes = (req, res) => {
	VoteModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
		.then((updatedVoteCount) => {
			res.json(updatedVoteCount)
		})
		.catch((err) => res.send(err))
}
