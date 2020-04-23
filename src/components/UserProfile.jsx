import React from 'react'
import image from '../images/user-blank.jpg'
import { Image, Container, Grid, List, Card } from 'semantic-ui-react'
import axios from 'axios'

 

const ProfilePage = props => {

  const viewProfileData = async => {
  let headers = JSON.parse(localStorage.getItem('J-tockAuth-Storage'))
  let id = id
  let response
  let product
  let displayProfileData
  
  if (props.user.id) {
    response = axios.get(
      '/profiles',
      { headers: headers }
    )
    displayProfileData = (
      <Container style={{marginTop: "15px"}}>
        <Grid columns={2} divided>
          <Grid.Column align='center'>
            <Image src={image} size='small' />
          </Grid.Column>
          <Grid.Column align ='center'>
            <Container>
              NAME:
            </Container>
            <Container style={{marginTop: "2px"}}>
              <List>
                ACTIVE REQUESTS
                <List.Content>
                  <Card>{product.name} {product.price}</Card>
                </List.Content>
              </List>
            </Container>
            <Container style={{marginTop: "2px"}}>
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
    )}
 
  return (
    <>
    <div>{displayProfileData}</div>
    </>
  ) }
}
export default ProfilePage

