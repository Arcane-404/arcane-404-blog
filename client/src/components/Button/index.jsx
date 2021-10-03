import React from 'react'
import { ButtonBox } from './_Button.styles'

export default function Button ({ children, text, ...props }) {
	return <ButtonBox { ...props }>{ text || children }</ButtonBox>
}
