import React, { useState, useContext, useEffect } from "react";
import "../style/Card_Details.css";
import RestaurantContext from "./RestaurantContext";

const CardDetails = props => {

    const { tmpRestaurants, updateTmpRestaurants} = useContext(RestaurantContext);
    const [restaurant, setRestaurant] = useState(tmpRestaurants.filter(restau => restau.restaurantID === props.restaurant.restaurantID)[0]);
    const [moyenneAvis, setMoyenneAvis] = useState(restaurant.average);
    const [avis, setAvis] = useState('');
    const [note, setNote] = useState(1);

    var imgSrc = "https://maps.googleapis.com/maps/api/streetview?size=312x240&location=" + restaurant.lat + "," + restaurant.lng + "&heading=151.78&pitch=-0.76&key=AIzaSyDhYcj8hX50sSL6zzWj_G68tIep3P5MWog";

    const addCommentToJson = (commentaire, restaurant) => {
        var restaurantSelect = tmpRestaurants.filter(feature => feature.restaurantID === restaurant.restaurantID);
        var newAvis = {};
        newAvis.stars = note;
        newAvis.comment = commentaire;
        restaurantSelect[0].ratings.push(newAvis);
        restaurantSelect[0].ratingsTotal = restaurantSelect[0].ratingsTotal + 1;

        setRestaurant({ ...restaurant, restaurant: restaurantSelect[0] });
        setAvis('')
        document.getElementsByClassName("textCommentaire")[0].style.color = "grey";
        moyenneNote(restaurant);
    }

    const handleMinChange = (e) => {
        setNote(parseInt(e.target.value));
    }
    useEffect(() => {
        setNote(note);
    }, [note])

    const moyenneNote = (restaurant) => {
        let ratingsLength = restaurant.ratings.length;
        let moyennePrevious = restaurant.average;
        restaurant.ratings.map(note =>
            restaurant.average += note.stars
        );

        let ratingsTotalM1 = (restaurant.ratingsTotal - 1)
        let note = restaurant.ratings[ratingsLength - 1].stars
        let ratingsTotal = restaurant.ratingsTotal

        let moyenne = ((moyennePrevious * ratingsTotalM1) + note) / ratingsTotal;
        restaurant.average = parseFloat(moyenne.toFixed(2));
        setMoyenneAvis(restaurant.average);

        let tmp = tmpRestaurants;
        tmp.map(restau =>
            restau.restaurantID === restaurant.restaurantID ?
                restau = restaurant : null
        )

        updateTmpRestaurants(tmp);
    }

    return (
        <div className="details">
            <div className="detailsRestaurant">
                <img className="imgRestaurantDetails" src={imgSrc} alt=""></img>
                <div className="infoRestaurantDetails">
                    <h2>{restaurant.restaurantName}</h2>
                    <div className="moyenneAvis">
                        <span className="moyenneAvisText">{moyenneAvis}</span>
                        <img className="etoileAvis" src="etoile.png" alt="Etoile des avis"></img>
                        <span className="nbRatings">{restaurant.ratingsTotal} avis</span>
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
                <select className="selectNote" id="selectNote" value={note} onChange={e => handleMinChange(e)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <input type="text" className="textCommentaire" name="Commentaire" placeholder='Insérer un nouveau commentaire' value={avis} onChange={(e) => {setAvis(e.target.value); e.target.style.color = "white"}}></input>
                <input type="submit" className="btnAjoutCommentaire" value="→" onClick={() => addCommentToJson(avis, restaurant)}></input>
            </div>
        </div>
    );
}

export default CardDetails;