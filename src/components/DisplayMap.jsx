import React, { useState } from 'react'
import { Marker, Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react'
import { connect, useDispatch } from 'react-redux'
const MapContainer = props => {
  const dispatch = useDispatch()

  const style = { width: '100%', height: '100%' }
  // const [showPopUp, setShowPopUp] = useState(false)
  const [activeMarker, setActiveMarker] = useState({})
  const [selectedPlace, setSelectedPlace] = useState({})

  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker)
    setSelectedPlace(props)
    // setShowPopUp(true)
    debugger
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
            key={'marker-' + request.id}
            id={'marker-' + request.id}
            position={{ lat: request.lat, lng: request.long }}
            onClick={onMarkerClick}
          ></Marker>
        ))}
        <InfoWindow visible={true} marker={activeMarker}>
          <div>
            <p>{selectedPlace.title}</p>
            
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
