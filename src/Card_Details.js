import React, {useState} from "react";
import "./List.css";
import * as restaurantData from "./data/restaurant.json";

const CardDetails = props => {

    return(
        <div>{props.restaurant.restaurantName}</div>
    );
}

export default CardDetails;