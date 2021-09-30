import React from 'react'
import { useHistory } from 'react-router-dom'

import { DownVote, UpVote } from '../../connections'
import PostCard from './_PostCard'

const PostCardContainer = ({ headline, tagline, topic, timestamp, image }) => {
	const history = useHistory()
	const navigate = (path) => history.push(path)

	const onClick = () => {
		navigate('/blog/content')
	}

	return (
		<PostCard onClick={ onClick }>
			<PostCard.Headline>{ headline }</PostCard.Headline>

			<PostCard.Tagline>{ tagline }</PostCard.Tagline>

			<PostCard.Topic>{ topic }</PostCard.Topic>

			<PostCard.Timestamp>{ timestamp }</PostCard.Timestamp>
			
			<PostCard.Image src={ image } /> 
			<UpVote />
			<DownVote />
		</PostCard>
		
	)
}

export default PostCardContainer
