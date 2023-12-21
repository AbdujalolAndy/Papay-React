import { BoArticle } from "./boArticle";
import { Product } from "./product";
import { Restaurant } from "./user";

export interface AppRootState {
    homePage: HomePageState;
}

export interface HomePageState {
    topRestaurants: Restaurant[];
    bestRestaurant: Restaurant[];
    trendProducts: Product[];
    bestBoArticles: BoArticle[];
    trendBoArticles: BoArticle[];
    newsBoArticles: BoArticle[];
}