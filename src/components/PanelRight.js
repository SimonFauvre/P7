import React, {useState, useEffect, useContext} from "react";
import "../style/PanelRight.css";
import List from "./List";
import RestaurantContext from "./RestaurantContext";

const PanelRight = props => {

    const {restaurants, updateRestaurants} = useContext(RestaurantContext);
    const {tmpRestaurants, updateTmpRestaurants} = useContext(RestaurantContext);

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
        if (restaurants) {
            updateTmpRestaurants(
                restaurants.filter(restaurant => {
                    if (restaurant.average === null && noteMin === 1 && noteMax === 5) {
                        return restaurant
                    } else if (restaurant.average >= noteMin && restaurant.average <= noteMax) {
                        return restaurant
                    }
                }));
        }
    }

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