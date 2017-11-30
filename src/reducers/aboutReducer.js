import { OPEN_MODAL, CLOSE_MODAL } from '../actions/aboutActions'

export default function reducer(state = {
  visible: false
}, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      return { visible: true }
    }
    case CLOSE_MODAL: {
      return { visible: false }
    }
    default: {
      return state
    }
  }
}