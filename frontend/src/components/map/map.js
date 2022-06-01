import React from "react";
import { Map, GoogleApiWrapper } from 'google-maps-react';
// import 'dotenv/config' 

class BoozyMap extends React.Component {
    constructor(props) {
        super(props)

    }
  
    // componentDidMount() {
    //   // set the map to show SF
    // // try to show current location?
    //   const mapOptions = {
    //     center: { lat:t mapOptions = {
    //     center: { lat: 37.66385274501688, lng: -122.4351120016871}, 
    //     zoom: 8
    //   }; 37.66385274501688, lng: -122.4351120016871}, 
    //     zoom: 8
    //   };
  
    //   // wrap this.mapNode in a Google Map
    //   this.map = new google.maps.Map(this.mapNode, mapOptions);

    // }

    componentDidUpdate() {
    }
  
    render() {
        console.log(process.env.REACT_APP_GOOGLE_API_KEY)
        debugger 
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