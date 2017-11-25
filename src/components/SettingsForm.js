import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, formValueSelector } from 'redux-form'
import Slider from './Slider'
import Checkbox from './Checkbox'
import cx from 'classnames'

let SettingsForm = props => {
  const { handleSubmit, XDoGEnabled, rerendering } = props
  const btnClasses = cx('btn', 'btn-block', { loading: rerendering })

  return (
    <form className="form-horizontal" onSubmit={ handleSubmit }>
      <Slider name='sigmaOne' label='Sigma 1' min={ 0.01 } max={ 10 } step= { 0.01 } />
      <Slider name='sigmaTwo' label='Sigma 2' min={ 0.01 } max={ 10 } step= { 0.01 } />

      <Checkbox name='gpuAccelerated' label='GPU Acceleration' />
      <Checkbox name='XDoG' label='eXtended Difference of Gaussians' />

      <Slider name='scale' label='Scale (p)' min={ 1 } max={ 100 } step= { 0.1 } disabled={ !XDoGEnabled } />
      <Slider name='phi' label='Phi' min={ 0.005 } max={ 0.1 } step= { 0.005 } disabled={ !XDoGEnabled } />
      <Slider name='epsilon' label='Epsilon' min={ 1 } max={ 200 } step= { 0.1 } disabled={ !XDoGEnabled } />
      <button className={ btnClasses } type='submit'>Sketch It!</button>
    </form>
  )
}

const initialValues = {
  sigmaOne: 1,
  sigmaTwo: 1.5,
  gpuAccelerated: true,
  XDoG: true,
  scale: 33.5,
  phi: 0.02,
  epsilon: 80
}

SettingsForm = reduxForm({
  form: 'imageSettings',
  initialValues
})(SettingsForm)

const selector = formValueSelector('imageSettings')
SettingsForm = connect(state => {
  return {
    XDoGEnabled: selector(state, 'XDoG'),
    rerendering: state.image.rerendering
  }
})(SettingsForm)

export default SettingsForm