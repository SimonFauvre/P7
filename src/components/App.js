import React, {useState} from "react";
import "../style/PanelRight.css";
import * as restaurantData from "../data/restaurant.json";
import WrappedMap from "./Map";
import PanelRight from "./PanelRight";
import RestaurantsContext from "./RestaurantContext";

const App = () => {

  const [restaurants, setRestaurants] = useState([...restaurantData.default.features]);
  const contextValue = {
    restaurants: restaurants,
    updateRestaurants: setRestaurants
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

  // const defineDisplay = (restaurant) => {
  //     var restaurantSelect = restaurants.filter(feature => feature.restaurantID === restaurant.restaurantID);
  //     restaurantSelect[0].display = false;
  // }

  const defineDisplayDetails = (restaurant) => {
      var restaurantSelect = restaurants.filter(feature => feature.restaurantID === restaurant.restaurantID);
      restaurantSelect[0].displayDetails = false;
  }

  const initRestaurant = () => {
    restaurants.map(restaurant => (
      moyenneAvis(restaurant),
      //defineDisplay(restaurant),
      defineDisplayDetails(restaurant)
    ));
  }

  initRestaurant();

  return (
    <RestaurantsContext.Provider value={contextValue}>
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
            <PanelRight/>
          </div>
        </div>
      </div>
    </RestaurantsContext.Provider>
  );
}

export default App;