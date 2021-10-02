import React from 'react'
import { Field } from 'formik'
import { FieldControl } from './_TextAreaField.styles'
import {
	Label,
	ErrorText,
	TextArea
} from '../../../components'


export default function TextAreaField ({ children, ...props }) {
	return <Field { ...props }>{ children }</Field>
}

TextAreaField.Control = function TFControl ({ children, ...props }) {
	return <FieldControl { ...props }>{ children }</FieldControl>
}

TextAreaField.Label = function TFLabel ({ children, text, ...props }) {
	return <Label { ...props }>{ text || children }</Label>
}

TextAreaField.TextArea = function TFTextArea (props) {
	return <TextArea { ...props } />
}

TextAreaField.Error = function TFError ({ children, text, ...props }) {
	return <ErrorText { ...props }>{ text || children }</ErrorText>
}
