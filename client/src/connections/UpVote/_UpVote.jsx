import React from 'react'

import { UpVoteArrow,
	UpVoteCounter } from './_UpVote.styles'

export default function UpVote ({ children, ...props }) {
	return <UpVoteArrow { ...props }>{ children }</UpVoteArrow>
}

UpVote.Counter = function DVCounter ({ children, ...props }) {
	return <UpVoteCounter { ...props }>{ children }</UpVoteCounter>
}