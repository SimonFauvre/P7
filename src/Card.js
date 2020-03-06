import React, {useState} from "react";
import "./Card.css";
import CardDetails from "./Card_Details";
import * as restaurantData from "./data/restaurant.json";

const Card = props => {

    const [display, setDisplay] = useState(props.display);
    const [displayDetails, setDisplayDetails] = useState(props.displayDetails);
    const [restaurant, setRestaurant] = useState(props.restaurant);
    const [moyenne, setMoyenne] = useState(props.moyenne);


    const displayRestaurant = () => {
        if(display){
            return(
            <li key={restaurant.restaurantID} className="itemList" onClick={() => setDisplayDetails(!displayDetails)}>
                {displayDetails ? 
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
    }

    return(
        <div className="card">
            {displayRestaurant()}
        </div>
    );
}

export default Card;