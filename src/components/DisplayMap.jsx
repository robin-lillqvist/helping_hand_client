import React from 'react'
import { Marker, Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react'
import { connect, useDispatch } from 'react-redux'

const MapContainer = props => {
  const dispatch = useDispatch()
  const style = { width: '80%', height: '50%', align: 'center' }
  const onMarkerClick = (props, marker, e) => {
    dispatch({ 
      type: 'MARKER_CLICK', selectedPlace: props, activeMarker: marker, showingInfoWindow: true
    })
  }

 debugger
  return (
    <Map
      centerAroundCurrentLocation
      google={props.google}
      style={style}
      // initialCenter={{ lat: 1.3293, lng: 1.0686 }}
      zoom={17}
      // onClick={onMapClicked.bind(this)}
    >
      {props.requests.map(request => (
        <Marker
          title={request.id}
          name='Testing'
          key={request.id}
          position={{ lat: request.lat, lng: request.long }}
          onClick={onMarkerClick.bind(this)}
        />
      ))}
      <InfoWindow
      // onClose={onInfoWindowClose}
      >
        <div>Hello</div>
      </InfoWindow>
    </Map>
  )
}

const mapStateToProps = state => {
  return {
    requests: state.requests
  }
}
const Google = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer)
export default connect(mapStateToProps)(Google)
