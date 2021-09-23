import React, { useState } from 'react'; //only get coordinate

  const Geo = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [link, setLink] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Locating...');

      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        
        setLink(`https://maps.google.com/maps?q=${position.coords.latitude.toFixed(7)},${position.coords.longitude.toFixed(7)}&hl=es;z=14&amp;output=embed`)
        // setLink(`https://maps.google.com/maps?q=${position.coords.latitude || '40.7127837'},${position.coords.longitude || '-74.0059413'}&hl=es&z=14&amp;output=embed`)
      }, () => {
        setStatus('Unable to retrieve your location');
      });
      console.log('link', link)
    }
  }

  return (
    <div className="App">
      <button onClick={getLocation}>Your current location</button>
      <p>{status}</p>
      {lat && <a>{lat.toFixed(7)}</a>}
      {lng && <a>, {lng.toFixed(7)}</a>}
      {lng && lat &&<iframe src={`https://maps.google.com/maps?q=${lat.toFixed(7)},${lng.toFixed(7)}&hl=es;z=14&amp;output=embed`}></iframe>}
      { link && <iframe
      src={link}
    ></iframe>
      }
      <iframe
      src="https://maps.google.com/maps?q=-6.2463692,106.9030700&hl=es;z=14&amp;output=embed"
    ></iframe>

    </div>
  );
}

// import React from "react";
// import ReactDOM from "react-dom";
// import { compose, withProps } from "recompose";
// import {
//   withScriptjs,
//   withGoogleMap,
//   GoogleMap,
//   Marker
// } from "react-google-maps";


// class MyMap extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       lat: 0,
//       lng: 0,
//     };
//   }

//   componentWillMount(){
//     if (!!navigator.geolocation) {
//       navigator.geolocation.watchPosition((position) => {
//         this.setState({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       },
//       (err) => console.log(err),
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 },
//       );
//     } else {
//       //  // No Support Web
//       alert('El navegador no soporta la geolocalización,')
//     }
//   }

//   render() {
//     const { p } = this.props;
//     const { lat, lng } = this.state;
//     console.log(lat, lng)
//     return (
//       <div>
//         <GoogleMap
//           ref={map => {
//             this.map = map;
//             if (map && lat && lng) {
//               console.log(bounds);
//               const bounds = new google.maps.LatLngBounds({ lat, lng });
//               //map.fitBounds(bounds);
//               map.panTo({ lat, lng });
//             }
//           }}
//           zoom={16}
//           defaultCenter={{ lat, lng }}
//         >
//           {p.isMarkerShown && (
//             <Marker position={{ lat, lng }} />
//           )}
//         </GoogleMap>
//         {lat} <br />
//         {lng}
//       </div>
//     );
//   }
// }


// const MyMapComponent = compose(
//   withProps({
//     googleMapURL:
//       "https://maps.googleapis.com/maps/api/js?key=AIzaSyDNjpHU_Fxjkx7q2mjCfoA2zU2f7EXTWoI&v&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `400px` }} />,
//     mapElement: <div style={{ height: `100%` }} />
//   }),
//   withScriptjs,
//   withGoogleMap
// )(props => <MyMap p={props} />);

// ReactDOM.render(<MyMapComponent isMarkerShown />, document.getElementById("root"));


export default Geo;
