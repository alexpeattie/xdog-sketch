import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import image from "./reducers/imageReducer"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  form: formReducer,
  image
})

const middleware = composeWithDevTools(applyMiddleware(thunk))

const store = createStore(
  rootReducer,
  middleware
)
export default store