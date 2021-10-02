import styled from '@emotion/styled'
import {
	chakra,
	FormControl,
	FormLabel,
	Input,
	Select,
	Stack,
	Textarea,
	Button,
	Heading
} from '@chakra-ui/react'

export const FormWrapper = chakra(Stack, {
	baseStyle: {
	  gap: '1.5em'
	}
})

export const FormHeading = chakra(Heading, {
	baseStyle: {
	  my: '1em'
	}
})

export const FormControler = chakra(FormControl, {
	baseStyle: {}
})

export const FormLabeling = chakra(FormLabel, {
	baseStyle: {}
})

export const FormSelect = chakra(Select, {
	baseStyle: {}
})

export const SelectOption = styled.option``

export const FormInput = chakra(Input, {
	baseStyle: {}
})

export const FormTextArea = chakra(Textarea, {
	baseStyle: {}
})

export const FormButton = chakra(Button, {
	baseStyle: {
	  bg: 'teal.300',
	  _hover: { bg: 'teal.400' },
	  _active: { bg: 'teal.600' }
	}
})
