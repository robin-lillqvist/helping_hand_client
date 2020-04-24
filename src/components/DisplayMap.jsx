import React, { useState } from 'react'
import { Marker, Map, GoogleApiWrapper } from 'google-maps-react'
import { Button, List, Card, Grid } from 'semantic-ui-react'
import { connect, useDispatch } from 'react-redux'
import { claimTaskMap } from '../state/actions/taskActions'
import InfoWindowEx from './InfoWindowEx'

const MapContainer = props => {
  const dispatch = useDispatch()
  const style = { width: '100%', height: '80vh' }
  const [activeMarker, setActiveMarker] = useState({})
  const [selectedPlace, setSelectedPlace] = useState({})

  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker)
    setSelectedPlace(props)
  }

  let showRequest
  let taskProducts

  if (selectedPlace.id) {
    showRequest = props.requests.find(
      request => request.id === selectedPlace.id
    )
    taskProducts = showRequest.products.map(product => {
      return (
        <Grid.Row columns={3} 
          className='taskProducts'
          id={`showProduct-${product.name}`}
          key={`showProduct-${product.name}`}
        >
          <Grid.Column>
            {product.amount}
          </Grid.Column>
          <Grid.Column>
            {product.name}
          </Grid.Column>
          <Grid.Column>
            {product.total}
          </Grid.Column>
        </Grid.Row>
      )
    })
  }
  return (
    <>
      <Map
        centerAroundCurrentLocation
        key='google-map'
        google={props.google}
        style={style}
        zoom={15}
      >
        {props.requests.map(request => (
          <Marker
            title={request.user.email}
            name={request.user.email}
            key={request.id}
            id={request.id}
            position={{ lat: request.lat, lng: request.long }}
            onClick={onMarkerClick}
          ></Marker>
        ))}
        <InfoWindowEx visible={true} marker={activeMarker}>
          <div
            style={{ textAlign: 'center' }}
            id={`selectedPlace-${selectedPlace.id}`}
          >
            {selectedPlace.id && (
              <>
                <Card>
                  <Card.Content>
                    <Card.Meta>Deliver to: {showRequest.name}</Card.Meta>
                    <Card.Meta>{showRequest.address}</Card.Meta>
                    <Card.Meta>Status: {showRequest.status}</Card.Meta>
                  </Card.Content>
                  <Card.Content>
                    <Card.Description>
                      <strong>Products: </strong>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content>
                    <Card.Description>
                      <List className='claimedTaskProduct-list'>
                        <Grid divided>
                          {taskProducts}
                        </Grid>
                      </List>
                    </Card.Description>
                    <Card.Description>
                      <strong>Total Price: {showRequest.total}</strong>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Button
                      basic
                      color='red'
                      id={showRequest.id}
                      key={showRequest.id}
                      onClick={event => claimTaskMap(event, dispatch)}
                    >
                      Claim Task
                    </Button>
                  </Card.Content>
                </Card>
              </>
            )}
          </div>
        </InfoWindowEx>
      </Map>
    </>
  )
}
const mapStateToProps = state => {
  return {
    requests: state.requests,
    showMarkerWindow: state.showMarkerWindow
  }
}
const Google = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer)
export default connect(mapStateToProps)(Google)
