import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import cx from 'classnames'

const SketchItButton = props => {
  const sketchIt = () => {
    props.dispatch(submit('imageSettings'))
  }

  const buttonStyle = cx('btn', 'btn-block', { loading: props.image.rerendering })

  return (
    <button className={ buttonStyle } onClick={ sketchIt }>
      Sketch It!
    </button>
  )
}

export default connect(({ image }) => ({ image }))(SketchItButton)