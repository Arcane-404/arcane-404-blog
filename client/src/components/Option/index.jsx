import { OptionBox } from './_Option.styles'

import React from 'react'

function Option ({ children, ...props }) {
	return (
		<OptionBox { ...props }> { children } </OptionBox>
	)
}

export default Option

