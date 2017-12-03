import React from 'react'
import cx from 'classnames'

const UploadPrompt = props => {
  const { loading } = props

  return (
    <div className="empty">
      <div className="empty-icon">
        <i className="icon icon-3x icon-photo"></i>
      </div>
      <p className="empty-title h5">Upload a picture</p>
      <p className="empty-subtitle">Drag and drop or select a file.</p>
      <div className="empty-action">
        <button className={ cx('btn btn-primary', { loading }) } onClick={ props.browse }>Browse...</button>
      </div>
    </div>
  )
}

export default UploadPrompt