import { combineReducers } from 'redux'
import cryptoReducer from './crypto/cryptoReducer'

const rootReducer = combineReducers({
  crypto: cryptoReducer
})

export default rootReducer
