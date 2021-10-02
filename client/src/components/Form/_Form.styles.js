import {
	chakra,
	Heading,
	Text
} from '@chakra-ui/react'
import { Form } from 'formik'
import { Link } from 'react-router-dom'
import { Button } from '..'

// export const FormFormik = chakra(Formik, {})

export const FormBox = chakra(Form, {
	baseStyle: {
		// border: '1px',
		m: 2,
		p: 5,
		rounded: 'md',
		flex: '1 1 auto',
		borderRadius: '10px',
		boxShadow: '0 0 2em #ccc'
	}
})

export const FormHeading = chakra(Heading, {
	baseStyle: {
	  my: '1em'
	}
})

export const FormSubmit = chakra(Button, {
	baseStyle: {
		mt: 4,
	  bg: 'teal.300',
	  _hover: { bg: 'teal.400' },
	  _active: { bg: 'teal.600' }
	}
})

export const FormText = chakra(Text, {
	baseStyle: {
		mt: 4
	}
})

export const FormPath = chakra(Link, {
	baseStyle: {
		color: 'teal.300',
	  _hover: { color: 'teal.400' },
	  _active: { color: 'teal.600' }
	}
})
