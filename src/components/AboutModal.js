import React, { Component } from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { closeModal } from '../actions/aboutActions'

class AboutModal extends Component {
  componentWillReceiveProps(nextProps) {
    document.body.classList.toggle('modal-open', nextProps.visible)
  }

  componentWillUnmount() {
    document.body.classList.remove('modal-open')
  }

  close = () => {
    this.props.dispatch(closeModal())
  }

  render() {
    return (
      <div className={ cx('modal modal-lg', { active: this.props.visible }) }>
        <a className="modal-overlay" aria-label="Close" onClick={ this.close }>Close</a>
        <div className="modal-container">
          <div className="modal-header">
            <a className="btn btn-clear float-right" aria-label="Close" onClick={ this.close }>Close</a>
            <div className="modal-title h4">About</div>
          </div>
          <div className="modal-body">
            <div className="content">
              <p>This is a recreation of the XDoG image stylization technique as described in the Winnemoller et. al's papers <em>XDoG: Advanced Image Stylization with eXtended Difference-of-Gaussians</em> (DOI: <a href='https://doi.org/10.1145/2024676.2024700'>10.1145/2024676.2024700</a>) and <em>XDoG: An eXtended difference-of-Gaussians compendium including advanced image stylization</em> (DOI: <a href='https://doi.org/10.1016/j.cag.2012.03.004'>10.1016/j.cag.2012.03.004</a>). The app uses Google's <a href='https://deeplearnjs.org'>deeplearn.js</a> library to perform fast, GPU-accelerated image processing in the browser.</p>

              <h5>Parameter guide</h5>

              <p><strong>Sigma 1</strong> and <strong>Sigma 2</strong> control the strength of the two gaussian functions whose difference is used for edge detection. A lower Sigma 1 will create finer details (mimicking a detailed sketch), while a higher Sigma 1 will yield less detail. Where Sigma 2 is much higher than Sigma 1, the lines will be thicker and vica-versa. Sigma 2 should generally always be greater than Sigma 1.</p>

              <p><strong>Threshold</strong> defines the luminance threshold which used to binarize the image (convert to black & white) when you're <em>not</em> using XDoG mode. A lower threshold will mean more pixels become white, yielding a lighter image with thinner lines, and vica-versa. The threshold is quite sensitive, so images can quickly collapse to becoming white/very light or black/very dark.</p>

              <p><strong>Sharpen (p)</strong> controls the strength of the sharpening that's applied when using XDoG mode. Sharpening with a large p exaggerates both the black and white edges present in the result.</p>

              <p><strong>Phi (φ)</strong> controls the steepness of the soft thresholding that's applied when using XDoG mode. A larger phi will lead to a sharper black/white transitions in the image.</p>

              <p><strong>Epsilon (ε)</strong> controls the level above which the adjusted luminance values will become white. A higher epsilon will yield a darker image with greater regions of blackness, and vica-versa. A low epsilon more closely emulates the behaviour of DoG mode.</p>

              <h5>Author</h5>

              <p>&copy; 2017 Alex Peattie / <a href='https://alexpeattie.com/'>alexpeattie.com</a> / <a href='https://twitter.com/alexpeattie'>@alexpeattie</a></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(({ about }) => ({ visible: about.visible }))(AboutModal)