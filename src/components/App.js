import React, { useState, useEffect, createContext } from "react";
import "../style/PanelRight.css";
import * as restaurantData from "../data/restaurant.json";
import WrappedMap from "./Map";
import PanelRight from "./PanelRight";
import RestaurantsContext from "./RestaurantContext";

const App = () => {

  const [restaurants, setRestaurants] = useState([...restaurantData.default.features]);

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
    restaurants.map(restaurant => (
      moyenneAvis(restaurant)
    ));
  }, [])

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
        <div style={{ width: '65vw', height: '100vh' }}>
          <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBbXlKpycaKnkWqib5h17gluphKw_nLENs`}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
            handleMarkerClick={handleMarkerClick}
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