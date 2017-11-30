import getPixels from 'get-pixels'
import { DoGFilter, XDoGFilter } from '../xdog'

export const UPDATE_IMAGE_URL = 'UPDATE_IMAGE_URL'
export const UPDATE_SOURCE_PIXELS = 'UPDATE_SOURCE_PIXELS'
export const RERENDERING = 'RERENDERING'
export const CLEAR_IMAGE = 'CLEAR_IMAGE'

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

export function loadNewImage(url, filename = '') {
  return dispatch => {
    getPixels(url, (err, pixels) => {
      let [width, height, ...rest] = pixels.shape // eslint-disable-line no-unused-vars
      const scaleFactor = Math.min(470 / width, 600 / height)

      if(scaleFactor < 1) {
        width = width * scaleFactor
        height = height * scaleFactor
      }

      dispatch(updateImageUrl({ url, width, height, filename }, true))
      dispatch(updateSourcePixels({ pixels }))
    })
  }
}

export function sketchify(options) {
  return (dispatch, getState) => {
    dispatch(rerendering())
    const { pixels } = getState().image
    const filterFn = options.XDoG ? XDoGFilter : DoGFilter

    filterFn(pixels, options).then(url => {
      dispatch(updateImageUrl({ url, sketched: true, options }))
    })
  }
}
