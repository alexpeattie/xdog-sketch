import getPixels from 'get-pixels'
import { DoGFilter, XDoGFilter, convertToGrayscale } from '../xdog'

export const UPDATE_IMAGE_URL = 'UPDATE_IMAGE_URL'
export const UPDATE_SOURCE_PIXELS = 'UPDATE_SOURCE_PIXELS'
export const LOAD_NEW_IMAGE_PENDING = 'LOAD_NEW_IMAGE_PENDING'
export const CLEAR_IMAGE = 'CLEAR_IMAGE'
export const RERENDERING = 'RERENDERING'

function updateImageUrl(payload, newImage) {
  if(newImage) payload.originalUrl = payload.url

  return {
    type: UPDATE_IMAGE_URL,
    payload
  }
}

function updateSourcePixels(payload) {
  return {
    type: UPDATE_SOURCE_PIXELS,
    payload
  }
}

function rerendering() {
  return {
    type: RERENDERING
  }
}

export function clearImage() {
  return {
    type: CLEAR_IMAGE
  }
}

function loadNewImagePending() {
  return {
    type: LOAD_NEW_IMAGE_PENDING
  }
}

export function loadNewImage(url, filename = '') {
  return dispatch => {
    dispatch(loadNewImagePending())
    getPixels(url, (err, colorPixels) => {
      const [originalWidth, originalHeight, ...rest] = colorPixels.shape // eslint-disable-line no-unused-vars
      let [width, height] = [originalWidth, originalHeight]
      const scaleFactor = Math.min(470 / width, 600 / height)

      if(scaleFactor < 1) {
        width = originalWidth * scaleFactor
        height = originalHeight * scaleFactor
      }

      dispatch(updateImageUrl({ url, width, height, originalWidth, originalHeight, filename }, true))

      convertToGrayscale(colorPixels).then(pixels => {
        dispatch(updateSourcePixels({ pixels }))
      })
    })
  }
}

export function sketchify(options) {
  return (dispatch, getState) => {
    dispatch(rerendering())
    const { pixels, originalWidth, originalHeight } = getState().image
    const filterFn = options.XDoG ? XDoGFilter : DoGFilter

    filterFn(pixels, options, [originalWidth, originalHeight]).then(url => {
      dispatch(updateImageUrl({ url, sketched: true, options }))
    })
  }
}
