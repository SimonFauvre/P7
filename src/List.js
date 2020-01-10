import React from "react";
import "./List.css";
import * as restaurantData from "./data/restaurant.json";

class List extends React.Component{
    render(){
        function moyenneAvis() {
            
        }

        return(
            <ul>
                {restaurantData.features.map(restaurant => (
                    <li id="first" key={restaurant.restaurantID} onClick={() => {
                        console.log("Selection du restaurant : " + restaurant.restaurantName);
                      }}>
                        <div>
                            <img className="imgRestaurant" src={restaurant.img} alt="Le restaurant"></img>
                        </div>
                        <div>
                            <h2>{restaurant.restaurantName}</h2>
                            <div className="moyenneAvis">{moyenneAvis()}</div>
                            <div className="adresse">{restaurant.address}</div>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }
}

export default List;