import React, { Component } from "react";
import { Autocomplete, GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";
import "./MainPageStyle.css";
import {checkRoutes} from "../function/checkRoutes"
import checkTolls from "../function/checkTolls"
import checkPrice from "../function/checkPrice"
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'
import { Row } from "react-bootstrap";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 3.1390,
  lng: 101.6869,
};

class MainPage extends Component {
  constructor() {
    super();

    this.state = {
      origin: null,
      destination: null,
      modalOn: false,
      test: "",
      response: null,
      totalPrice: {
        class1: 0,
        class2: 0,
        class3: 0,
        class4: 0,
        class5: 0
      }
    };
    this.originOnLoad = this.originOnLoad.bind(this);
    this.originOnPlaceChanged = this.originOnPlaceChanged.bind(this);
    this.destinationOnLoad = this.destinationOnLoad.bind(this);
    this.destinationOnPlaceChanged = this.destinationOnPlaceChanged.bind(this);
    this.calculateRoute = this.calculateRoute.bind(this);
  }

  destinationOnLoad(destination) {
    this.setState({destination})
  }

  destinationOnPlaceChanged(){
    if (this.state.destination !== null) {
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  originOnLoad(origin) {
    this.setState({origin})
  }

  originOnPlaceChanged() {
    if (this.state.origin !== null) {
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  calculateRoute() {
    var directionsService = new window.google.maps.DirectionsService();
    var request = {
      destination: this.state.destination.getPlace().place_id ? { placeId: this.state.destination.getPlace().place_id} : this.state.destination.getPlace().name,
      origin: this.state.origin.getPlace().place_id ? { placeId: this.state.origin.getPlace().place_id} : this.state.origin.getPlace().name,
      travelMode: 'DRIVING'
    }
    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        // console.log(response)
        console.log(response.routes[0].overview_polyline)
        var decoded_polyline = new window.google.maps.geometry.encoding.decodePath(response.routes[0].overview_polyline);
        var polyline_arr = JSON.parse(JSON.stringify(decoded_polyline))
        // console.log(polyline_arr)
        var highways = checkRoutes(response)
        this.setState({response});
        var tolls = checkTolls(polyline_arr,highways)
        var totalPrice = checkPrice(tolls,highways)
        this.setState({highways, tolls, totalPrice, modalOn: true})
      }
    });
  }

hideModal() {
  this.setState({modalOn: false})
}

  render() {
    return (
      <div className="mainDiv">
        <LoadScript
          libraries={["places"]}
          googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        >
          <p>Simple Closed Toll Calculator</p>
          <label>Origin:</label>
          <Autocomplete
            onLoad={this.originOnLoad}
            onPlaceChanged={this.originOnPlaceChanged}
          >
            <input
              type="text"
            />
          </Autocomplete>
          <br />
          <label>
            Destination:
            <Autocomplete
            onLoad={this.destinationOnLoad}
            onPlaceChanged={this.destinationOnPlaceChanged}
          >
            <input
              type="text"
            />
          </Autocomplete>
          </label>
          <br />
          <button type="button" onClick={this.calculateRoute}>
            Build Route
          </button>

          <div className="container" style={{justifyContents: "center", marginTop: 20}}>
            <h4>Supported Tolls</h4>
            <Row>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>LDP - E11</Card.Title>
                <Card.Text>
                  Puchong Selatan <br />
                  Puchong Barat
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ width: '18rem', marginLeft: 10 }}>
              <Card.Body>
                <Card.Title>KESAS - E5</Card.Title>
                <Card.Text>
                  Plaza Toll Sunway
                </Card.Text>
              </Card.Body>
            </Card>
            </Row>
          </div>
          {/* {this.state.show && 
          <DirectionsService 
            options={{
              destination: this.state.destination.getPlace().place_id ? { placeId: this.state.destination.getPlace().place_id} : this.state.destination.getPlace().name,
              origin: this.state.origin.getPlace().place_id ? { placeId: this.state.origin.getPlace().place_id} : this.state.origin.getPlace().name,
              travelMode: 'DRIVING'
            }}
            callback={this.directionsCallback}
          />} */}
          
        </LoadScript>
        <Modal show={this.state.modalOn} onHide={() => this.hideModal()} centered>
        <Modal.Header>
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <h4>Route</h4>
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            style={{alignSelf: "center"}}
          >
            {
              this.state.response !== null && (
                <DirectionsRenderer 
                  options={{
                    directions: this.state.response
                  }}
                />
              )
            }
          </GoogleMap>
          <h4>Toll Fare</h4>
              <p>Class 1 Vehicle: RM{this.state.totalPrice.class1.toFixed(2)}</p>
              <p>Class 2 Vehicle: RM{this.state.totalPrice.class2.toFixed(2)}</p>
              <p>Class 3 Vehicle: RM{this.state.totalPrice.class3.toFixed(2)}</p>
              <p>Class 4 Vehicle: RM{this.state.totalPrice.class4.toFixed(2)}</p>
              <p>Class 5 Vehicle: RM{this.state.totalPrice.class5.toFixed(2)}</p>
            </Modal.Body>
          </Modal>
      </div>
    );
  }
}

export default MainPage;
