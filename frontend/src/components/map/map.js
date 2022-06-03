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

            })
        }.bind(this)
        
        function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        }

       
        
        navigator.geolocation.getCurrentPosition(success, error, options);
        
    }

    onMapLoad = (mapProps, map) => {
        console.log(this.props)
        const {google} = mapProps
        let coords= []
        let request = {
          query: this.props.query,
          fields: ["name", "geometry"]
        };
    
        let service = new google.maps.places.PlacesService(map);

        // debugger
        service.findPlaceFromQuery(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              coords.push(results[i]);
            }
            this.setState({
              coordsResult: coords

            });
            // console.log(coords[0])
            // let marker1 = new google.maps.Marker({
            //     position: coords[0].geometry.location,
            //     map,
            //     title: "store location"
            // });

            // marker1.setMap(map);

            // const infowindow = new google.maps.InfoWindow({
            //     content: '<div> buy {this.props.query} at {coords[0].name}</div>'
            // });

            // marker1.addListener("click", () => {
            //     infowindow.open({
            //       anchor: marker1,
            //       map,
            //       shouldFocus: false,
            //     });
            // });
          }
        });
      };
  

  
    render() {
        console.log(this.state)
      return (
        <div className="map-container">   
            <Map
                className="map-component"
                google={this.props.google}
                zoom={10}
                center={this.state.center}
                onLoad={(mapProps, map) => this.onMapLoad(mapProps, map)}
                
                on
                // mapContainerStyle={{ height: "200px", width: "200px" }}
            >
                {/* {this.state.coordsResult !== [] &&
                    this.state.coordsResult.map(function(results, i) {
                        return (
                            <Marker key={i} position={results.geometry.location}>
                                <InfoWindow key={i} visible={true} position={results.geometry.location}>
                                    
                                    <div className="info-div">
                                        <h3>{results.name}</h3>
                                    </div>
                                    
                                </InfoWindow>
                            </Marker>
                            
                        )
                    }
              )} */}
            </Map>
        </div>
      )
    }
  
}


  export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(BoozyMap)

