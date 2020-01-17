import React, {useState} from "react";
import "./List.css";
import * as restaurantData from "./data/restaurant.json";

const List = props => {
    
    const moyenneAvis = (restaurant) => {
        const totalStars = restaurant.ratings.map(rating => rating.stars).reduce((previousValue, currentValue, index, array) => {
            return index + 1 === array.length ? (previousValue + currentValue) / array.length : previousValue + currentValue;
        });
        return totalStars.toFixed(1);
    }

    return(restaurantData ?
            <ul>
                {restaurantData.features.map(restaurant => (
                    <li key={restaurant.restaurantID} onClick={() => {
                        console.log("Selection du restaurant : " + restaurant.restaurantName);
                    }}>
                        <img className="imgRestaurant" src={restaurant.img} alt="Le restaurant"></img>
                        <div style={{marginTop: "auto", marginBottom: "auto"}}>
                            <h2>{restaurant.restaurantName}</h2>
                            <div className="moyenneAvis">
                                <span style={{verticalAlign:'middle'}}>{moyenneAvis(restaurant)}</span>
                                <img src="etoile.png" className="imgAvis" alt="Etoile des avis"></img>
                            </div>
                            <div className="adresse">{restaurant.address}</div>
                        </div>
                    </li>
                ))}
            </ul>
    : <div>Chargement des restaurants...</div>);
}

export default List;