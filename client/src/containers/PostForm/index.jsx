import React from 'react'
import { usePost } from '../../hooks'
import { Form , Option } from '../../components'
import { Alert, FormControls } from '../../connections'

const { TextField, TextAreaField, Menu } = FormControls

function PostForm () {

	const { message, postSchemaProps } = usePost()

	return (
		<Form { ...postSchemaProps }>
			{(props) => (
				<Form.Form>
					<Form.Heading>New Post</Form.Heading>
					<TextField name="imgUrl" label="Image URL" placeholder="Enter image url link" />
					<TextField name="title" label="Title" placeholder="Enter title here" />
					<TextField name="tagline" label="Tagline" placeholder="Enter post tagline" />
					<Menu name="category" label="Category" placeholder="Select post category">
						<Option value="Front-End">Front-End</Option>
						<Option value="Back-End">Back-End</Option>
						<Option value="React-Only">React-Only</Option>
						<Option value="CSS">CSS</Option>
					</Menu>
					<TextAreaField name="description" label="Description" placeholder="Enter your post description" />
					<TextField name="tags" label="tags" placeholder="Enter tags here" />
					<Alert status={ message.status } text={ message.text } />
					<Form.Submit text="Login" isLoading={ props.isSubmitting } />
				</Form.Form>
			)}
		</Form>
	)
}

export default PostForm
