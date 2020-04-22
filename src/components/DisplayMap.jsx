import React, { useState } from 'react'
import { Marker, Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react'
import { connect, useDispatch } from 'react-redux'
const MapContainer = props => {
  const dispatch = useDispatch()
  const style = { width: '60%', height: '70%' }
  const [showPopUp, setShowPopUp] = useState(false)
  const [activeRequest, setActiveMarker] = useState({})
  const onMarkerClick = (props, request) => {
    setActiveMarker(request)
    debugger
    setShowPopUp(true)
  }
  return (
    <>
      {showPopUp &&
        <InfoWindow 
          visible={showPopUp}
          marker={activeRequest}
        >
          <div>
            <p>Hello</p>
          </div>
        </InfoWindow>
      }
      <Map
        centerAroundCurrentLocation
        google={props.google}
        style={style}
        zoom={17}
      >
        {props.requests.map(request => (
          <Marker
            title={request.user.email}
            name={request.user.email}
            key={request.id}
            id={"marker-" + request.id}
            position={{ lat: request.lat, lng: request.long }}
            onClick={onMarkerClick}
          />
        ))}
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