import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'

// const initialMessage = {
// 	status: true,
// 	text: 'Yay...'
// }

const usePost = () => {
	// Initial Values
	const initialValues = {
		imgUrl: '',
		title: '',
		tagline: '',
		description: '',
		category: '',
		tags: ''
	}

	// Form Validation
	const validationSchema = yup.object({
		imgUrl: yup.string().trim().required(),
		title: yup.string().required().min(5).max(64).trim(),
		tagline: yup.string().required().min(5).max(128).trim(),
		description: yup.string().required().min(128).max(1600).trim(),
		category: yup.string().oneOf([ 'Front-End', 'Back-End', 'React-Only', 'CSS' ]).required(),
		tags: yup.string().trim()
	})

	// Form Submission
	const onSubmit = async (values, actions) => {
		console.log(values)
	}

	return {
		postSchemaProps: {
			initialValues,
			validationSchema,
			onSubmit
		}
	}
}

export default usePost
