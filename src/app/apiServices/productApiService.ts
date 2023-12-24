import axios from "axios";
import asset from "assert";
import { serverApi } from "../../lib/config";
import { ProductSearchObj } from "../types/others";
import { Definer } from "../../lib/Definer";
import { Product } from "../types/product";


class ProductApiServvice {
    private readonly path: string
    constructor() {
        this.path = serverApi
    }

    async getTargetProducts(data: ProductSearchObj):Promise<Product[]> {
        try {
            const url = `${this.path}/products`,
                result = await axios.post(url, data, { withCredentials: true });
            asset.ok(result, Definer.general_err1);
            console.log("state", result.data.state)
            const products: Product[] = result.data.data;
            return products;
        } catch (err: any) {
            console.log(`ERROR::: getTargetProducts ${err.message}`)
            throw err;
        }
    }
}

export default ProductApiServvice