import React, { useState, useEffect } from "react";
import "../style/PanelRight.css";
import WrappedMap from "./Map";
import PanelRight from "./PanelRight";
import RestaurantsContext from "./RestaurantContext";

const App = () => {

  const [restaurants, setRestaurants] = useState([])
  const location = {}

  // Cette fonction mutate le state de App.js et est passée à la Map
  const handleMarkerClick = (id, open) => {
    const tmpRestaurants = restaurants.map(restaurant => {
      if (restaurant.restaurantID === id) {
        if (open) {
          restaurant.displayDetails = true
        } else {
          restaurant.displayDetails = false
        }
        return restaurant
      } else {
        restaurant.displayDetails = false
        return restaurant
      }
    })
    setRestaurants(tmpRestaurants)
  }

  const contextValue = {
    restaurants: restaurants,
    updateRestaurants: setRestaurants,
    handleMarkerClick: handleMarkerClick
  }

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(function(position) {
      location.lat = position.coords.latitude
      location.lng = position.coords.longitude

      fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude},${position.coords.longitude}&radius=1000&type=restaurant&key=AIzaSyA1j6BRMbbmh3M1qFh9jGzbFAa5NxGVbHI`)
      .then((res) => res.json())
      .then(data => transformDatas(data))
      .then(data => {
        setRestaurants(data)
      })
      .catch((err) => console.log(err))
    })

  }, [])

  const transformDatas = (datas) => {    
    let allRestaurantTransform = []    
    
    datas.results.map(data => {
      let tmpRestaurant = {}
      tmpRestaurant.restaurantID = data.place_id
      tmpRestaurant.restaurantName = data.name
      tmpRestaurant.address = data.vicinity
      tmpRestaurant.lat = data.geometry.location.lat
      tmpRestaurant.long = data.geometry.location.lng

      tmpRestaurant.ratings = []
      
      tmpRestaurant.average = data.rating
      
      if (!data.user_ratings_total) {
        tmpRestaurant.ratingsTotal = 0
      } else {
        tmpRestaurant.ratingsTotal = data.user_ratings_total
      }
      
      if (data.photos) {
        if (data.photos.length > 0) {
          tmpRestaurant.img = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${data.photos[0].photo_reference}&key=AIzaSyA1j6BRMbbmh3M1qFh9jGzbFAa5NxGVbHI`
        }
      }
      else {
        tmpRestaurant.img = ""
      }
      
      allRestaurantTransform.push(tmpRestaurant)
    })

    return allRestaurantTransform
  }

  const moyenneAvis = (restaurant) => {
    var restaurantSelect = restaurants.filter(feature => feature.restaurantID === restaurant.restaurantID);
    const totalStars = restaurant.ratings.map(rating => rating.stars).reduce((previousValue, currentValue, index, array) => {
      var value = index + 1 === array.length ? (previousValue + currentValue) / array.length : previousValue + currentValue;
      restaurantSelect[0].average = parseFloat(value.toFixed(1));
      return value;
    });
    restaurantSelect[0].average = parseFloat(totalStars.toFixed(1));
  }

  return (
    <RestaurantsContext.Provider value={contextValue}>
      <div className="appCSS">
        <div className="map" style={{ width: '65vw', height: '100vh' }}>
          <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBbXlKpycaKnkWqib5h17gluphKw_nLENs`}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
            handleMarkerClick={handleMarkerClick}
            location={location}
          />
        </div>
        <div style={{ width: '35vw', height: '100vh' }}>
          <div className="general">
            <PanelRight />
          </div>
        </div>
      </div>
    </RestaurantsContext.Provider>
  );
}

export default App;