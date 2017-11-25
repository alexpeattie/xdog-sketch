import React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import bugatti from '../images/bugatti.jpg'
import lenna from '../images/lenna.png'
import baboon from '../images/baboon.png'
import logo from '../images/logo.png'
import headscarf from '../images/headscarf.jpg'
import peppers from '../images/peppers.jpg'
import { loadNewImage } from '../actions/imageActions'

const Thumb = styled.img`
  max-height: 2rem;
  border-radius: 4px;
  margin: 0.2rem;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.3s ease;
  &:hover {
    opacity: 1;
  }
  ${ props => props.last && css`
    margin-right: 0;
  `}
`

const Presets = styled.div`
  margin-top: 0.5rem;
  text-align: left;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`

const PresetImages = props => {
  const selectPreset = url => {
    props.dispatch(loadNewImage(url))
  }

  return (<Presets>
    <p>Or choose a preset...</p>
    <div>
      <Thumb alt='Preset image: Peppers' src={ peppers } onClick={ () => selectPreset(peppers) } />
      <Thumb alt='Preset image: Headscarf' src={ headscarf } onClick={ () => selectPreset(headscarf) } />
      <Thumb alt='Preset image: Lenna' src={ lenna } onClick={ () => selectPreset(lenna) } />
      <Thumb alt='Preset image: Baboon' src={ baboon } onClick={ () => selectPreset(baboon) } />
      <Thumb alt='Preset image: Bugatti' src={ bugatti } onClick={ () => selectPreset(bugatti) } last />
    </div>
  </Presets>)
}

export default connect()(PresetImages)