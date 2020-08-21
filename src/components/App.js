import React, { useState, useEffect } from "react";
import "../style/PanelRight.css";
import WrappedMap from "./Map";
import PanelRight from "./PanelRight";
import RestaurantsContext from "./RestaurantContext";

const App = () => {

  const [restaurants, setRestaurants] = useState([])
  const [tmpRestaurants, setTmpRestaurants] = useState([])
  const [location, setLocation] = useState({lat: null, lng: null})
  const [errorGeolocation, setErrorGeolocation] = useState(false)

  // Cette fonction mutate le state de App.js et est passée à la Map
  const handleMarkerClick = (id, open) => {
    let selectedRestaurant
    const tmpRestaurants = restaurants.map(restaurant => {
      if (restaurant.restaurantID === id) {
        selectedRestaurant = restaurant
        if (open) {
          restaurant.displayDetails = true
        } else {
          restaurant.displayDetails = false
        }
        return restaurant
      } else {
        restaurant.displayDetails = false
        return restaurant
      }
    })
    setRestaurants(tmpRestaurants)
    setTmpRestaurants(tmpRestaurants)

    fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,rating,reviews,geometry,formatted_address,photos,place_id&key=AIzaSyA1j6BRMbbmh3M1qFh9jGzbFAa5NxGVbHI`)
      .then((res) => res.json())
      .then(data => transformAvis(data, selectedRestaurant))
      .then(data => {
        setTmpRestaurants([...tmpRestaurants])
      })
      .catch((err) => console.log(err))
  }

  const transformAvis = (data, selectedRestaurant) => { 
    if (data.result.reviews) {
        let restaurantTransform = []
        let dataReviews = data.result.reviews
        let tmp = selectedRestaurant

        dataReviews.map(review => {
            let tmpReview = {}
            tmpReview.stars = review.rating
            tmpReview.comment = review.text
            tmp.ratings.push(tmpReview)
        })
        
        restaurantTransform.push(tmp)
        return tmp
    } else {
        return null
    }
}

  // tmpRestaurants dans Restaurants
  const transformTmpToRestaurants = (tmp) => {

    setTmpRestaurants(tmp)
    let array = restaurants

    console.log(tmp)
    for (let j = 0; j < restaurants.length; j++) {
      for (let i = 0; i < tmpRestaurants.length; i++) {
        let elementTmp = tmpRestaurants[i]
        let elementRestaurant = restaurants[j]
        if (elementTmp.restaurantID === elementRestaurant.restaurantID) {
          array[j] = elementTmp
        }
      }
    }

    console.log(array)
    setRestaurants(array)
  }

  const contextValue = {
    restaurants: restaurants,
    updateRestaurants: setRestaurants,
    handleMarkerClick: handleMarkerClick,
    tmpRestaurants: tmpRestaurants,
    updateTmpRestaurants: transformTmpToRestaurants,
    setUpdateTmpRestaurants: setTmpRestaurants
  }

  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition(function(position) {
      let tmpLocation = {}
      tmpLocation.lat = position.coords.latitude
      tmpLocation.lng = position.coords.longitude

      setLocation(tmpLocation)

      fetchRestaurants(position.coords.latitude, position.coords.longitude)
      // fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude},${position.coords.longitude}&radius=1000&type=restaurant&key=AIzaSyA1j6BRMbbmh3M1qFh9jGzbFAa5NxGVbHI`)
      // .then((res) => res.json())
      // .then(data => transformDatas(data))
      // .then(data => {
      //   setRestaurants(data)
      //   setTmpRestaurants(data)
      // })
      // .catch((err) => console.log(err))
    }, errorPosition)

  }, [])

  const fetchRestaurants = (lat, lng) => {
    fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1000&type=restaurant&key=AIzaSyA1j6BRMbbmh3M1qFh9jGzbFAa5NxGVbHI`)
      .then((res) => res.json())
      .then(data => transformDatas(data))
      .then(data => {
        setRestaurants(data)
        setTmpRestaurants(data)
      })
      .catch((err) => console.log(err))
  }

  const errorPosition = (error) => {
    if (error) setErrorGeolocation(true)
  }

  const transformDatas = (datas) => {    
    let allRestaurantTransform = []    
    
    datas.results.map(data => {
      let tmpRestaurant = {}
      tmpRestaurant.restaurantID = data.place_id
      tmpRestaurant.restaurantName = data.name
      tmpRestaurant.address = data.vicinity
      tmpRestaurant.lat = data.geometry.location.lat
      tmpRestaurant.lng = data.geometry.location.lng

      tmpRestaurant.ratings = []
      
      if (data.rating) {
        tmpRestaurant.average = data.rating
      } else {
        tmpRestaurant.average = null
      }
        
      
      if (!data.user_ratings_total) {
        tmpRestaurant.ratingsTotal = 0
      } else {
        tmpRestaurant.ratingsTotal = data.user_ratings_total
      }
      
      if (data.photos) {
        if (data.photos.length > 0) {
          tmpRestaurant.img = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${data.photos[0].photo_reference}&key=AIzaSyA1j6BRMbbmh3M1qFh9jGzbFAa5NxGVbHI`
        } else {
          tmpRestaurant.img = '/logo_resto.png'
        }
      }
      else {
        tmpRestaurant.img = '/logo_resto.png'
      }
      
      allRestaurantTransform.push(tmpRestaurant)
    })

    return allRestaurantTransform
  }

  const moyenneAvis = (restaurant) => {
    var restaurantSelect = restaurants.filter(feature => feature.restaurantID === restaurant.restaurantID);
    const totalStars = restaurant.ratings.map(rating => rating.stars).reduce((previousValue, currentValue, index, array) => {
      var value = index + 1 === array.length ? (previousValue + currentValue) / array.length : previousValue + currentValue;
      restaurantSelect[0].average = parseFloat(value.toFixed(1));
      return value;
    });
    restaurantSelect[0].average = parseFloat(totalStars.toFixed(1));
  }

  return (
    <RestaurantsContext.Provider value={contextValue}>
      <div className="appCSS">
        <div className="map" style={{ width: '65vw', height: '100vh' }}>
          <WrappedMap googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBbXlKpycaKnkWqib5h17gluphKw_nLENs`}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
            handleMarkerClick={handleMarkerClick}
            location={location}
            transformDatas={transformDatas}
            fetchRestaurants={fetchRestaurants}
          />
        </div>
        <div style={{ width: '35vw', height: '100vh' }}>
          {errorGeolocation ? 
            <div>
              <img src='/localisation.jpg' style={{height: '200px', marginTop: '55%', marginLeft: '28%', marginRight: '20%'}}></img>
              <div style={{color: '#f5f8b3', textAlign: 'center', width: '265px', marginLeft: '25%', marginTop: '30px'}}>Veuillez activer la géolocalisation pour continuer d'utiliser l'application</div>
            </div> 
            : <div className="general">
              <PanelRight tmpRestaurants={restaurants}/>
            </div>}
        </div>
      </div>
    </RestaurantsContext.Provider>
  );
}

export default App;