import { combineReducers, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import foodReducer from './reducers/foodReducer'
import notificationsReducer from './reducers/notificationsReducer'
import envReducer from './reducers/envReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  food: foodReducer,
  notifications: notificationsReducer,
  env: envReducer,
  user: userReducer
})

export default createStore(reducer, applyMiddleware(logger))

