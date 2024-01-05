import { BoArticle } from "./boArticle";
import { Follower, Following } from "./follow";
import { Order } from "./order";
import { Product } from "./product";
import { Member, Restaurant } from "./user";

//APP state 
export interface AppRootState {
    homePage: HomePageState;
    restaurantPage: RestaurantPageState;
    orderPage: OrderPageState,
    communityPage: CommunityPageState;
    memberPage: MemberPageState;

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
//Orders Page
export interface OrderPageState {
    pausedOrders: Order[];
    processOrders: Order[];
    finishedOrders: Order[];
}

//Community Page
export interface CommunityPageState {
    targetBoArticles: BoArticle[]
}

//Member Page
export interface MemberPageState {
    chosenMember: Member | null;
    chosenMemberBoArticles: BoArticle[];
    chosenSingleBoArticle: BoArticle | null;
    memberFollowers: Follower[];
    memberFollowing: Following[];
}