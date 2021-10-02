import {
	Box, chakra, Heading, Image, Tag, Text 
} from '@chakra-ui/react'

export const ContentCardBox = chakra(Box, {
	baseStyle: {
		m: 5,
		border: '1px'
	}
})
export const ContentCardHeadline = chakra(Heading, {})
export const ContentCardTagline = chakra(Tag, {})
export const ContentCardTopic = chakra(Text, {})
export const ContentCardImage = chakra(Image, {})
export const ContentCardTimestamp = chakra(Text, {})