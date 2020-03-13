import React, {useState} from "react";
import "./PanelRight.css";
import * as restaurantData from "./data/restaurant.json";
import List from "./List";

const PanelRight = props => {
    const [valueMin, setValueMin] = useState(["1", "2", "3", "4", "5"]);
    const [valueMax, setValueMax] = useState(["1", "2", "3", "4", "5"]);
    const [valMin, setValMin] = useState(1);
    const [valMax, setValMax] = useState(5);

    const AddMin = valueMin.map(AddMin => AddMin);
    const AddMax = valueMax.map(AddMax => AddMax);

    const moyenneAvis = (restaurant) => {
        var restaurantSelect = restaurantData.features.filter(feature => feature.restaurantID === restaurant.restaurantID);
        const totalStars = restaurant.ratings.map(rating => rating.stars).reduce((previousValue, currentValue, index, array) => {
            var value = index + 1 === array.length ? (previousValue + currentValue) / array.length : previousValue + currentValue;
            restaurantSelect[0].average = parseFloat(value.toFixed(1));
            return value;
        });
        restaurantSelect[0].average = parseFloat(totalStars.toFixed(1));
    }

    const defineDisplay = (restaurant) => {
        var restaurantSelect = restaurantData.features.filter(feature => feature.restaurantID === restaurant.restaurantID);
        restaurantSelect[0].display = false;
    }

    const defineDisplayDetails = (restaurant) => {
        var restaurantSelect = restaurantData.features.filter(feature => feature.restaurantID === restaurant.restaurantID);
        restaurantSelect[0].displayDetails = false;
    }

    {restaurantData.features.map(restaurant => (
        moyenneAvis(restaurant),
        defineDisplay(restaurant),
        defineDisplayDetails(restaurant)
    ))}
    
    var restaurantDisplay = restaurantData.features;

    const handleMinChange = (e) => {
        console.log("valueMin[e.target.value] : ", valueMin[e.target.value]);
        setValMin(valueMin[e.target.value]);
    }

    const handleMaxChange = (e) => {
        console.log("valueMax[e.target.value] : ", valueMax[e.target.value]);
        setValMax(valueMax[e.target.value]);
    }

    const filterDatas = () => {
        return restaurantData.features.filter(feature => feature.average >= valMin && feature.average <= valMax);
    }

    return (
        <div>
            <div className="sectionTitre">
                <div className="titreSite"><a href="" className="titre">Restaurants</a></div>
                <div className="filtreAvis">
                    <select id="select-min" onChange={e => handleMinChange(e)}>
                        {AddMin.map((number, key) => <option key={key} value={key}>{number}</option>)}
                    </select>
                    <span>à</span>
                    <select id="select-max" onChange={e => handleMaxChange(e)}>
                        {AddMax.map((number, key) => <option key={key} value={key} selected="5">{number}</option>)}
                    </select>
                    <span>étoiles</span>
                </div>
            </div>
            <List valueMin={valMin} valueMax={valMax} restaurantDisplay={filterDatas()}/>
        </div>
    )
}

export default PanelRight;