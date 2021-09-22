import React from 'react'
import Footer from './_Footer'

const FooterNavigation = () => {
	return (
		<Footer>
			<Footer.Wrapper>
				<Footer.Menu>
					<Footer.Path to="/">
						<Footer.Center> <Footer.Home /> Home </Footer.Center>
					</Footer.Path>
					<Footer.Path to="search">
						<Footer.Center> <Footer.Search /> Search </Footer.Center>
					</Footer.Path>
					<Footer.Path to="submit">
						<Footer.Center>	<Footer.Post /> Post </Footer.Center>
					</Footer.Path>
				</Footer.Menu>
			</Footer.Wrapper>
		</Footer>
	)
}

export default FooterNavigation