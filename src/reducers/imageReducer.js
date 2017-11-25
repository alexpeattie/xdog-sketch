import { UPDATE_IMAGE_URL, UPDATE_SOURCE_PIXELS, RERENDERING } from '../actions/imageActions'

export default function reducer(state={
    pixels: null,
    url: null,
    width: null,
    height: null,
    sketched: false,
    rerendering: false
  }, action) {

  switch (action.type) {
    case UPDATE_IMAGE_URL: {
      return { ...state, ...action.payload, rerendering: false }
    }
    case UPDATE_SOURCE_PIXELS: {
      const { pixels } = action.payload
      return { ...state, pixels, rerendering: false, sketched: false }
    }
    case RERENDERING: {
      return { ...state, rerendering: true }
    }
    default: {
      return state
    }
  }
}