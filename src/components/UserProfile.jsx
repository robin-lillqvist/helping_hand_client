import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import image from '../images/user-blank.jpg'
import { Image, Container, Grid, List, Card, Button } from 'semantic-ui-react'
import { getProfile } from '../state/actions/profileActions'

const ProfilePage = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    getProfile(dispatch)
  }, [dispatch])

  let viewProfileClaimedTasks
  let viewProfileCreatedTasks
  if (
    props.claimed_tasks.length > 0 &&
    typeof props.claimed_tasks !== 'string' &&
    props.authenticated
  ) {
    viewProfileClaimedTasks = props.claimed_tasks.map(claimedTask => {
      return (
        <>
          <Card>
            {claimedTask.name}
            {claimedTask.id}
            {claimedTask.name}
          </Card>
        </>
      )
    })
  }

  if (
    props.claimed_tasks.length > 0 &&
    typeof props.claimed_tasks !== 'string' &&
    props.authenticated
  ) {
    viewProfileCreatedTasks = props.created_tasks.map(createdTask => {
      
      return (
        <>
          <Card>
            <Card.Content>
              <Card.Header>{createdTask.address}</Card.Header>
              <Card.Meta>{createdTask.status}</Card.Meta>
              <Card.Description>
                Steve wants to add you to the group{' '}
                <strong>best friends</strong>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button basic color='red'>
                  Decline
                </Button>
            </Card.Content>
            {createdTask.name}
            {createdTask.id}
            {createdTask.name}
          </Card>
        </>
      )
    })
  }

  return (
    <div id='user-profile'>
      <div>
        <Container style={{ marginTop: '15px' }}>
          <Grid columns={2} divided>
            <Grid.Column align='center'>
              <Image src={image} size='small' />
            </Grid.Column>
            <Grid.Column align='center'>
              <Container>Name: John Doe</Container>
              <Container>Address: John Doe Street 2</Container>
              <Container>Phone: 732327892</Container>
              <Container style={{ marginTop: '2px' }}>
                <List>
                  Active Requests
                  <List.Content>
                    <Card>{viewProfileCreatedTasks}</Card>
                  </List.Content>
                </List>
              </Container>
              <Container style={{ marginTop: '2px' }}>
                <List>
                  Actice Tasks
                  <List.Content>{viewProfileClaimedTasks}</List.Content>
                </List>
              </Container>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
      <div>
        <Container style={{ marginTop: '15px' }}></Container>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    showProfile: state.showProfile,
    authenticated: state.authenticated,
    claimed_tasks: state.claimed_tasks,
    created_tasks: state.created_tasks
  }
}
export default connect(mapStateToProps)(ProfilePage)
