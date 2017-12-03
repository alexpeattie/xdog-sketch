import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import Slider from './Slider'
import Checkbox from './Checkbox'

let SettingsForm = props => {
  const { handleSubmit, XDoGEnabled } = props

  return (
    <form className="form-horizontal" onSubmit={ handleSubmit }>
      <Slider name='sigmaOne' label='Sigma 1' min={ 0.01 } max={ 10 } step= { 0.01 } />
      <Slider name='sigmaTwo' label='Sigma 2' min={ 0.01 } max={ 10 } step= { 0.01 } className='is-error' />
      <Slider name='threshold' label='Threshold' min={ 0.005 } max={ 0.75 } step= { 0.001 } format='0.0%' disabled={ XDoGEnabled } />

      <Checkbox name='gpuAccelerated' label='GPU Acceleration' />
      <Checkbox name='XDoG' label='eXtended Difference of Gaussians' />

      <Slider name='sharpen' label='Sharpen (p)' min={ 1 } max={ 100 } step= { 0.1 } disabled={ !XDoGEnabled } />
      <Slider name='phi' label='Phi' min={ 0.005 } max={ 2 } step= { 0.001 } format='0.000' disabled={ !XDoGEnabled } />
      <Slider name='epsilon' label='Epsilon' min={ 1 } max={ 200 } step= { 0.1 } disabled={ !XDoGEnabled } />
    </form>
  )
}

const initialValues = {
  sigmaOne: 1,
  sigmaTwo: 1.8,
  threshold: 0.4,
  gpuAccelerated: true,
  XDoG: true,
  sharpen: 35,
  phi: 0.1,
  epsilon: 20
}

SettingsForm = reduxForm({
  form: 'imageSettings',
  initialValues
})(SettingsForm)

const selector = formValueSelector('imageSettings')
SettingsForm = connect(state => {
  return {
    XDoGEnabled: selector(state, 'XDoG'),
  }
})(SettingsForm)

export default SettingsForm