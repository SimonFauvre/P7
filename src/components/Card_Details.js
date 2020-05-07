import React, { useState, useContext, useEffect } from "react";
import "../style/Card_Details.css";
import RestaurantContext from "./RestaurantContext";

const CardDetails = props => {

    const { restaurants, updateRestaurants } = useContext(RestaurantContext);
    const [restaurant, setRestaurant] = useState(restaurants.filter(restau => restau.restaurantID === props.restaurant.restaurantID)[0]);
    const [moyenneAvis, setMoyenneAvis] = useState(restaurant.average);
    const [avis, setAvis] = useState("Insérer un nouveau commentaire");
    const [note, setNote] = useState(1);

    const [displayDetails, setDisplayDetails] = useState(false)

    var imgSrc = "https://maps.googleapis.com/maps/api/streetview?size=312x240&location=" + restaurant.lat + "," + restaurant.long + "&heading=151.78&pitch=-0.76&key=AIzaSyBbXlKpycaKnkWqib5h17gluphKw_nLENs";

    const addCommentToJson = (commentaire, restaurant) => {
        if (commentaire !== "Insérer un nouveau commentaire") {
            var restaurantSelect = restaurants.filter(feature => feature.restaurantID === restaurant.restaurantID);
            var newAvis = {};
            newAvis.stars = note;
            newAvis.comment = commentaire;
            restaurantSelect[0].ratings.push(newAvis);

            setRestaurant({ ...restaurant, restaurant: restaurantSelect[0] });
            setAvis("Insérer un nouveau commentaire");
            document.getElementsByClassName("textCommentaire")[0].style.color = "grey";
            moyenneNote(restaurant);
        }
    }

    const resetInput = (e) => {
        e.target.style.color = "white";
        e.target.value = "";
    }

    const handleMinChange = (e) => {
        setNote(parseInt(e.target.value));
    }
    useEffect(() => {
        setNote(note);
    }, [note])

    const moyenneNote = (restaurant) => {
        let ratingsLength = restaurant.ratings.length;
        restaurant.average = 0;
        restaurant.ratings.map(note =>
            restaurant.average += note.stars
        );
        let moyenne = restaurant.average / ratingsLength;
        restaurant.average = parseFloat(moyenne.toFixed(1));
        setMoyenneAvis(restaurant.average);

        let tmpRestaurants = restaurants;
        tmpRestaurants.map(restau =>
            restau.restaurantID === restaurant.restaurantID ?
                restau = restaurant : null
        )
        updateRestaurants(tmpRestaurants);
    }

    useEffect(() => {
        updateRestaurants(restaurants);
    }, [])

    return (
        <div className="details">
            <div className="detailsRestaurant">
                <img className="imgRestaurantDetails" src={imgSrc} alt=""></img>
                <div className="infoRestaurantDetails">
                    <h2>{restaurant.restaurantName}</h2>
                    <div className="moyenneAvis">
                        <span className="moyenneAvisText">{moyenneAvis}</span>
                        <img className="etoileAvis" src="etoile.png" alt="Etoile des avis"></img>
                        <span className="nbRatings">{restaurant.ratings.length} avis</span>
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
                <input type="text" className="textCommentaire" name="Commentaire" value={avis} onClick={resetInput} onChange={(e) => setAvis(e.target.value)}></input>
                <input type="submit" className="btnAjoutCommentaire" value="→" onClick={() => addCommentToJson(avis, restaurant)}></input>
            </div>
        </div>
    );
}

export default CardDetails;