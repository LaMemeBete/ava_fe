import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { fetchCryptos } from '../redux'

import CryptoCard from './CryptoCard';

function CryptosContainer({ cryptoData, fetchCryptos }) {
  useEffect(() => {
    fetchCryptos();
    window.addEventListener("scroll", handleScroll);
  }, [])
  const handleScroll = (e) => {
    console.log(e.target.documentElement.scrollTop);
    console.log(e.target.documentElement.scrollHeight);
    console.log(window.innerHeight)
    if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
      fetchCryptos();
    }
  };
  return (
    <div style={{ backgroundColor: '#080d12' }}>
      {cryptoData &&
      cryptoData.cryptos &&
      cryptoData.cryptos.map((crypto, index) => <CryptoCard key={index} crypto={crypto}></CryptoCard>)}
    </div>
    
  )
}

const mapStateToProps = state => {
  return {
    cryptoData: state.crypto
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCryptos: () => dispatch(fetchCryptos())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CryptosContainer)
