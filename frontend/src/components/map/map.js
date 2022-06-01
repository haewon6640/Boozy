import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
// import 'dotenv/config' 

class BoozyMap extends React.Component {
    constructor(props) {
        super(props)
    //     const {lat, lng} = this.props.initialCenter;

    //     this.state = {
    //         currentLocation: {
    //             lat: lat,
    //             lng: lng
    //   }
    }

    componentDidMount() {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          };
          
          function success(pos) {
            var crd = pos.coords;
          
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
          }
          
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }
          
          navigator.geolocation.getCurrentPosition(success, error, options);
    }
  

  
    render() {

      return (
        <div className="map-component">
            <Map
                classname="map-component"
                google={this.props.google}
                zoom={8}
                initialCenter={
                {
                    lat: 37.66385274501688,
                    lng: -122.4351120016871
                }}
                onClick={this.onMapClicked}
            >

            <Marker
                title={'sooner or later'}
                name={'????'}
                position={{lat: 37.778519, lng: -122.405640}} />
                  <InfoWindow>
                    <div className="infowindow">
                        <p>Click on the map or drag the marker to select location where the incident occurred</p>
                    </div>
                </InfoWindow>

            </Map>
        </div>
      )
    }
  
}


  export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(BoozyMap)