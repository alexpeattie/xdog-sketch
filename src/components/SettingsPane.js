import React, { Component } from 'react'
import { connect } from 'react-redux'
import SettingsForm from './SettingsForm'
import SketchItButton from './SketchItButton'
import { sketchify } from '../actions/imageActions'
import cx from 'classnames'

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
        </div>
        <div className="panel-footer">
          <SketchItButton />
        </div>
      </div>
    )
  }
}

export default connect(({ image }) => ({ image }))(SettingsPane)