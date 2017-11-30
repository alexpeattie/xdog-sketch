import React from 'react'
import styled from 'styled-components'
import logo from '../images/logo.png'

const HeaderContainer = styled.div`
  margin: 1.5rem auto 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LogoImage = styled.img`
  height: 50px;
`

const AboutButton = styled.button`
  flex-grow: 0;
`

const Header = () => (
  <HeaderContainer>
    <a href='/'><LogoImage src={ logo } /></a>
    <AboutButton className='btn'>
      About
    </AboutButton>
  </HeaderContainer>
)
export default Header