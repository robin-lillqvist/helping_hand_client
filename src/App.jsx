import React from 'react'
import './App.css'
import Header from './components/Header'
import CreateRequest from './components/CreateRequest'
import { connect } from 'react-redux'
import UserLogin from './components/UserLogin'
import RegisterUser from './components/RegisterUser'
import ClaimTask from './components/ClaimTask'
import HeroImage from './components/HeroImage'
// import Footer from './components/Footer'
import { Grid } from 'semantic-ui-react'
import DisplaySelector from './DisplaySelector'

const App = props => {
  return (
    <>
      <Header />
      <DisplaySelector />
      <Grid.Column align='center' id='success-message'>
        {props.message}
      </Grid.Column>
      {props.showHero && <HeroImage />}
      {props.showRequestForm && <CreateRequest />}
      {props.showHelpMap && <ClaimTask />}
      {props.showLogin && <UserLogin />}
      {props.showRegister && <RegisterUser />}
      {/* <Footer /> */}
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
    showHelpMap: state.showHelpMap,
    showHero: state.showHero
  }
}
export default connect(mapStateToProps)(App)
