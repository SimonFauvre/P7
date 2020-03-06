import React, {useState} from "react";
import "./List.css";
import * as restaurantData from "./data/restaurant.json";
import Card from "./Card";

const List = props => {

    const moyenneAvis = (restaurant) => {
        var restaurantSelect = restaurantData.features.filter(feature => feature.restaurantID === restaurant.restaurantID);
        const totalStars = restaurant.ratings.map(rating => rating.stars).reduce((previousValue, currentValue, index, array) => {
            var value = index + 1 === array.length ? (previousValue + currentValue) / array.length : previousValue + currentValue;
            restaurantSelect[0].average = value.toFixed(1);
            return value;
        });
        restaurantSelect[0].average = totalStars.toFixed(1);
    }

    {restaurantData.features.map(restaurant => (
        moyenneAvis(restaurant)
    ))}

    var restaurantDisplay = restaurantData.features.filter(feature => feature.average >= 5);
    console.log("restaurantDisplay : ", restaurantDisplay);

    return(restaurantData ?
        <ul className="list">
            {restaurantData.features.map(restaurant => (
                <Card display={true} displayDetails={false} restaurant={restaurant} />
            ))}
        </ul>
    : <div>Chargement des restaurants...</div>);
}

export default List;