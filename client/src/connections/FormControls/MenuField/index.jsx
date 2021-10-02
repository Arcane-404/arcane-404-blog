import React from 'react'
import MenuField from './_MenuField'

/* eslint-disable */
const MenuFieldConnection = ({
	children,
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
		<MenuField name={ name }>
			{({ field, meta }) => (
				<MenuField.Control isInvalid={ meta.touched && meta.error }>
					<MenuField.Label htmlFor={ name } text={ label } />
					<MenuField.Menu id={ name } { ...inputProps } { ...field }>
						{children}
					</MenuField.Menu>
					{	meta.touched && meta.error && <MenuField.Error text={ meta.error } /> }
				</MenuField.Control>
			)}
		</MenuField>
	)
}

export default MenuFieldConnection
