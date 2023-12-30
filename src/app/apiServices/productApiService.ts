import axios from "axios";
import { serverApi } from "../../lib/config";
import { ProductSearchObj } from "../types/others";
import { Definer } from "../../lib/Definer";
import { Product } from "../types/product";
import assert from "assert";


class ProductApiService {
    private readonly path: string
    constructor() {
        this.path = serverApi
    }

    async getTargetProducts(data: ProductSearchObj): Promise<Product[]> {
        try {
            const url = `${this.path}/products`,
                result = await axios.post(url, data, { withCredentials: true });
            console.log("state", result.data.state)
            assert.ok(result?.data, Definer.general_err1)
            const products: Product[] = result.data.data;
            return products;
        } catch (err: any) {
            console.log(`ERROR::: getTargetProducts ${err.message}`)
            throw err;
        }
    }

    async getChosenProduct(product_id: string): Promise<Product> {
        try {
            const url = `${serverApi}/products/${product_id}`,
                product_result = await axios.get(url, { withCredentials: true });
            const chosenProduct: Product = product_result.data.data
                console.log("chosenProduct::", url)
            return chosenProduct;
        } catch (err: any) {
            console.log(`ERROR::: ${err.message}`)
            throw err
        }
    }
}

export default ProductApiService