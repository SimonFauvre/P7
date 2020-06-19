import React, { useState, useEffect, useContext } from "react";
import "../style/Card.css";
import CardDetails from "./Card_Details";
import RestaurantContext from "./RestaurantContext";

const Card = props => {

    const { restaurants, updateRestaurants } = useContext(RestaurantContext);
    const [restaurant, setRestaurant] = useState(restaurants.filter(restau => restau.restaurantID === props.restaurantID)[0]);
    const [alreadyGet, setAlreadyGet] = useState(false);

    // Agit sur le state et pas la props
    const changeDisplayDetails = (e) => {
        if (e.target.className !== "selectNote" && e.target.className !== "textCommentaire" && e.target.className !== "btnAjoutCommentaire") {
            setRestaurant({ ...restaurant, displayDetails: !restaurant.displayDetails });

            let tmpRestaurants = restaurants;
            tmpRestaurants.map(restau =>
                restau.restaurantID === restaurant.restaurantID ? restau.displayDetails = !restaurant.displayDetails : false
            )
            
            if (!alreadyGet) {
                getRatingsRestaurant(restaurant);
                setAlreadyGet(true);
            }
            updateRestaurants(tmpRestaurants);
        }
    }

    const getRatingsRestaurant = (restaurant) => {
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${restaurant.restaurantID}&fields=name,rating,reviews,geometry,formatted_address,photos,place_id&key=AIzaSyA1j6BRMbbmh3M1qFh9jGzbFAa5NxGVbHI`)
        .then((res) => res.json())
        .then(data => transformDatas(data))
        .then(data => {
            console.log(data)
            updateRestaurants([...restaurants])
        })
        .catch((err) => console.log(err))
    }

    const transformDatas = (data) => {    
        let restaurantTransform = []
        let dataReviews = data.result.reviews
        let tmpRestaurant = restaurant

        dataReviews.map(review => {
            let tmpReview = {}
            tmpReview.stars = review.rating
            tmpReview.comment = review.text
            tmpRestaurant.ratings.push(tmpReview)
        })
        
        restaurantTransform.push(tmpRestaurant)
        return tmpRestaurant
    }

    useEffect(() => {
        updateRestaurants(restaurants);
    })

    return (
        <div className="card">
            <li
                key={restaurant.restaurantID}
                className="itemList"
                id={"restaurant-" + restaurant.restaurantID}
                onClick={changeDisplayDetails}>
                {restaurants.filter(restau => restau.restaurantID === props.restaurantID)[0].displayDetails ?
                    <CardDetails restaurant={restaurant} /> :
                    <div className="cardRestaurant">
                        <img className="imgRestaurant" src={restaurant.img} alt="Le restaurant"></img>
                        <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                            <h2>{restaurant.restaurantName}</h2>
                            <div className="moyenneAvis">
                                <span className="moyenneAvisText">
                                    {restaurants.filter(restau => restau.restaurantID === props.restaurantID)[0].average}
                                </span>
                                <img src="etoile.png" className="etoileAvis" alt="Etoile des avis"></img>
                                <span className="nbRatings">{restaurant.ratingsTotal} avis</span>
                            </div>
                            <div className="adresse">{restaurant.address}</div>
                        </div>
                    </div>}
            </li>
        </div>
    );
}

export default Card;