import React from 'react'
import { connect } from 'react-redux'
import { clearImage } from '../actions/imageActions'
import basename from 'basename'
import styled from 'styled-components'

const ActionsStrip = styled.div`
  margin-top: 1rem;
  text-align: left;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-start;
  padding: 0 0.4rem;
`

const Parameters = styled.p`
  margin-bottom: 0.4rem;
  font-size: 14px;
`

const DownloadButton = styled.a`
  margin-left: 0.4rem;
  i {
    margin-right: 0.4rem;
  }
`

const ImageButtons = props => {
  const { options, filename } = props.image
  return (
    <ActionsStrip>
      { options ? <Parameters>
        { options.XDoG ? 'XDoG' : 'DoG' },
        σ<sub>1</sub> = { options.sigmaOne },
        σ<sub>2</sub> = { options.sigmaTwo }<br />
        { options.XDoG && 
          <span>p = { options.scale }, φ = { options.phi }, ε = { options.epsilon }</span>
        }
      </Parameters> : <Parameters>{ filename }</Parameters> }
      <div>
        <button className="btn" onClick={ () => props.dispatch(clearImage()) }>
          Clear
        </button>
        { props.image.sketched && 
          <DownloadButton href={ props.image.url } download={ `${ basename(filename) }-sketch.png` } className="btn btn-primary">
            <i className="icon icon-download"></i>
            Download
          </DownloadButton>
        }
      </div>
    </ActionsStrip>
  )
}

export default connect(({ image }) => ({ image }))(ImageButtons)