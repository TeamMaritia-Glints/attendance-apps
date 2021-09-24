import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
class MyComponents extends Component {
    constructor(props) {
    super(props);

    this.state = {
      lat: 0,
      lng: 0,
    };
  }

  componentDidMount(){
    if (!!navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.log(err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
      );
    } else {
      alert('El navegador no soporta la geolocalización,')
    }
  }
  render() {
    const { lat, lng } = this.state;
    console.log(lat, lng)
    const currentPosition = {
      lat: lat,
      lng: lng
    }
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyA-Gh7u-yBxHivkPdaKERRIijHxEcqhUIU"
      >
        <GoogleMap
          mapContainerStyle={{ width: '100%',height: '320px' }}
          center={currentPosition}
          zoom={10}
        >
          <Marker position={currentPosition} />
        </GoogleMap>
      </LoadScript>
    )
  }
}
export default MyComponents;
