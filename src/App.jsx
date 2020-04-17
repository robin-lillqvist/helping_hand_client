import React from 'react'
import Header from './components/Header'
import CreateRequest from './components/CreateRequest'
import { connect } from 'react-redux'
import UserLogin from './components/UserLogin'
import RegisterUser from './components/RegisterUser'
import { Grid } from 'semantic-ui-react'
 
const App = props => {
  return (
    <>
      <Header />
      <CreateRequest />
      {props.showLogin && <UserLogin/>}
      {props.showRegister && <RegisterUser/>}
      <Grid.Column align ='center' id='success-message'>{props.message}</Grid.Column>
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
