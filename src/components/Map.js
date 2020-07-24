import React, { useState, useContext, useEffect } from 'react'
import '../style/App.css'
import '../style/Map.css'
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'
import mapStyle from "../style/mapStyle.js"
import RestaurantContext from "./RestaurantContext"

const Map = props => {

  const { restaurants, updateRestaurants, handleMarkerClick } = useContext(RestaurantContext)
  const { tmpRestaurants, setUpdateTmpRestaurants } = useContext(RestaurantContext);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [center, setCenter] = useState({lat: null, lng: null})
  const [addResto, setAddResto] = useState(false)

  useEffect(() => {
    setCenter(props.location)
  }, [props.location])

  const [tmpLocRestaurant, setTmpLocRestaurant] = useState({lat: null, lng: null})

  const clickMap = (event) => {
    setAddResto(true)
    setTmpLocRestaurant({lat: event.latLng.lat(), lng: event.latLng.lng()})
  }

  const addRestaurant = (name, address, stars, comment) => {
    let tmpResto = {}
    tmpResto.restaurantID = name + '-ID'
    tmpResto.restaurantName = name
    tmpResto.address = address
    tmpResto.lat = tmpLocRestaurant.lat
    tmpResto.lng = tmpLocRestaurant.lng
    tmpResto.ratings = [{
      comment: comment,
      stars: stars
    }]
    tmpResto.average = stars
    tmpResto.ratingsTotal = 1
    tmpResto.img = '/logo_resto.png'

    updateRestaurants([...restaurants, tmpResto])
    setUpdateTmpRestaurants([...tmpRestaurants, tmpResto])

    setAddResto(false)
    setNom('')
    setAdresse('')
    setNote(1)
    setAvis('')
  }

  const dragMap = () => {
    props.fetchRestaurants(map.getCenter().lat(), map.getCenter().lng())
  }

  const [map, setMap] = useState()

  const test = (e) => {
    setMap(e)
  }

  const onClickMarkerRestaurant = (restaurant, open) => {
    handleMarkerClick(restaurant.restaurantID, open)
    open === true ? setSelectedRestaurant(restaurant) : setSelectedRestaurant(null)
    setSelectedLocation(null)
  }

  const initMap = () => {
    return (
    <GoogleMap
      ref={test}
      onDragEnd={dragMap} 
      onClick={(event) => clickMap(event)}
      defaultZoom={15}
      defaultCenter={{ lat: 45.764042, lng: 4.835659 }}
      center={center}
      defaultOptions={{
        styles: mapStyle,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          style: window.google.maps.ZoomControlStyle.SMALL,
        },
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: window.google.maps.ControlPosition.TOP_RIGHT
        }
      }}>
      {/* Marker Utilisateur */}
      <Marker
        position={center}
        animation={window.google.maps.Animation.DROP}
        onClick={() => {
          setSelectedLocation(center);
          setSelectedRestaurant(null);
        }}
        icon={{
          url: "/here.png",
          scaledSize: new window.google.maps.Size(20, 20)
        }} />

      {/* InfoWindow Utilisateur */}
      {selectedLocation && (
        <InfoWindow
          position={center}
          options={{ pixelOffset: new window.google.maps.Size(0, -20) }}
          onCloseClick={() => {
            setSelectedLocation(null);
          }}>
          <div>
            <h2 style={{ fontSize: "14px" }}>Vous êtes ici</h2>
          </div>
        </InfoWindow>
      )}

      {/* Marker Restaurant */}
      {restaurants.map(restaurant => (
        <Marker
          onClick={() => onClickMarkerRestaurant(restaurant, true)}
          animation={window.google.maps.Animation.DROP}
          key={restaurant.restaurantID}
          position={{ lat: restaurant.lat, lng: restaurant.lng }}
          icon={{
            url: "/logo_resto.png",
            scaledSize: new window.google.maps.Size(30, 30)
          }} />
      ))}

      {/* InfoWindow Restaurant */}
      {selectedRestaurant && (
        <InfoWindow
          position={{ lat: selectedRestaurant.lat, lng: selectedRestaurant.lng }}
          onCloseClick={() => onClickMarkerRestaurant(selectedRestaurant, false)}
          options={{ pixelOffset: new window.google.maps.Size(0, -30) }}>
          <div>
            <h2 style={{ fontSize: 14 }}>{selectedRestaurant.restaurantName}</h2>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
    )
  }

  const [avis, setAvis] = useState('')
  const [note, setNote] = useState(1)
  const [nom, setNom] = useState('')
  const [adresse, setAdresse] = useState('')

  return (
    <div>
      {initMap()}
      {addResto ? 
        <div className='addResto'>
          <h3>Ajouter un restaurant</h3>
          <div className='inputNom'>
            <div>Nom du restaurant</div>
            <input type="text" className="textNomRestaurant" name="Nom du restaurant" placeholder='Le Fourvière' value={nom} onChange={(e) => {setNom(e.target.value); e.target.style.color = "white"}}></input>
          </div>
          <div lassName='inputAdresse'>
            <div>Adresse</div>
            <input type="text" className="textAdresse" name="Adresse" placeholder='8 place de Fourvière, Lyon' value={adresse} onChange={(e) => {setAdresse(e.target.value); e.target.style.color = "white"}}></input>
          </div>
          <div className="newComment">
                <select className="selectNote" id="selectNote" value={note} onChange={e => setNote(parseInt(e.target.value))}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <input type="text" className="textCommentaire" name="Commentaire" placeholder='Insérer un nouveau commentaire' value={avis} onChange={(e) => {setAvis(e.target.value); e.target.style.color = "white"}}></input>
            </div>
            <input type="submit" className="btnAjoutRestaurant" value="Ajouter" onClick={() => addRestaurant(nom, adresse, note, avis)}></input>
        </div> 
        : null}
    </div>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));
export default WrappedMap;