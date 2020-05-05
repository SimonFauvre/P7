import React, {useState, useEffect, useContext} from "react";
import "../style/Card.css";
import CardDetails from "./Card_Details";
import RestaurantContext from "./RestaurantContext";

const Card = props => {

    const {restaurants, updateRestaurants} = useContext(RestaurantContext);
    const [restaurant, setRestaurant] = useState(restaurants.filter(restau => restau.restaurantID === props.restaurantID)[0]);

    const changeDisplayDetails = (e) => {
        if (e.target.className !== "selectNote" && e.target.className !== "textCommentaire" && e.target.className !== "btnAjoutCommentaire") {
            setRestaurant({...restaurant, displayDetails: !restaurant.displayDetails});

            console.log(restaurants);
            let tmpRestaurants = restaurants;
            tmpRestaurants.map(restau => 
                restau.restaurantID === restaurant.restaurantID ? restau.displayDetails = !restaurant.displayDetails : false
            )
            console.log(tmpRestaurants);
            updateRestaurants(tmpRestaurants);
        }
    }

    useEffect(() => {
        updateRestaurants(restaurants);
    })

    return(
        <div className="card">
            <li 
                key={restaurant.restaurantID} 
                className="itemList" 
                id={"restaurant-" + restaurant.restaurantID} 
                onClick={changeDisplayDetails}>
                    {restaurants.filter(restau => restau.restaurantID === props.restaurantID)[0].displayDetails ?
                    <CardDetails restaurant={restaurant}/> : 
                    <div className="cardRestaurant">
                        <img className="imgRestaurant" src={restaurant.img} alt="Le restaurant"></img>
                        <div style={{marginTop: "auto", marginBottom: "auto"}}>
                            <h2>{restaurant.restaurantName}</h2>
                            <div className="moyenneAvis">
                                <span className="moyenneAvisText">
                                    { restaurants.filter(restau => restau.restaurantID === props.restaurantID)[0].average }
                                </span>
                                <img src="etoile.png" className="etoileAvis" alt="Etoile des avis"></img>
                                <span className="nbRatings">{restaurant.ratings.length} avis</span>
                            </div>
                            <div className="adresse">{restaurant.address}</div>
                        </div>
                    </div>}
            </li>
        </div>
    );
}

export default Card;