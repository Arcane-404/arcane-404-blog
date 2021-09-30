import React from 'react'

import { Main } from '../../components'
import { PostCard } from '../../containers'
import { posts } from '../../json'

//   Array(5).fill().
const HomePage = () => {
	return (
		<Main>
			<Main.Wrapper>		
				{posts.data.map((val) => (
					<PostCard 
						key={ val.id } 
						headline={ val.title } 
						tagline={ val.tags } 
						topic={ val.text } 
						timestamp={ val.publishDate }
						image={ val.image }
					/>
				))}
			</Main.Wrapper>
		</Main>
	)
}

export default HomePage
