import React from "react";
import { Map, GoogleApiWrapper } from 'google-maps-react';
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

    // }
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
                }
            } />
        </div>
      )
    }
  
}


  export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(BoozyMap)