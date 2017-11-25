import { UPDATE_IMAGE_URL, UPDATE_SOURCE_PIXELS } from '../actions/imageActions'

export default function reducer(state={
    pixels: null,
    url: null
  }, action) {

  switch (action.type) {
    case UPDATE_IMAGE_URL: {
      return { ...state, ...action.payload }
    }
    case UPDATE_SOURCE_PIXELS: {
      const { pixels } = action.payload
      return { ...state, pixels }
    }
    default: {
      return state
    }
  }
}