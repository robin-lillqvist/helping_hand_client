import React from 'react'
import Header from './components/Header'
import CreateRequest from './components/CreateRequest'
import { connect } from 'react-redux'
import UserLogin from './components/UserLogin'
import RegisterUser from './components/RegisterUser'
import DisplayMap from './components/DisplayMap'

const App = props => {
  return (
    <>
      <Header />
      <CreateRequest />
      {props.showLogin && <UserLogin/>}
      {props.showRegister && <RegisterUser/>}
      <div id='success-message'>{props.message}</div>
      <DisplayMap/>
    </>
  )
}


const mapStateToProps = state => {
  return {
    products: state.products,
    showRequestForm: state.showRequestForm,
    showLogin: state.showLogin,
    showRegister: state.showRegister,
    message: state.message
  }
}
export default connect(mapStateToProps)(App)
