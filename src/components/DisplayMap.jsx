import React from 'react'
import { Marker, Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react'
import { connect, useDispatch } from 'react-redux'

const MapContainer = props => {
  const dispatch = useDispatch()
  const style = { width: '60%', height: '70%' }

  const onChildClick = (key, childProps) => {
    dispatch({ type: 'CHANGE_MARKER_WINDOW', payload: !props.showMarkerWindow })
  }

  closeModal = () => {
    dispatch({ type: 'CHANGE_MARKER_WINDOW', payload: false })
  }

  return (
    <>
      <Popup
        open={this.state.showMarkerWindow}
        closeOnDocumentClick={true}
        onClose={this.closeModal}
        // onClick={this.hideElements}
      >
        <div className='modal'>
          <EntryPopup
            id={this.state.id}
            datapointClass={this.state.datapointClass}
            closeModal={this.closeModal}
          />
        </div>
      </Popup>

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
            position={{ lat: request.lat, lng: request.long }}
            onClick={onChildClick.bind(this)}
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
