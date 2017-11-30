import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { readAsDataURL } from 'promise-file-reader'
import { loadNewImage } from '../actions/imageActions'

const theme = {
  style: {
    transition: 'box-shadow 0.3s ease'
  },
  acceptStyle: {
    boxShadow: '0 0 8px -1px #32b643'
  }
}

let dropzoneRef

class UploadZone extends Component {
  handleDrop = files => {
    const [image, ...rest] = files // eslint-disable-line no-unused-vars

    readAsDataURL(image).then(dataUrl => {
      this.props.dispatch(loadNewImage(dataUrl, image.name))
    })
  }

  browse = () => {
    dropzoneRef && dropzoneRef.open()
  }

  render() {

    return (
      <Dropzone ref={(node) => { dropzoneRef = node }} onDrop={ this.handleDrop } multiple={ false } disableClick={ true } { ...theme }>
        { React.cloneElement(this.props.children, { browse: this.browse }) }
      </Dropzone>
    )
  }
}

export default connect()(UploadZone)