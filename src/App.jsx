import React from 'react'
import Header from './components/Header'
import CreateRequest from './components/CreateRequest'
import { connect } from 'react-redux'

const App = props => {
  return (
    <>
      <Header />
      <CreateRequest />
    </>
  )
}


const mapStateToProps = state => {
  return {
    products: state.products,
    showRequestForm: state.showRequestForm
  }
}
export default connect(mapStateToProps)(App)
