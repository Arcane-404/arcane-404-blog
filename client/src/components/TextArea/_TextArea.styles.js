import { chakra, Textarea } from '@chakra-ui/react'

export const TextAreaBox = chakra(Textarea, {
	baseStyle: {
		minH: '150px'
	}
})
