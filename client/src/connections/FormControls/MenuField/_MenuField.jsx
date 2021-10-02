import React from 'react'
import { Field } from 'formik'
import { FieldControl } from './_MenuField.styles'
import {
	Label,
	ErrorText,
	Menu
} from '../../../components'


export default function MenuField ({ children, ...props }) {
	return <Field { ...props }>{ children }</Field>
}

MenuField.Control = function TFControl ({ children, ...props }) {
	return <FieldControl { ...props }>{ children }</FieldControl>
}

MenuField.Label = function TFLabel ({ children, text, ...props }) {
	return <Label { ...props }>{ text || children }</Label>
}

MenuField.Menu = function TFMenu ({ children, text, ...props }) {
	return <Menu { ...props }>{ text || children }</Menu>
}

MenuField.Error = function TFError ({ children, text, ...props }) {
	return <ErrorText { ...props }>{ text || children }</ErrorText>
}
