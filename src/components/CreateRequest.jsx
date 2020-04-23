import React, { useEffect } from 'react'
import axios from 'axios'
import { connect, useDispatch } from 'react-redux'
import { Button, List, Container, Grid, Input } from 'semantic-ui-react'
import Geocode from 'react-geocode'
import {
  getProducts,
  getCoordsFromAddress,
  submitTask
} from '../state/actions/taskActions'

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY)

const CreateRequest = props => {
  let productDisplay
  let requestProductDisplay
  let createButton
  let confirmButton
  let displayAddressInput

  const dispatch = useDispatch()

  useEffect((props) => {
    getProducts(props, dispatch)
  }, [dispatch])

  const onChangeHandler = event => {
    dispatch({ type: 'SET_ADDRESS', payload: event.target.value })
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
      dispatch({ type: 'GREETING', payload: response.data.message })
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
      dispatch({ type: 'GREETING', payload: response.data.message })
    }
    dispatch({ type: 'UPDATE_REQUEST', payload: response.data.task })
  }

  if (props.showRequestForm) {
    displayAddressInput = (
      <>
        <Grid.Column key='addressInputGrid' align='center'>
          <div>
            <Input
              id='addressInput'
              onBlur={onChangeHandler.bind(this)}
              placeholder='write something here'
            ></Input>
          </div>
          <div>
            <Button
              id='addressConfirm'
              onClick={() => getCoordsFromAddress(props, dispatch)}
            >
              confirm address
            </Button>
          </div>
        </Grid.Column>
      </>
    )
    if (props.position.lat) {
      productDisplay = props.products.map(product => {
        return (
          <Grid.Column key={product.id} align='center'>
            <List
              id={`product-${product.id}`}
              key={`product-${product.id}`}
              data-cy={`product-${product.id}`}
              data-id={product.id}
              data-name={product.name}
              data-price={product.price}
            >
              {product.name} {product.price}
              <Button
                id={product.id}
                key={product.id}
                onClick={addToRequest.bind(this)}
              >
                Add
              </Button>
            </List>
          </Grid.Column>
        )
      })
    }
  }

  if (props.task.id) {
    requestProductDisplay = props.task.products.map(product => {
      return (
        <>
          <Grid.Column align='center'>
            <Container key={product.name} id={product.name}>
              <span>{product.amount}</span> x <span>{product.name}</span>
            </Container>
          </Grid.Column>
        </>
      )
    })
    confirmButton = (
      <>
        <Grid.Column align='center'>
          <div id='orderTotal'>{props.task.total}</div>
          <Button
            id='confirm-task'
            onClick={() => submitTask(this, props, dispatch)}
          >
            Place Order
          </Button>
        </Grid.Column>
      </>
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
export default connect(mapStateToProps)(CreateRequest)
