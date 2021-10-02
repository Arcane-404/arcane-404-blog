import React, { useState } from 'react'

import UpVote from './_UpVote'

const UpVoteButton = () => {
	const [ increment, setIncrement ] = useState(0)
	const onClick = () => {
		setIncrement(increment + 1)
	}
	return (
		<UpVote onClick={ onClick } >
			<UpVote.Counter>{ increment }</UpVote.Counter>
		</UpVote>
	)
}

export default UpVoteButton