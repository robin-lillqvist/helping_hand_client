import React from 'react'
import axios from 'axios'
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../state/actions/productActions'
import { Button, List, Container, Grid } from 'semantic-ui-react'
import Geocode from 'react-geocode'

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY)

const CreateRequest = props => {
  let productDisplay
  let requestProductDisplay
  let createButton
  let confirmButton
  let displayAddressInput

  const dispatch = useDispatch()

  const getProducts = async () => {
    if (props.products.length === 0) {
      let response = await axios.get('/products')
      dispatch({ type: 'GET_PRODUCT_LIST', payload: response.data })
    }
    dispatch({ type: 'SHOW_REQUEST_FORM', showRequestForm: true })
  }

  const onChangeHandler = event => {
    dispatch({ type: 'SET_ADDRESS', payload: event.target.value })
  }

  const getCoordsFromAddress = async () => {
    Geocode.fromAddress(props.requesterAddress).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location
        dispatch({ type: 'SET_COORDS', position: { lat, lng } })
        dispatch({ type: 'GREETING', payload: 'Your address is confirmed' })
      },
      error => {
        dispatch({
          type: 'SET_COORDS',
          position: { lat: undefined, lng: undefined }
        })
        dispatch({
          type: 'GREETING',
          payload: 'Your address could not be confirmed'
        })
      }
    )
  }

  const addToRequest = async event => {
    let headers = JSON.parse(localStorage.getItem('J-tockAuth-Storage'))
    let id = event.target.parentElement.dataset.id
    let response
    if (props.task.id) {
      response = await axios.put(
        `/tasks/${props.task.id}`,
        {
          product_id: id,
          user_id: props.userID
        },
        { headers: headers }
      )
    } else {
      response = await axios.post(
        '/tasks',
        {
          product_id: id,
          user_id: props.userID,
          lat: props.position.lat,
          long: props.position.lng
        },
        { headers: headers }
      )
    }
    dispatch({ type: 'UPDATE_REQUEST', payload: response.data.task })
  }

  const submitTask = async event => {
    let headers = JSON.parse(localStorage.getItem('J-tockAuth-Storage'))
    let response
    if (props.task.id) {
      response = await axios.put(
        `/tasks/${props.task.id}`,
        {
          activity: 'confirmed',
          user_id: props.userID
        },
        { headers: headers }
      )
    }
    dispatch({
      type: 'SHOW_ORDER_SUCCESS_MESSAGE',
      showSuccessMessage: true,
      message: response.data.message
    })
    dispatch({
      type: 'RESET_PAGE',
      showRequestForm: false,
      task: { products: [] }
    })
  }

  if (props.userID) {
    createButton = (
      <Grid.Column align='center'>
        <Button id='create-request' onClick={getProducts.bind(this)}>
          Create your request
        </Button>
      </Grid.Column>
    )
  }

  if (props.showRequestForm) {
    displayAddressInput = (
      <>
        <input
          id='addressInput'
          onChange={onChangeHandler.bind(this)}
          placeholder='write something here'
        ></input>
        <button id='addressConfirm' onClick={getCoordsFromAddress.bind(this)}>
          confirm address
        </button>
      </>
    )

    productDisplay = props.products.map(product => {
      return (
        <Grid.Column key={`${product.id}`} align='center'>
          <List
            id={`product-${product.id}`}
            key={product.id}
            data-id={product.id}
            data-name={product.name}
            data-price={product.price}
          >
            {product.name} {product.price}
            {props.position.lat !== null ? (
              <Button key={product.id} onClick={addToRequest.bind(this)}>
                Add
              </Button>
            ) : (
              <></>
            )}
          </List>
        </Grid.Column>
      )
    })
  }

  if (props.task.id) {
    requestProductDisplay = props.task.products.map(product => {
      return (
        <>
          <Grid.Column align='center'>
            <Container id={product.id}>
              {product.name} {product.amount}
            </Container>
          </Grid.Column>
        </>
      )
    })
    confirmButton = (
      <Grid.Column align='center'>
        <Button id='confirm-task' onClick={submitTask.bind(this)}>
          Place Order
        </Button>
      </Grid.Column>
    )
  }

  return (
    <>
      <div>
        {createButton}
        <Container id='task-address'>{displayAddressInput}</Container>
        <List id='product-list'>{productDisplay}</List>
        <Container id='request-list'>
          {requestProductDisplay} {confirmButton}
        </Container>
      </div>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: bindActionCreators(fetchProducts, dispatch)
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    showRequestForm: state.showRequestForm,
    task: state.task,
    taskProducts: state.taskProducts,
    message: state.message,
    userID: state.userID,
    requesterAddress: state.requesterAddress,
    position: state.position
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest)
