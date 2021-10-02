import React, { useState } from 'react'

import DownVote from './_DownVote'

const DownVoteButton = () => {
	const [ decrement, setDecrement ] = useState(0)
	const onClick = () => {
		setDecrement(decrement - 1)
	}
	return (
		<DownVote onClick={ onClick } >
			<DownVote.Counter>{ decrement }</DownVote.Counter>
		</DownVote>
	)
}

export default DownVoteButton