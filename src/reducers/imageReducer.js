import { UPDATE_IMAGE_URL, UPDATE_SOURCE_PIXELS, RERENDERING, CLEAR_IMAGE, LOAD_NEW_IMAGE_PENDING } from '../actions/imageActions'

const initial = {
  pixels: null,
  url: null,
  width: null,
  height: null,
  originalWidth: null,
  originalHeight: null,
  sketched: false,
  rerendering: false,
  options: null,
  filename: null,
  loading: false
}

export default function reducer(state = initial, action) {
  switch (action.type) {
    case UPDATE_IMAGE_URL: {
      return { ...state, ...action.payload, rerendering: false }
    }
    case UPDATE_SOURCE_PIXELS: {
      const { pixels } = action.payload
      return { ...state, pixels, rerendering: false, sketched: false, loading: false }
    }
    case CLEAR_IMAGE: {
      return { ...initial }
    }
    case RERENDERING: {
      return { ...state, rerendering: true }
    }
    case LOAD_NEW_IMAGE_PENDING: {
      return { ...state, loading: true }
    }
    default: {
      return state
    }
  }
}