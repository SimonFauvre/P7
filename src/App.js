import React, {useState} from 'react';
import './App.css';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';
import * as restaurantData from "./data/restaurant.json";
import mapStyle from "./mapStyle.js";

function Map(){
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <GoogleMap 
      defaultZoom={13} 
      defaultCenter={{ lat: 45.764042, lng: 4.835659 }}
      defaultOptions={{styles: mapStyle}}>
      {restaurantData.features.map(restaurant => (
        <Marker 
          key={restaurant.restaurantID} 
          position={{lat: restaurant.lat, lng: restaurant.long}}
          onClick={() => {
            setSelectedRestaurant(restaurant);
          }}
          icon={{
            url: "/logo_resto.png",
            scaledSize: new window.google.maps.Size(30, 30)
          }}
        />
      ))}

      {selectedRestaurant && (
        <InfoWindow 
          position={{lat: selectedRestaurant.lat, lng: selectedRestaurant.long}}
          onCloseClick={() => {
            setSelectedRestaurant(null);
          }}
          options={{pixelOffset: new window.google.maps.Size(0, -30)}}
        >
            <div>
              <h2 style={{fontSize: 14}}>{selectedRestaurant.restaurantName}</h2>
            </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBbXlKpycaKnkWqib5h17gluphKw_nLENs`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
}
