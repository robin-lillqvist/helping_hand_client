import React, { useState } from 'react'
import { Marker, Map, GoogleApiWrapper } from 'google-maps-react'
import { Button, List } from 'semantic-ui-react'
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
        <InfoWindowEx visible={true} marker={activeMarker}>
          <div style={{textAlign: 'center'}} id={`selectedPlace-${selectedPlace.id}`}>
            {selectedPlace.id && <p>Name: {showRequest.name}</p>}
            {selectedPlace.id && <p>Address: {showRequest.address}</p>}
            {selectedPlace.id && (
              <div>
                Products: <List>{taskProducts}</List>
              </div>
            )}
            {selectedPlace.id && (
              <Button
                id={showRequest.id}
                key={showRequest.id}
                onClick={(event) => claimTaskMap(event, dispatch)}
              >
                Claim Task
              </Button>
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
