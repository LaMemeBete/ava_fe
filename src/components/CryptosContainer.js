import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchCryptos } from '../redux'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from 'react-bootstrap/Spinner'

import CryptoCard from './CryptoCard';

function CryptosContainer({ cryptoData, fetchCryptos }) {

  useEffect(() => {
    fetchCryptos()
  }, [])
  return (
    <div style={{ backgroundColor: '#080d12' }}>
      <InfiniteScroll
        dataLength={cryptoData.cryptos.length}
        next={fetchCryptos}
        hasMore={true}
        loader={<Spinner animation="grow" />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {cryptoData &&
          cryptoData.cryptos &&
          cryptoData.cryptos.map((crypto, index) => <CryptoCard key={index} crypto={crypto}></CryptoCard>)}
      </InfiniteScroll>
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
