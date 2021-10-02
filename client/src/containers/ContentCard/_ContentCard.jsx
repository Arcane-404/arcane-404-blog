import React from 'react'

import {
	ContentCardBox, ContentCardHeadline, ContentCardImage, ContentCardTagline, ContentCardTimestamp, ContentCardTopic 
} from './_ContentCard.styles'

export default function ContentCard ({ children, ...props }) {
	return <ContentCardBox { ...props }>{ children }</ContentCardBox>
}

ContentCard.Headline = function CCHeadline ({ children, ...props }) {
	return <ContentCardHeadline { ...props }>{ children }</ContentCardHeadline>
}

ContentCard.Tagline = function CCTagline ({ children, ...props }) {
	return <ContentCardTagline { ...props }>{ children }</ContentCardTagline>
}

ContentCard.Topic = function CCTopic ({ children, ...props }) {
	return <ContentCardTopic { ...props }>{ children }</ContentCardTopic>
}

ContentCard.Image = function CCImage ({ children, ...props }) {
	return <ContentCardImage { ...props }>{ children }</ContentCardImage>
}

ContentCard.Timestamp = function CCTimestamp ({ children, ...props }) {
	return <ContentCardTimestamp { ...props }>{ children }</ContentCardTimestamp>
}
