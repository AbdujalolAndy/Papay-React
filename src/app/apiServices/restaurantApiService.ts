import assert from "assert"
import axios from "axios"
import { serverApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { Restaurant } from "../types/user";
import { SearchObj } from "../types/others";

class RestaurantApiService {
    private readonly path: string
    constructor() {
        this.path = serverApi
    }

    async getTopRestaurants(): Promise<Restaurant[]> {
        try {
            const url: string = "/restaurants?order=top&page=1&limit=4",
                result = await axios.get(this.path + url, { withCredentials: true })
            console.log("GetTopRestaurants state::", result.data.state);
            assert.ok(result?.data, Definer.general_err1)
            assert.ok(result?.data?.state != "fail", result?.data?.message)
            const top_restaurants: Restaurant[] = result.data.data;
            return top_restaurants
        } catch (err: any) {
            console.log(`ERROR::: getTopRestaurants ${err.message}`);
            throw err
        }
    }
    async getRestaurants(data: SearchObj): Promise<Restaurant[]> {
        try {
            const url: string = `/restaurants?order=${data.order}&page=${data.page}&limit=${data.limit}`,
                result = await axios.get(this.path + url, { withCredentials: true })
            console.log("GetRestaurants state::", result.data.state);
            assert.ok(result?.data, Definer.general_err1)
            assert.ok(result?.data?.state != "fail", result?.data?.message)
            const top_restaurants: Restaurant[] = result.data.data;
            return top_restaurants
        } catch (err: any) {
            console.log(`ERROR::: getRestaurants ${err.message}`);
            throw err
        }
    }

    async chosenRestaurant(id: string): Promise<Restaurant> {
        try {
            const url = `${serverApi}/restaurants/${id}`,
                result = await axios.get(url, { withCredentials: true })
            console.log("chosenRestaurant state::", result.data.state);
            assert.ok(result?.data, Definer.general_err1)
            assert.ok(result?.data?.state != "fail", result?.data?.message)
            const chosenResturant: Restaurant = result.data.data;
            return chosenResturant
        } catch (err: any) {
            console.log(`ERROR::: chosenRestaurant ${err.message}`)
            throw err
        }
    }
}

export default RestaurantApiService
