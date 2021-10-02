import React from 'react'

import { DownVoteArrow,
	DownVoteCounter } from './_DownVote.styles'

export default function DownVote ({ children, ...props }) {
	return <DownVoteArrow { ...props }>{ children }</DownVoteArrow>
}

DownVote.Counter = function DVCounter ({ children, ...props }) {
	return <DownVoteCounter { ...props }>{ children }</DownVoteCounter>
}