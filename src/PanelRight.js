import React, {useState} from "react";
import "./PanelRight.css";
import List from "./List";

const PanelRight = props => {
    return(
        <div>
            <div className="sectionTitre">
                <div className="titreSite"><a href="" className="titre">Restaurants</a></div>
                <div className="filtreAvis">
                    <input type="number" id="inputMin" min="1" max="5" step="1" value="1"></input>
                    <span>à</span>
                    <input type="number" id="inputMax" min="1" max="5" step="1" value="5"></input>
                    <span>étoiles</span>
                </div>
            </div>
            <List/>
        </div>
    );
}

export default PanelRight;