import axios from 'axios'
import {
  FETCH_CRYPTOS_REQUEST,
  FETCH_CRYPTOS_SUCCESS,
  FETCH_CRYPTOS_FAILURE
} from './cryptoTypes'

export const fetchCryptos = () => {
  return (dispatch, getState) => {
    dispatch(fetchCryptosRequest())
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=' + getState().crypto.page + '&sparkline=true')
      .then(response => {
        // response.data is the users
        const cryptos = response.data
        dispatch(fetchCryptosSuccess(cryptos))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchCryptosFailure(error.message))
      })
  }
}

export const fetchCryptosRequest = () => {
  return {
    type: FETCH_CRYPTOS_REQUEST
  }
}

export const fetchCryptosSuccess = cryptos => {
  return {
    type: FETCH_CRYPTOS_SUCCESS,
    payload: cryptos
  }
}

export const fetchCryptosFailure = error => {
  return {
    type: FETCH_CRYPTOS_FAILURE,
    payload: error
  }
}


