import React from 'react'
import axios from 'axios'
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../state/actions/productActions'
import { Button, List, Container, Grid } from 'semantic-ui-react'

const CreateRequest = props => {
  let productDisplay
  let requestDisplay
  let createButton
  let confirmButton

  const dispatch = useDispatch()

  const getProducts = async () => {
    if (props.products.length === 0) {
      let response = await axios.get('/products')
      dispatch({ type: 'GET_PRODUCT_LIST', payload: response.data })
    }
    dispatch({ type: 'SHOW_REQUEST_FORM', showRequestForm: true })
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
          user_id: props.userID
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
      debugger
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
    productDisplay = props.products.map(product => {
      return (
        <Grid.Column align='center'>
          <List
            id={`product-${product.id}`}
            key={product.id}
            data-id={product.id}
            data-name={product.name}
            data-price={product.price}
          >
            {product.name} {product.price}
            <Button key={product.id} onClick={addToRequest.bind(this)}>
              Add
            </Button>
          </List>
        </Grid.Column>
      )
    })
  }

  if (props.task.id) {
    requestDisplay = props.task.products.map(product => {
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
      {createButton}
      <List id='product-list'>{productDisplay}</List>
      <Container id='request-list'>
        {requestDisplay} {confirmButton}
      </Container>
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
    userID: state.userID
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateRequest)