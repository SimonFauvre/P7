import React, {useState, useEffect, useContext} from "react";
import "../style/PanelRight.css";
import * as restaurantData from "../data/restaurant.json";
import List from "./List";
import RestaurantContext from "./RestaurantContext";

const PanelRight = props => {

    const {restaurants, updateRestaurants} = useContext(RestaurantContext);

    const [noteMin, setNoteMin] = useState(1);
    const [noteMax, setNoteMax] = useState(5);

    const handleMinChange = (e) => {
        setNoteMin(parseInt(e.target.value));
    }
    useEffect(() => {
      setNoteMin(noteMin);
      setNoteMax(noteMax);
      filterDatas();
    },[noteMin,noteMax])

    const handleMaxChange = (e) => {
        setNoteMax(parseInt(e.target.value));
    }

    const filterDatas = () => {
        updateRestaurants(restaurantData.default.features
            .filter(restaurant => restaurant.average >= noteMin && restaurant.average <= noteMax));
    }
    useEffect(() => {
        updateRestaurants(restaurants);
    },[restaurants])

    return (
        <div>
            <div className="sectionTitre">
                <div className="titreSite"><a href="" className="titre">Restaurants</a></div>
                <div className="filtreAvis">
                    <select id="select-min" value={noteMin} onChange={e => handleMinChange(e)}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <span>à</span>
                    <select id="select-max" value={noteMax} onChange={e => handleMaxChange(e)}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <span>étoiles</span>
                </div>
            </div>
            <List valueMin={noteMin} valueMax={noteMax}/>
        </div>
    )
}

export default PanelRight;