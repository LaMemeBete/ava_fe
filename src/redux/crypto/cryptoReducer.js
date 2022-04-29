import {
  FETCH_CRYPTOS_REQUEST,
  FETCH_CRYPTOS_SUCCESS,
  FETCH_CRYPTOS_FAILURE,
} from './cryptoTypes'

const initialState = {
  loading: false,
  cryptos: [],
  page: 1,
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CRYPTOS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_CRYPTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        cryptos: state.cryptos.concat(action.payload),
        page: state.page + 1,
        error: ''
      }
    case FETCH_CRYPTOS_FAILURE:
      return {
        loading: false,
        cryptos: [],
        error: action.payload
      }
    default: return state
  }
}

export default reducer
