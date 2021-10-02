import React from 'react'
import { Redirect } from 'react-router-dom'

import ContentCard from './_ContentCard'

const ContentCardContainer = ({ content, setContent }) => {
	if (!content) return <Redirect to="/" />
	return (
		<ContentCard>
			<ContentCard.Headline>{ content.headline }</ContentCard.Headline>

			<ContentCard.Tagline>{ content.tagline }</ContentCard.Tagline>

			<ContentCard.Topic>{ content.topic }</ContentCard.Topic>

			<ContentCard.Timestamp>{ content.timestamp }</ContentCard.Timestamp>

			<ContentCard.Image src={ content.image } /> 
		</ContentCard>
	)
}

export default ContentCardContainer