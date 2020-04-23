import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Button, Grid, List } from 'semantic-ui-react'
import DisplayMap from './DisplayMap'
import { getConfirmedTasks, claimTask } from '../state/actions/taskActions'

const ClaimTask = props => {
  let claimButton
  let mapDisplay
  let requestDisplay

  const dispatch = useDispatch()

  useEffect(() => {
    getConfirmedTasks(dispatch)
  }, [dispatch])

  if (props.showHelpMap) {
    mapDisplay = <DisplayMap />
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
            key={`task-product-${i}`}
            data-id={product.id}
          >
            {product.amount} {product.name} {product.total}
          </List.Content>
        )
      })
      return (
        <React.Fragment key={`task-${task.id}`}>
          <List.Item
            id={`task-${task.id}`}
            key={`task-${task.id}`}
            data-id={task.id}
            data-name={task.user.email}
            data-price={task.total}
          >
            <List.Content
              className='taskOwner'
              key={`task-${task.id}-user`}
              id={`task-${task.id}-user`}
            >
              {task.user.email}
            </List.Content>
            {showProducts}
            <List.Content
              className='taskTotal'
              key={`task-${task.id}-total`}
              id={`task-${task.id}-total`}
            >
              {task.total}
            </List.Content>
            <Button
              id={`task${task.id}-button`}
              key={`task-${task.id}-button`}
              onClick={e => claimTask(e, dispatch)}
            >
              Claim Task
            </Button>
          </List.Item>
        </React.Fragment>
      )
    })
  }
  return (
    <>
      {claimButton}
      <Grid>
        <Grid.Column width={10}>{mapDisplay}</Grid.Column>
        <Grid.Column floated='right' width={6} id='request-list'>
          <List animated divided className='productList'>
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
    requests: state.requests,
    message: state.message
  }
}
export default connect(mapStateToProps)(ClaimTask)
