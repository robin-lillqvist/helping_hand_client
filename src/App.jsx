import React from 'react'
import Header from './components/Header'
import CreateRequest from './components/CreateRequest'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from './state/actions/productActions'


const App = props => {
  return (
    <>
      <Header />
      <CreateRequest props={props} />
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
