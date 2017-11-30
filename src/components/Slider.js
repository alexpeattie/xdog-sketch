import React from 'react'
import { Field } from 'redux-form'
import numeral from 'numeral'
import cx from 'classnames'

const renderSlider = props => {
  const { min, max, step, disabled, name } = props
  const format = name === 'phi' ? '0.000' : '0.00'

  return field => (<input {...field.input} className='slider tooltip' type='range' min={ min } max={ max } step={ step } data-formatted-value={ numeral(field.input.value).format(format) } disabled={ disabled } />)
}

const Slider = props => {
  const { min, max, step, name, label, disabled } = props
  const labelClass = cx('form-label', { disabled })

  return (
    <div className={ cx('form-group', props.className) }>
      <div className="col-3">
        <label className={ labelClass } htmlFor={ name }>
          { label }
        </label>
      </div>
      <div className="col-9">
        <Field name={ name } component={ renderSlider({ min, max, step, disabled, name }) } />
      </div>
    </div>
  )
}
export default Slider