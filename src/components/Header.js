import React from 'react'
import styled from 'styled-components'
import logo from '../images/logo.png'

const LogoContainer = styled.div`
  margin: 2rem auto;
`

const LogoImage = styled.img`
  height: 50px;
`

const Header = () => (
  <LogoContainer>
    <LogoImage src={ logo } />
  </LogoContainer>
)
export default Header