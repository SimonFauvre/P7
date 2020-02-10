import React, {useState, useEffect} from 'react';
import './App.css';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow, MarkerClusterer} from 'react-google-maps';
import * as restaurantData from "./data/restaurant.json";
import mapStyle from "./mapStyle.js";
import List from "./List.js";
import Titre from "./Titre.js";
import useGeolocation from "react-hook-geolocation";

const Map = props => {

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const location = useGeolocation();
  let center = {lat: location.latitude, lng: location.longitude};

  if (selectedRestaurant !== null) {
    center = {lat: selectedRestaurant.lat, lng: selectedRestaurant.long};
  } else if (selectedLocation !== null) {
    center = {lat: selectedLocation.latitude, lng: selectedLocation.longitude};
  } else if (selectedRestaurant === null || selectedLocation === null){
    // Modifier pour ne plus centrer la carte sur un point précis
  }

  const clickRestaurant = (restaurant) => {
    console.log(restaurant);
  }

  return (
    <GoogleMap 
      defaultZoom={13} 
      defaultCenter={{ lat: 45.764042, lng: 4.835659 }}
      center={center}
      defaultOptions={{
        styles: mapStyle, 
        disableDefaultUI: true, 
        zoomControl: true, 
        zoomControlOptions: {
          style: window.google.maps.ZoomControlStyle.SMALL,
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: window.google.maps.ControlPosition.TOP_RIGHT
        }
      }}>
      <Marker
        position={{lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)}}
        onClick={() => {
          setSelectedLocation(location);
          setSelectedRestaurant(null);
        }}
        icon={{
          url: "/here.png",
          scaledSize: new window.google.maps.Size(20, 20)
        }}/>

      {selectedLocation && (
      <InfoWindow 
        position={{lat: parseFloat(selectedLocation.latitude), lng: parseFloat(selectedLocation.longitude)}}
        options={{pixelOffset: new window.google.maps.Size(0, -20)}}
        onCloseClick={() => {
          setSelectedLocation(null);
        }}>
        <div>
          <h2 style={{fontSize: 14}}>Vous êtes ici</h2>
        </div>
      </InfoWindow>
      )}

      {restaurantData.features.map(restaurant => (
        <Marker 
          key={restaurant.restaurantID} 
          position={{lat: restaurant.lat, lng: restaurant.long}}
          onClick={() => {
            setSelectedRestaurant(restaurant);
            setSelectedLocation(null);
            clickRestaurant(restaurant);
          }}
          icon={{
            url: "/logo_resto.png",
            scaledSize: new window.google.maps.Size(30, 30)
          }}/>
      ))}

      {selectedRestaurant && (
        <InfoWindow 
          position={{lat: selectedRestaurant.lat, lng: selectedRestaurant.long}}
          onCloseClick={() => {
            setSelectedRestaurant(null);
          }}
          options={{pixelOffset: new window.google.maps.Size(0, -30)}}>
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
    <div className="appCSS">
      <div style={{width: '65vw', height: '100vh'}}>
        <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBbXlKpycaKnkWqib5h17gluphKw_nLENs`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
      <div style={{width: '35vw', height: '100vh'}}>
        <div className="general">
          <Titre/>
          <List/>
        </div>
      </div>
    </div>
  );
}
