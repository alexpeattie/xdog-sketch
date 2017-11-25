import React, { Component } from 'react'
import { connect } from 'react-redux'
import PresetImages from './PresetImages'
import styled from 'styled-components'
import ContainerDimensions from 'react-container-dimensions'
import Dropzone from 'react-dropzone'
import { readAsDataURL } from 'promise-file-reader'
import { loadNewImage } from '../actions/imageActions'

const ColorImage = styled.img`
  max-width: 100%;
`

class UploadPrompt extends Component {
  handleDrop = files => {
    readAsDataURL(files[0]).then(dataUrl => {
      this.props.dispatch(loadNewImage(dataUrl))
    })
  }

  sketchedState = () => {
    const { width, height } = this.props.image

    return (
      <div style={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid #eee', boxShadow: '0px 2px 11px -5px' }} >
        <div className="comparison-slider" style={{ width, height }}>
          <figure className="comparison-before">
            <ColorImage src={ this.props.image.url } />
          </figure>

          { this.props.image.sketched && (
            <figure className="comparison-after">
              <ColorImage src={ this.props.image.originalUrl } />
              <textarea className="comparison-resizer" readOnly></textarea>
            </figure>) }
        </div>
      </div>
    )
  }

  emptyState = () => (
    <Dropzone onDrop={ this.handleDrop } style={{ border: 'solid 1px transparent' }} acceptStyle={{ border: 'solid 1px #32b643' }} multiple={ false }>
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
    </Dropzone>
  )

  render() {
    return (
      <div className="column col-6">
        { this.props.image.url ? this.sketchedState() : this.emptyState() }
        <PresetImages />
      </div>
    )
  }
}

export default connect(({ image }) => ({ image }))(UploadPrompt)