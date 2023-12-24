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
            assert.ok(result, Definer.general_err1);
            console.log("result of getTopRestaurants::", result.data)
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
            assert.ok(result, Definer.general_err1);
            console.log("result of getRestaurants::", result.data)
            const top_restaurants: Restaurant[] = result.data.data;
            return top_restaurants
        } catch (err: any) {
            console.log(`ERROR::: getRestaurants ${err.message}`);
            throw err
        }
    }
}

export default RestaurantApiService
