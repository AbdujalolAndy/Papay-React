import React, { useEffect } from "react"
import { Statistics } from './statistics';
import { TopRestaurants } from "./topRestaurants";
import { BestRestaurants } from "./bestRestaurants";
import { BestDishes } from "./bestDishes";
import { Advertisements } from "./advertisements";
import { Events } from './events';
import { Recommmendations } from './recommendations';
import "../../../css/home.css"

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setTopRestaurants } from "./slice";
import { retrieveTopRestaurants, retrieveBestRestaurants } from "./selector";
import { Restaurant } from "../../types/user";
import RestaurantApiService from "../../apiServices/restaurantApiService";

// REDUX SLICE
const actionDispatch = (dispatch: Dispatch) => ({
    setTopRestaurants: (data: Restaurant[]) => dispatch(setTopRestaurants(data))
})


export function HomePage() {
    //Initialize
    const { setTopRestaurants } = actionDispatch(useDispatch());
    //selcetor: store=>data
    useEffect(() => {
        //Backend share data using database

        const topRestaurants = new RestaurantApiService();
        topRestaurants
            .getTopRestaurants()
            .then((data) => {
                setTopRestaurants(data)
            }).catch(err => { })

        //slice: data => save to redux store

    }, [])
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