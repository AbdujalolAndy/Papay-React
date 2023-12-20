import React, { useEffect } from "react"
import { Statistics } from './statistics';
import { TopRestaurants } from "./topRestaurants";
import { BestRestaurants } from "./bestRestaurants";
import { BestDishes } from "./bestDishes";
import { Advertisements } from "./advertisements";
import { Events } from './events';
import { Recommmendations } from './recommendations';
import "../../../css/home.css"


export function HomePage() {
    useEffect(() => {
        console.log("ran componentDidMount");
        return () =>{
            console.log("ran componentWillUnMount")
        }
    })
    return (
        <div className="homePage">
            <Statistics />
            <TopRestaurants />
            <BestRestaurants />
            <BestDishes />
            <Advertisements />
            <Events />
            <Recommmendations />
        </div >
    )
}