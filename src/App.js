import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import store from './redux/store'
import CryptosContainer from './components/CryptosContainer'

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <CryptosContainer />
      </div>
    </Provider>
  )
}

export default App
