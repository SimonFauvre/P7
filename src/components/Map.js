import React, { useState, useContext, useEffect } from 'react'
import '../style/App.css'
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'
import mapStyle from "../style/mapStyle.js"
import RestaurantContext from "./RestaurantContext"

const Map = props => {

  const { restaurants, updateRestaurants, handleMarkerClick } = useContext(RestaurantContext)
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [center, setCenter] = useState({lat: null, lng: null})

  useEffect(() => {
    let element = document.getElementsByClassName("map")[0]
    element.addEventListener("click", clickMap)
  }, [])

  useEffect(() => {
    setCenter(props.location)
  }, [props.location])

  const clickMap = () => {   

  }

  // const getPlaceID = (datas) => {
  //   let tmpData = []
  //   datas.results.map(data => {
  //     fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${data.place_id}&fields=name,rating,reviews,geometry,formatted_address,photos,place_id&key=AIzaSyBzAf_XKIdBQt792tABxjCgQdDuL7r20W8`)
  //     .then((res) => res.json())
  //     .then(data => transformDatas(data))
  //     .then(data => {
  //       console.log(restaurants)
  //       updateRestaurants([...restaurants, data])
  //     })
  //     .catch((err) => console.log(err))
  //   })
  // }

  const onClickMarkerRestaurant = (restaurant, open) => {
    handleMarkerClick(restaurant.restaurantID, open)
    open === true ? setSelectedRestaurant(restaurant) : setSelectedRestaurant(null)
    setSelectedLocation(null)
  }

  const initMap = () => {
    return (
    <GoogleMap
      defaultZoom={15}
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
        position={center}
        onClick={() => {
          setSelectedLocation(center);
          setSelectedRestaurant(null);
        }}
        icon={{
          url: "/here.png",
          scaledSize: new window.google.maps.Size(20, 20)
        }} />

      {/* InfoWindow Utilisateur */}
      {selectedLocation && (
        <InfoWindow
          position={center}
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
          position={{ lat: restaurant.lat, lng: restaurant.lng }}
          icon={{
            url: "/logo_resto.png",
            scaledSize: new window.google.maps.Size(30, 30)
          }} />
      ))}

      {/* InfoWindow Restaurant */}
      {selectedRestaurant && (
        <InfoWindow
          position={{ lat: selectedRestaurant.lat, lng: selectedRestaurant.lng }}
          onCloseClick={() => onClickMarkerRestaurant(selectedRestaurant, false)}
          options={{ pixelOffset: new window.google.maps.Size(0, -30) }}>
          <div>
            <h2 style={{ fontSize: 14 }}>{selectedRestaurant.restaurantName}</h2>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
    )
  }

  return (
    initMap()
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));
export default WrappedMap;