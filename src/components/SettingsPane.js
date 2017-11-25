import React, { Component } from 'react'
import { connect } from 'react-redux'
import SettingsForm from './SettingsForm'
import { sketchify } from '../actions/imageActions'

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
    return (
      <div className="panel column col-6 col-ml-auto">
        <div className="panel-header">
          <div className="panel-title">
            <strong>Image Settings</strong>
          </div>
        </div>
        <div className="panel-body">
          <SettingsForm onSubmit={ this.submitSettings } />
        </div>
        <div className="panel-footer">
          {/*<button className="btn btn-block" disabled>Sketch It!</button>*/}
        </div>
      </div>
    )
  }
}

export default connect()(SettingsPane)