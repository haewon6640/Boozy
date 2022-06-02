import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
// import 'dotenv/config' 

class BoozyMap extends React.Component {
    constructor(props) {
        super(props)
    //     const {lat, lng} = this.props.initialCenter;

        this.state = {
            center: { lat: 0, lng: 0},
            coordsResult: [],
            trigger: 0
        }
    }

    componentDidMount() {

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

                      
        let success = function success(pos) {
            var crd = pos.coords;
            // debugger
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            
            this.setState({
                center: { lat: crd.latitude, lng: crd.longitude},
                trigger: 1

            })
        }.bind(this)
        
        function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        }

       
        
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    onMapLoad = map => {
        let coords= {}
        let request = {
          query: "Safeway",
          fields: ["name", "geometry"]
        };
    
        let service = new window.google.maps.places.PlacesService(map);
    
        service.findPlaceFromQuery(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              coords.push(results[i]);
            }
    
            this.setState({
            //   center: results[0].geometry.location,
              coordsResult: coords
            });
          }
        });
      };
  

  
    render() {
        console.log(this.state)
      return (
        <div className="map-component">
            <Map
                classname="map-component"
                google={this.props.google}
                zoom={14}
                initialCenter={this.state.center}
                onClick={this.onMapClicked}
                onLoad={map => this.onMapLoad(map)}
            >
                {this.state.coordsResult !== [] &&
                    this.state.coordsResult.map(function(results, i) {
                        return (
                            <Marker key={i} position={results.geometry.location}>
                            <InfoWindow 
                            options={{ maxWidth: 300 }}>
                                
                                <span>{results.name}</span>
                                
                            </InfoWindow>
                            </Marker>
                        )
                    }
              )}
            </Map>
        </div>
      )
    }
  
}


  export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(BoozyMap)