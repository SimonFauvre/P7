import React, { useContext } from "react";
import "../style/List.css";
import Card from "./Card";
import RestaurantContext from "./RestaurantContext";

const List = props => {

    const { restaurants, updateRestaurants } = useContext(RestaurantContext);

    return (restaurants ?

        <ul className="list">
            {restaurants.map(restaurant => (
                <Card key={restaurant.restaurantID} restaurantID={restaurant.restaurantID} />

            ))}
        </ul>

        : <div>Chargement des restaurants...</div>
    );
}

export default List;