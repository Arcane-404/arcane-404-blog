import { chakra, Text } from '@chakra-ui/react'

export const UpVoteArrow = chakra(Text, {})

export const UpVoteCounter = chakra(Text, {
	baseStyle: {
		m: 5,
		border: '1px'
	}
})