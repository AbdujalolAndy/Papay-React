import axios from "axios";
import { serverApi } from "../../lib/config"
import { CartItem } from "../types/others";
import { Definer } from "../../lib/Definer";
import assert from "assert"
import { Order } from "../types/order";

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
            const order: any = result.data.data;
            return true
        } catch (err: any) {
            console.log(`ERROR::: createOrder ${err.message}`)
        }
    }

    async getMyOrders(order_status: string): Promise<Order[]> {
        try {
            const url = `${this.path}/orders?status=${order_status}`,
                result = await axios.get(url, { withCredentials: true });
            console.log("GetMyOrders state::", result.data.state);
            assert.ok(result?.data, Definer.general_err1)
            assert.ok(result?.data?.state != "fail", result?.data?.message)
            const order: Order[] = result.data.data;
            return order
        } catch (err: any) {
            console.log(`ERROR::: getMyOrders ${err.message}`)
            throw err
        }
    }

    async updateOrderStatus(data: any): Promise<Order> {
        try {
            const url = `${serverApi}/orders/edit`,
                result = await axios.post(url, data, { withCredentials: true })
            console.log("UpdateOrderStatus state::", result.data.state);
            assert.ok(result?.data, Definer.general_err1)
            assert.ok(result?.data?.state != "fail", result?.data?.message)
            const order: Order = result.data.data;
            return order
        } catch (err: any) {
            console.log(`ERROR::: updateOrderStatus ${err.message}`)
            throw err
        }
    }
}

export default OrderServiceApi;
