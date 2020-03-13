import React, {useState} from "react";
import "./List.css";
//import * as restaurantData from "./data/restaurant.json";
import Card from "./Card";

const List = props => {

    const [valueMin, setValueMin] = useState(parseInt(props.valueMin));
    const [valueMax, setValueMax] = useState(parseInt(props.valueMax));
    const [restaurantDisplay, setRestaurantDisplay] = useState(props.restaurantDisplay);

    return(props.restaurantDisplay ?
        <ul className="list">
            {props.restaurantDisplay.map(restaurant => (
                restaurant.display = true,
                <Card key={restaurant.restaurantID} /*displayDetails={false}*/ restaurant={restaurant}/>
            ))}
        </ul>
    : <div>Chargement des restaurants...</div>);
}

export default List;