import React, {useState} from "react";
import "./List.css";
import CardDetails from "./Card_Details";

const Card = props => {

    const [display, setDisplay] = useState(props.display);
    const [displayDetails, setDisplayDetails] = useState(props.displayDetails);
    
    const moyenneAvis = (restaurant) => {
        const totalStars = restaurant.ratings.map(rating => rating.stars).reduce((previousValue, currentValue, index, array) => {
            return index + 1 === array.length ? (previousValue + currentValue) / array.length : previousValue + currentValue;
        });
        return totalStars.toFixed(1);
    }

    const displayRestaurant = () => {
        console.log(displayDetails)
        if(display){
            return(
            <li key={props.restaurant.restaurantID} className="itemList" onClick={() => setDisplayDetails(!displayDetails)}>
                {displayDetails ? 
                <CardDetails restaurant={props.restaurant}/> : 
                <div>
                    <img className="imgRestaurant" src={props.restaurant.img} alt="Le restaurant"></img>
                    <div style={{marginTop: "auto", marginBottom: "auto"}}>
                        <h2>{props.restaurant.restaurantName}</h2>
                        <div className="moyenneAvis">
                            <span style={{verticalAlign:'middle'}}>{moyenneAvis(props.restaurant)}</span>
                            <img src="etoile.png" className="imgAvis" alt="Etoile des avis"></img>
                        </div>
                        <div className="adresse">{props.restaurant.address}</div>
                    </div>
                </div>}
            </li>);
        }
    }

console.log(props)
    return(
        <div className="card">
            {displayRestaurant()}
        </div>
    );
}

export default Card;