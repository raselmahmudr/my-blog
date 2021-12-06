import {createStore, combineReducers, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"

import postReducer from "./reducers/postReducer"
import appReducer from "./reducers/appReducer"
import authReducer from "./reducers/authReducer"


const reducers = combineReducers({
  postState: postReducer,
  appState: appReducer,
  authState: authReducer
})

export default createStore(reducers, {}, applyMiddleware(thunk))
