import React from 'react'
import { MenuBox } from './_Menu.styles'

export default function Menu ({ children, ...props }) {
	return <MenuBox { ...props }> { children } </MenuBox>
}
