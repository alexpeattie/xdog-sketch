import React from 'react'
import { connect } from 'react-redux'
import logo from '../images/logo.png'
import SettingsPane from './SettingsPane'
import PresetImages from './PresetImages'
import styled from 'styled-components'
import ContainerDimensions from 'react-container-dimensions'

const ColorImage = styled.img`
  max-width: 100%;
`

const emptyState = () => (
  <div className="empty">
    <div className="empty-icon">
      <i className="icon icon-3x icon-photo"></i>
    </div>
    <p className="empty-title h5">Upload a picture</p>
    <p className="empty-subtitle">Drag and drop or select a file.</p>
    <div className="empty-action">
      <button className="btn btn-primary">Browse...</button>
    </div>
  </div>
)

const sketchedState = (url, originalUrl, width) => (
  <div className="comparison-slider">
    <figure className="comparison-before">
      <ColorImage src={ url } maxHeight={ width * 0.75 } />
    </figure>

    <figure className="comparison-after">
      <ColorImage src={ originalUrl } maxHeight={ width * 0.75 } />
      <textarea className="comparison-resizer" readonly></textarea>
    </figure>
  </div>
)

const UploadPrompt = props => {
  return (
    <div className="container grid-lg">
      <div style={ { margin: '30px auto'} }>
        <img src={ logo } height='50' />
      </div>
      <div className="columns">
        <div className="column col-6" style={{ 'minHeight': '476px' }}>
          <ContainerDimensions>
            { 
              ({ width }) => {
                return (props.image.url ? <ColorImage src={ props.image.url } maxHeight={ width * 0.75 } /> : emptyState())
              }
            }
          </ContainerDimensions>
          <PresetImages />
        </div>
        <SettingsPane />
      </div>
    </div>
  )
}

export default connect(({ image }) => ({ image }))(UploadPrompt)