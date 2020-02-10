import React, {useState} from "react";
import "./List.css";
import * as restaurantData from "./data/restaurant.json";
import Card from "./Card";

const List = props => {

    return(restaurantData ?
        <ul className="list">
            {restaurantData.features.map(restaurant => (
                <Card display={true} displayDetails={false} restaurant={restaurant} />
            ))}
        </ul>
    : <div>Chargement du restaurant...</div>);
}

export default List;