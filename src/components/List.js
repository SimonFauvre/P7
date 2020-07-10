import React, { useContext, useEffect } from "react";
import "../style/List.css";
import Card from "./Card";
import RestaurantContext from "./RestaurantContext";

const List = props => {

    const { tmpRestaurants, updateTmpRestaurants } = useContext(RestaurantContext);

    return (tmpRestaurants ?
        <ul className="list">
            {tmpRestaurants.map(restaurant => (
                <Card key={restaurant.restaurantID} restaurantID={restaurant.restaurantID} />
                
            ))}
        </ul>

        : <div>Chargement des restaurants...</div>
    );
}

export default List;