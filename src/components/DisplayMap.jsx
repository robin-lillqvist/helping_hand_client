import React, { useState } from 'react'
import { Marker, Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react'
import { Button, List } from 'semantic-ui-react'
import { connect, useDispatch } from 'react-redux'
import { claimTask } from '../state/actions/taskActions'

const MapContainer = props => {
  const dispatch = useDispatch()
  const style = { width: '100%', height: '80vh' }

  const [activeMarker, setActiveMarker] = useState({})
  const [selectedPlace, setSelectedPlace] = useState({})
  const [selectedPlaceID, setSelectedPlaceID] = useState(0)

  const onMarkerClick = (props, marker, e) => {
    debugger
    setActiveMarker(marker)
    setSelectedPlace(props)
  }

  let taskProducts
  let taskEmail
  if (selectedPlace.id) {
    taskProducts = props.requests.find(products => products.id === [selectedPlace.id]).products.map(product => {
      return (
        <List.Item
          className='showProducts'
          id={`showProduct-${product.name}`}
          key={`showProduct-${product.name}`}
        >
          <span>{product.amount}</span>
          <span>{product.name}</span>
          <span>{product.total}</span>
        </List.Item>
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
        <InfoWindow visible={true} marker={activeMarker}>
          <div>
            <p>Name: Robin Lillqvist</p>
            <p>
              Products:
              <List>{taskProducts}</List>
            </p>
            <Button
              id={selectedPlace.id}
              key={selectedPlace.id}
              onClick={e => claimTask(e, dispatch)}
            >
              Claim Task
            </Button>
          </div>
        </InfoWindow>
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
