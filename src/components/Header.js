import React from 'react'
import styled from 'styled-components'
import logo from '../images/logo.png'
import { connect } from 'react-redux'
import { openModal } from '../actions/aboutActions'

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

const Header = props => {
  return (
    <HeaderContainer>
      <a href='/'><LogoImage src={ logo } /></a>
      <AboutButton onClick={ () => props.dispatch(openModal()) } className='btn'>
        About
      </AboutButton>
    </HeaderContainer>
  )
}
export default connect()(Header)