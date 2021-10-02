import { chakra, Text } from '@chakra-ui/react'

export const DownVoteArrow = chakra(Text, {})

export const DownVoteCounter = chakra(Text, {
	baseStyle: {
		m: 5,
		border: '1px'
	}
})