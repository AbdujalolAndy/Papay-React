import axios from "axios"
import { serverApi } from "../../lib/config"
import { BoArticle, SearchBoArticle } from "../types/boArticle"
import assert from "assert"
import { Definer } from "../../lib/Definer"

class BoArticlesApiService {
    private readonly path: string
    constructor() {
        this.path = serverApi
    }

    async getBoArticles(data: SearchBoArticle): Promise<BoArticle[]> {
        try {
            let url = `${this.path}/community/target?bo_id=${data.bo_id}&page=${data.page}&limit=${data.limit}`
            if (data.order) {
                url += `&order=${data.order}`
            }
            const result = await axios.get(url, { withCredentials: true });
            console.log("state::", result.data.state);
            assert.ok(result?.data, Definer.general_err1)
            assert.ok(result?.data?.state != "fail", result?.data?.message)
            const boArticles: BoArticle[] = result.data.data;
            return boArticles
        }
        catch (err: any) {
            throw err
        }
    }
    async boArticlesLikeTarget(data: any): Promise<any> {
        try {
            const url = `${this.path}/member-liken`,
                result = await axios.post(url, data, { withCredentials: true });
            console.log("state::", result.data.state);
            assert.ok(result?.data, Definer.general_err1)
            assert.ok(result?.data?.state != "fail", result?.data?.message)
            return result
        } catch (err: any) {
            throw err
        }
    }
}

export default BoArticlesApiService