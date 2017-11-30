import React from 'react'
import styled from 'styled-components'

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #eee;
  box-shadow: 0px 2px 11px -5px;
`

const Image = styled.img`
  max-width: 100%;
`

const SketchedImage = props => {
  const { width, height, url, originalUrl, sketched } = props

  return (
    <ImageContainer>
      <div className="comparison-slider" style={{ width, height }}>
        <figure className="comparison-before">
          <Image src={ url } />
        </figure>

        { sketched && (
          <figure className="comparison-after">
            <Image src={ originalUrl } />
            <textarea className="comparison-resizer" readOnly></textarea>
          </figure>) }
      </div>
    </ImageContainer>
  )
}

export default SketchedImage