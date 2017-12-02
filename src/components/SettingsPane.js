import React, { Component } from 'react'
import { connect } from 'react-redux'
import SettingsForm from './SettingsForm'
import SketchItButton from './SketchItButton'
import { sketchify } from '../actions/imageActions'
import cx from 'classnames'
import styled from 'styled-components'
import { formValueSelector } from 'redux-form'

const SigmaWarning = styled.p`
  color: #e85600;
  font-size: .7rem;
  margin-top: .2rem;
`

class SettingsPane extends Component {
  submitSettings = settings => {
    for(let key in settings) {
      if(!['gpuAccelerated', 'XDoG'].includes(key)) {
        settings[key] = parseFloat(settings[key])
      }
    }

    this.props.dispatch(sketchify(settings))
  }

  render() {
    const disabled = !this.props.image.url

    return (
      <div className={ cx('panel column col-6 col-ml-auto', { disabled }) }>
        <div className="panel-header">
          <div className="panel-title">
            <strong>Image Settings</strong>
          </div>
        </div>
        <div className="panel-body">
          <SettingsForm onSubmit={ this.submitSettings } />
          { this.props.sigmaRatio < 1 && (
            <SigmaWarning>Warning: setting σ<sub>1</sub> > σ<sub>2</sub> can yield odd-looking results.</SigmaWarning>
          ) }
        </div>
        <div className="panel-footer">
          <SketchItButton />
        </div>
      </div>
    )
  }
}

const selector = formValueSelector('imageSettings')
export default connect(state => {
  return {
    sigmaRatio: selector(state, 'sigmaTwo') / selector(state, 'sigmaOne'),
    image: state.image
  }
})(SettingsPane)