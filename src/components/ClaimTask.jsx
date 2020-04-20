import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Button, Grid, List } from 'semantic-ui-react'
import DisplayMap from './DisplayMap'
import axios from 'axios'

const ClaimTask = props => {
  let claimButton
  let mapDisplay
  let requestDisplay

  const dispatch = useDispatch()

  const getMap = async () => {
    let response = await axios.get('/tasks', { status: 'confirmed' })
    dispatch({ type: 'SAVE_REQUESTS', payload: response.data })
    if (!props.showHelpMap) {
      dispatch({ type: 'SHOW_MAP' })
    }
  }

  const claimTask = async event => {
    let headers = JSON.parse(localStorage.getItem('J-tockAuth-Storage'))
    let id = event.target.parentElement.dataset.id
    try {
      let response = await axios.put(
        `/tasks/${id}`,
        { activity: 'claimed' },
        { headers: headers }
      )
      if (response.status === 200)
        dispatch({
          type: 'FLASH_MESSAGE',
          payload: { premiumUser: true }
        })
    } catch (error) {
      debugger
      dispatch({
        type: 'ERROR_MESSAGE',
        payload: { errorMessage: error.message }
      })
    }
  }

  if (props.showHelpMap) {
    mapDisplay = <DisplayMap />
  }

  if (props.userID) {
    claimButton = (
      <Grid>
        <Grid.Column align='center'>
          <Button id='create-request' onClick={getMap.bind(this)}>
            Offer Help
          </Button>
        </Grid.Column>
      </Grid>
    )
  }

  //Showing Request list on Help page
  if (props.showHelpMap) {
    requestDisplay = props.requests.map(task => {
      let showProducts
      let i = 0

      //Iterate over the internal products list and show each product
      showProducts = task.products.map(product => {
        i++
        return (
          <List.Content
            className='taskProduct'
            id={`task-product-${i}`}
            key={product.id}
            data-id={product.id}
          >
            {product.amount} -{product.name} -{product.total}
          </List.Content>
        )
      })
      return (
        <>
          <List.Item
            selection
            verticalAlign='middle'
            id={`task-${task.id}`}
            key={task.id}
            data-id={task.id}
            data-name={task.user.email}
            data-price={task.total}
          >
            <List.Content className='taskOwner' id={`task-${task.id}-user`}>
              {task.user.email}
            </List.Content>
            {showProducts}
            <List.Content className='taskTotal' id={`task-${task.id}-total`}>
              {task.total}
            </List.Content>
            <Button onClick={claimTask.bind(this)}>Claim task</Button>
          </List.Item>
        </>
      )
    })
  }

  return (
    <>
      {claimButton}
      <Grid.Column width={10}>{mapDisplay}</Grid.Column>
      <Grid>
        <Grid.Column floated='right' width={6} id='request-list'>
          <List animated divided verticalAlign='middle' className='productList'>
            {requestDisplay}
          </List>
        </Grid.Column>
      </Grid>
    </>
  )
}

const mapStateToProps = state => {
  return {
    showHelpMap: state.showHelpMap,
    userID: state.userID,
    requests: state.requests
  }
}
export default connect(mapStateToProps)(ClaimTask)
