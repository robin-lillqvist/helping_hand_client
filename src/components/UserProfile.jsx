import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import image from '../images/user-blank.jpg'
import { Image, Container, Grid, List, Card } from 'semantic-ui-react'
import { getProfile } from '../state/actions/profileActions'

const ProfilePage = props => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    getProfile(dispatch)
  }, [dispatch])

  let viewProfileData
  if((props.claimed_tasks !== null) && props.authenticated){
    viewProfileData = props.claimed_tasks.map(claimedTask => {
      return (
        <>
          <Container style={{ marginTop: '15px' }}>
            <Grid columns={2} divided>
              <Grid.Column align='center'>
                <Image src={image} size='small' />
              </Grid.Column>
              <Grid.Column align='center'>
                <Container>NAME:</Container>
                <Container style={{ marginTop: '2px' }}>
                  <List>
                    ACTIVE REQUESTS
                    <List.Content>
                      <Card>{claimedTask.id}</Card>
                    </List.Content>
                  </List>
                </Container>
                <Container style={{ marginTop: '2px' }}>
                  <List>
                    ACTIVE TASKS
                    <List.Content>
                      <Card>a;lskdfkla</Card>
                    </List.Content>
                  </List>
                </Container>
              </Grid.Column>
            </Grid>
          </Container>
        </>
      )
    })
  }

  return (<div id='user-profile'>{viewProfileData}</div>)
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
