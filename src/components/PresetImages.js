import React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import bugatti from '../images/bugatti.jpg'
import lenna from '../images/lenna.jpg'
import baboon from '../images/baboon.jpg'
import headscarf from '../images/headscarf.jpg'
import peppers from '../images/peppers.jpg'
import { loadNewImage } from '../actions/imageActions'

const FULL_SIZE = {
  peppers: 'https://i.imgur.com/3rRblfO.jpg',
  headscarf: 'https://i.imgur.com/eB8UNho.jpg',
  baboon: 'https://i.imgur.com/332GZbX.jpg',
  lenna: 'https://i.imgur.com/tWSRzVw.jpg',
  bugatti: 'https://i.imgur.com/CjRP6ZI.jpg'
}

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

const Prompt = styled.p`
  margin-bottom: 0.4rem;
  font-size: 14px;
`

const PresetImages = props => {
  const selectPreset = (url, filename) => {
    props.dispatch(loadNewImage(url, filename))
  }

  return (
    <Presets>
      <Prompt>Or choose a preset...</Prompt>
      <div>
        <Thumb alt='Preset image: Peppers' src={ peppers } onClick={ () => selectPreset(FULL_SIZE.peppers, 'peppers.jpg') } />
        <Thumb alt='Preset image: Headscarf' src={ headscarf } onClick={ () => selectPreset(FULL_SIZE.headscarf, 'headscarf.jpg') } />
        <Thumb alt='Preset image: Lenna' src={ lenna } onClick={ () => selectPreset(FULL_SIZE.lenna, 'lenna.jpg') } />
        <Thumb alt='Preset image: Baboon' src={ baboon } onClick={ () => selectPreset(FULL_SIZE.baboon, 'baboon.jpg') } />
        <Thumb alt='Preset image: Bugatti' src={ bugatti } onClick={ () => selectPreset(FULL_SIZE.bugatti, 'bugatti.jpg') } last />
      </div>
    </Presets>
  )
}

export default connect()(PresetImages)