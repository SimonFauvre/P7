import React, {useState, useEffect, useContext} from "react";
import "../style/Card.css";
import CardDetails from "./Card_Details";
import RestaurantContext from "./RestaurantContext";

const Card = props => {

    const {restaurants, updateRestaurants} = useContext(RestaurantContext);
    const [restaurant, setRestaurant] = useState(restaurants.filter(restau => restau.restaurantID === props.restaurantID)[0]);

    const changeDisplayDetails = () => {
        setRestaurant({...restaurant, displayDetails: !restaurant.displayDetails});
    }

    const displayRestaurant = () => {
        return(
        <li 
            key={restaurant.restaurantID} 
            className="itemList" 
            id={"restaurant-" + restaurant.restaurantID} 
            onClick={changeDisplayDetails}>
                {console.log("composant Card restaurant : ", restaurant),
                restaurant.displayDetails ?
                <CardDetails restaurant={restaurant} moyenneAvis={restaurant.average} avis={restaurant.ratings}/> : 
                <div className="cardRestaurant">
                    <img className="imgRestaurant" src={restaurant.img} alt="Le restaurant"></img>
                    <div style={{marginTop: "auto", marginBottom: "auto"}}>
                        <h2>{restaurant.restaurantName}</h2>
                        <div className="moyenneAvis">
                            <span className="moyenneAvisText">{restaurant.average}</span>
                            <img src="etoile.png" className="etoileAvis" alt="Etoile des avis"></img>
                        </div>
                        <div className="adresse">{restaurant.address}</div>
                    </div>
                </div>}
        </li>);
    }

    return(
        <div className="card">
            {displayRestaurant()}
        </div>
    );
}

export default Card;