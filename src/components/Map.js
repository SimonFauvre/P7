import React, { useState, useContext, useEffect } from 'react';
import '../style/App.css';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import mapStyle from "../style/mapStyle.js";
import useGeolocation from "react-hook-geolocation";
import RestaurantContext from "./RestaurantContext";
//https://stackoverflow.com/questions/24884320/reactjs-how-to-update-a-component-from-another

const Map = props => {

  const { restaurants, updateRestaurants, handleMarkerClick } = useContext(RestaurantContext);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const location = useGeolocation();
  let center = { lat: 45.764042, lng: 4.835659 };

  useEffect(() => {
    updateRestaurants(restaurants)
  }, [restaurants])

  const onClickMarkerRestaurant = (restaurant, open) => {
    handleMarkerClick(restaurant.restaurantID, open)
    setSelectedRestaurant(restaurant)
    setSelectedLocation(null)
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
      {/* Marker Utilisateur */}
      <Marker
        position={{ lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) }}
        onClick={() => {
          setSelectedLocation(location);
          setSelectedRestaurant(null);
        }}
        icon={{
          url: "/here.png",
          scaledSize: new window.google.maps.Size(20, 20)
        }} />

      {/* InfoWindow Utilisateur */}
      {selectedLocation && (
        <InfoWindow
          position={{ lat: parseFloat(selectedLocation.latitude), lng: parseFloat(selectedLocation.longitude) }}
          options={{ pixelOffset: new window.google.maps.Size(0, -20) }}
          onCloseClick={() => {
            setSelectedLocation(null);
          }}>
          <div>
            <h2 style={{ fontSize: "14px" }}>Vous êtes ici</h2>
          </div>
        </InfoWindow>
      )}

      {/* Marker Restaurant */}
      {restaurants.map(restaurant => (
        <Marker
          onClick={() => onClickMarkerRestaurant(restaurant, true)}
          key={restaurant.restaurantID}
          position={{ lat: restaurant.lat, lng: restaurant.long }}
          icon={{
            url: "/logo_resto.png",
            scaledSize: new window.google.maps.Size(30, 30)
          }} />
      ))}

      {/* InfoWindow Restaurant */}
      {selectedRestaurant && (
        <InfoWindow
          position={{ lat: selectedRestaurant.lat, lng: selectedRestaurant.long }}
          onCloseClick={() => onClickMarkerRestaurant(selectedRestaurant, false)}
          options={{ pixelOffset: new window.google.maps.Size(0, -30) }}>
          <div>
            <h2 style={{ fontSize: 14 }}>{selectedRestaurant.restaurantName}</h2>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));
export default WrappedMap;