import React, {useState} from "react";
import "../style/Card_Details.css";
import * as restaurantData from "../data/restaurant.json";

const CardDetails = props => {

    const [restaurant, setRestaurant] = useState(props.restaurant);
    const [moyenneAvis, setMoyenneAvis] = useState(props.moyenneAvis);
    const [avis, setAvis] = useState("Insérer un nouveau commentaire");
    var imgSrc = "https://maps.googleapis.com/maps/api/streetview?size=312x240&location=" + restaurant.lat + "," + restaurant.long + "&heading=151.78&pitch=-0.76&key=AIzaSyBbXlKpycaKnkWqib5h17gluphKw_nLENs";

    const addCommentToJson = (commentaire, restaurant) => {
        var restaurantSelect = restaurantData.features.filter(feature => feature.restaurantID === restaurant.restaurantID);
        var newAvis = {};
        newAvis.stars = 1;
        newAvis.comment = commentaire;
        restaurantSelect[0].ratings.push(newAvis);
    }

    return(
        <div className="details">
            <div className="detailsRestaurant">
                <img className="imgRestaurantDetails" src={imgSrc} alt=""></img>
                <div className="infoRestaurantDetails">
                    <h2>{restaurant.restaurantName}</h2>
                    <div className="moyenneAvis">
                        <span className="moyenneAvisText">{moyenneAvis}</span>
                        <img className="etoileAvis" src="etoile.png" alt="Etoile des avis"></img>
                    </div>
                    <div className="adresse">{restaurant.address}</div>
                </div>
            </div>
            {restaurant.ratings.map(avis => (
                <div className="note">
                    <span>{avis.stars}</span>
                    <img src="etoile.png" className="imgAvisDetails" alt="Etoile des avis"></img>
                    <div className="avis">{avis.comment}</div>
                </div>
            ))}
            <div className="newComment">
                <input type="number" min="1" max="5" step="1" value="1" size="6"></input>
                <input type="text" className="commentaire" name="Commentaire" value={avis} onChange={(e) => setAvis(e.target.value)}></input>
                <input type="submit" value="→" onClick={() => addCommentToJson(avis, restaurant)}></input>
            </div>
        </div>
    );
}

export default CardDetails;