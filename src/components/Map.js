import React, {useState, useContext} from 'react';
import '../style/App.css';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';
import mapStyle from "../style/mapStyle.js";
import useGeolocation from "react-hook-geolocation";
import RestaurantContext from "./RestaurantContext";

const Map = props => {

    const {restaurants, updateRestaurants} = useContext(RestaurantContext);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const location = useGeolocation();
    //let center = {lat: location.latitude, lng: location.longitude};
    let center = {lat:  45.764042, lng: 4.835659};
  
  
    const clickRestaurant = (restaurant) => {
        
    }
  
    return (
      <GoogleMap 
        defaultZoom={13} 
        defaultCenter={{ lat: 45.764042, lng: 4.835659 }}
        //defaultCenter={{ lat: 45.764042, lng: 4.835659 }}
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
            <h2 style={{fontSize: "14px"}}>Vous êtes ici</h2>
          </div>
        </InfoWindow>
        )}

        {restaurants.map(restaurant => (
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
              setSelectedLocation(null);
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
export default WrappedMap;