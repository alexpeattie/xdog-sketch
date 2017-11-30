import React from 'react'
import { connect } from 'react-redux'
import PresetImages from './PresetImages'
import UploadZone from './UploadZone'
import SketchedImage from './SketchedImage'
import UploadPrompt from './UploadPrompt'
import ImageButtons from './ImageButtons'

const ImagePane = props => {
  const { width, height, url, originalUrl, sketched } = props.image
  const imageChosen = (url && url.length)

  return (
    <div className="column col-6">
      <UploadZone>
        { imageChosen ? <SketchedImage { ...{ width, height, url, originalUrl, sketched } } /> : <UploadPrompt /> }
      </UploadZone>

      { imageChosen ? <ImageButtons /> : <PresetImages /> }
    </div>
  )
}

export default connect(({ image }) => ({ image }))(ImagePane)