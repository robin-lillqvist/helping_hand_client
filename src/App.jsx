import React from 'react'
import Header from './components/Header'
import CreateRequest from './components/CreateRequest'
import { connect } from 'react-redux'
import UserLogin from './components/UserLogin'
import RegisterUser from './components/RegisterUser'
import ClaimTask from './components/ClaimTask'
import { Grid } from 'semantic-ui-react'
import HeroImage from './components/HeroImage'
import Footer from './components/Footer'

const App = props => {
  return (
    <>
      <Header />
      <HeroImage />
      <CreateRequest />
      <ClaimTask />
      {props.showLogin && <UserLogin/>}
      {props.showRegister && <RegisterUser/>}
      <Grid.Column align='center' id='success-message'>{props.message}</Grid.Column>
      <Footer />
    </>
  )
}

const mapStateToProps = state => {
  return {
    products: state.products,
    showRequestForm: state.showRequestForm,
    showLogin: state.showLogin,
    showRegister: state.showRegister,
    message: state.message,
    showHelpMap: state.showHelpMap
  }
}
export default connect(mapStateToProps)(App)
