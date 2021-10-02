import React from 'react'

import { Main } from '../../components'
import { ContentCard } from '../../containers'

const ContentPage = ({ content, setContent }) => {
	return (
		<Main>
			<Main.Wrapper>
				<ContentCard
					content={ content }
					setcontent={ setContent }
				/>
			</Main.Wrapper>
		</Main>
	)
}

export default ContentPage
