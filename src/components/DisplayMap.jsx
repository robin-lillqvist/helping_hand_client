import React, { Component } from "react";
import { Marker, Map, InfoWindow, GoogleApiWrapper } from "google-maps-react";


const style = {
  width: "75%",
  height: "75%",
  borderRadius: "10px",
  left: "12%",
};

let markers = 
  [{lat: 57.7089, lng: 11.9746 }]

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    markers: {}
  };

  render() {
    return (


      <Map
        google={this.props.google}
        zoom={3}
        style={style}
        initialCenter={{
          lat: 57.7089,
          lng: 11.9746,
        }}
      >

        {markers.map((city) => {
          return (
            <>
              <Marker
                lat= {city.lat}
                lng= {city.lng}
                name= {city.name}
                color="blue"
              />
            </>
          );
        })}

        <InfoWindow>
          <div></div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
})(MapContainer);
