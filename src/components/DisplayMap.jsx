import React, { Component } from "react";
import { Marker, Map, InfoWindow, GoogleApiWrapper } from "google-maps-react";


class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }
  render () {
    let locations = {
      cities: [
        {
          id: 1,
          name: 'Stockholm',
          position: { lat: 59.3285865, lng: 18.0599052 }
        },
        {
          id: 2,
          name: 'Tellusborgsvägen',
          position: { lat: 59.3042815, lng: 18.0105969 }
        },
        {
          id: 3,
          name: 'Gothenburg',
          position: { lat: 57.7089, lng: 11.9746 }
        }
      ]
    }
    const style = {
      width: '80%',
      height: '50%',
      align: 'center'
    }
    const onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      })
    return (
      <Map
        centerAroundCurrentLocation
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 59.3293,
          lng: 18.0686
        }}
        zoom={15}
        onClick={this.onMapClicked}
      >
        {locations.cities.map(city => (
          <Marker
            title={city.name}
            name={city.name}
            key={city.id}
            position={city.position}
            onClick={onMarkerClick.bind(this)}
          />
        ))}
        {}
        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>{}</div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
