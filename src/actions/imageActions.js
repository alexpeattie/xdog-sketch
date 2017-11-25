import getPixels from 'get-pixels'
import lenna from '../images/lenna.png'
import { DoGFilter, XDoGFilter } from '../xdog'

export const UPDATE_IMAGE_URL = 'UPDATE_IMAGE_URL'
export const UPDATE_SOURCE_PIXELS = 'UPDATE_SOURCE_PIXELS'

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

export function loadNewImage(url) {
  return dispatch => {
    getPixels(url, (err, pixels) => {
      dispatch(updateImageUrl({ url }, true))
      dispatch(updateSourcePixels({ pixels }))
    })
  }
}

export function sketchify(options) {
  return (dispatch, getState) => {
    const { pixels } = getState().image
    const filterFn = options.XDoG ? XDoGFilter : DoGFilter

    filterFn(pixels, options).then(url => {
      dispatch(updateImageUrl({ url }))
    })
  }
}
