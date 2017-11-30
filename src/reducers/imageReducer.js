import { UPDATE_IMAGE_URL, UPDATE_SOURCE_PIXELS, RERENDERING, CLEAR_IMAGE } from '../actions/imageActions'

const initial = {
  pixels: null,
  url: null,
  width: null,
  height: null,
  sketched: false,
  rerendering: false,
  options: null,
  filename: null
}

export default function reducer(state = initial, action) {
  switch (action.type) {
    case UPDATE_IMAGE_URL: {
      return { ...state, ...action.payload, rerendering: false }
    }
    case UPDATE_SOURCE_PIXELS: {
      const { pixels } = action.payload
      return { ...state, pixels, rerendering: false, sketched: false }
    }
    case CLEAR_IMAGE: {
      return { ...initial }
    }
    case RERENDERING: {
      return { ...state, rerendering: true }
    }
    default: {
      return state
    }
  }
}