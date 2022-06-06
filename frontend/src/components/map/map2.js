import React from "react";

class BoozyMap2 extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            center: { lat: 0, lng: 0},
            coordsResult: [],
        }
        this.setQuery = this.setQuery.bind(this)
    }

   
  
    componentDidMount() {
        

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

                        
        let success = function success(pos) {
            var crd = pos.coords;
            // // debugger
            // console.log('Your current position is:');
            // console.log(`Latitude : ${crd.latitude}`);
            // console.log(`Longitude: ${crd.longitude}`);
            // console.log(`More or less ${crd.accuracy} meters.`);
            
            this.setState({
                center: { lat: crd.latitude, lng: crd.longitude},
            })
        }.bind(this)
        
        function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        
        navigator.geolocation.getCurrentPosition(success, error, options);
        
        let mapOptions = {
            center: this.state.center, 
            zoom: 12
          };
        
      // wrap this.mapNode in a Google Map
      this.map = new window.google.maps.Map(this.mapNode, mapOptions);


    }

    setQuery() {
        let query = this.props.query
        let queryResult = "";

        if (query) {
            if (query.category === "Produce" || query.category === 'Garnish' || query.category === 'Mixer') {
                queryResult = 'Grocery Store'
            }
            else {
                queryResult = 'Liquor'
            }
        }

        return queryResult

    }

    componentDidUpdate() {
        this.map.setCenter(this.state.center)

        
        let coords= []
        let request = {
          query: this.setQuery(),
          fields: ["name", "geometry"]
        };
    
        let service = new window.google.maps.places.PlacesService(this.map);

        // debugger
        service.findPlaceFromQuery(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              coords.push(results[i]);
            }

            this.setState({
              coordsResult: coords
            });
        }});


        // console.log(this.state)
        if (this.state.coordsResult.length >  0) {
            let marker1 = new window.google.maps.Marker({
                position: this.state.coordsResult[0].geometry.location,
                map : this.map,
                title: "store location"
            });
     
            marker1.setMap(this.map);
    
            const infowindow = new window.google.maps.InfoWindow({
                content: `<div> Buy ${this.props.query.name} at ${this.state.coordsResult[0].name}</div>`
            });
    
            marker1.addListener("click", () => {
                infowindow.open({
                anchor: marker1,
                map: this.map,
                shouldFocus: false,
                });
            });
        }


        
    }
  
    render() {
        // console.log(this.props.query)
        // debugger
      return (
          <div className="map-container">
            <div ref={ map => this.mapNode = map } className="map-component" > 
            </div>
          </div>
      )
    }
  
  }

  export default BoozyMap2