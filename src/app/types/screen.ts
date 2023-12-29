import { BoArticle } from "./boArticle";
import { Product } from "./product";
import { Restaurant } from "./user";

//APP state 
export interface AppRootState {
    homePage: HomePageState;
    restaurantPage: RestaurantPageState;
}

//Home Page
export interface HomePageState {
    topRestaurants: Restaurant[];
    bestRestaurants: Restaurant[];
    trendProducts: Product[];
    bestBoArticles: BoArticle[];
    trendBoArticles: BoArticle[];
    newsBoArticles: BoArticle[];
}

//Restaurant Page
export interface RestaurantPageState {
    targetRestaurants: Restaurant[],
    randomRestaurants: Restaurant[],
    chosenRestaurant: Restaurant | null,
    targetProducts: Product[];
    chosenProduct: Product | null
}