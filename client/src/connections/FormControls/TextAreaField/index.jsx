import React from 'react'
import TextAreaField from './_TextAreaField'

/* eslint-disable */
const TextAreaConnection = ({
	name = 'text',
	label = 'Text',
	placeholder = ''
}) => {

	const inputProps = {
		autoComplete: 'off',
		autoCorrect: 'off',
		autoCapitalize: 'off',
		spellCheck: 'false',
    placeholder
		// autoFocus: { true }
	}

	return (
		<TextAreaField name={ name }>
			{({ field, meta }) => (
				<TextAreaField.Control isInvalid={ meta.touched && meta.error }>
					<TextAreaField.Label htmlFor={ name } text={ label } />
					<TextAreaField.TextArea id={ name } { ...inputProps } { ...field } />
					{	meta.touched && meta.error && <TextAreaField.Error text={ meta.error } /> }
				</TextAreaField.Control>
			)}
		</TextAreaField>
	)
}

export default TextAreaConnection
