import React from 'react'
import ReactDOM from 'react-dom'
import { Field } from 'redux-form'

const Checkbox = props => {
  const { name, label } = props

  return (
    <div className='form-group'>
      <label className='form-switch'>
        <Field name={ name } component='input' type='checkbox'/>
        <i className='form-icon'></i> { label }
      </label>
    </div>
  )
}
export default Checkbox