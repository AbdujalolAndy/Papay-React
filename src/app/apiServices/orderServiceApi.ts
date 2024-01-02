import axios from "axios";
import { serverApi } from "../../lib/config"
import { CartItem } from "../types/others";
import { Definer } from "../../lib/Definer";
import assert from "assert"

class OrderServiceApi {
    private readonly path: string;
    constructor() {
        this.path = serverApi
    }

    async createOrder(data: CartItem): Promise<any> {
        try {
            const url = `${this.path}/orders/create`,
                result = await axios.post(url, data, { withCredentials: true });
            console.log("CreateOrder state::", result.data.state);
            assert.ok(result?.data, Definer.general_err1)
            assert.ok(result?.data?.state != "fail", result?.data?.message)
            const cartItem: CartItem = result.data.data;
            return cartItem
        } catch (err: any) {
            console.log(`ERROR::: createOrder ${err.message}`)
        }
    }
}
