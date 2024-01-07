import axios from "axios"
import { serverApi } from "../../lib/config"
import { BoArticle, SearchBoArticle, SearchMemberArticleObj } from "../types/boArticle"
import assert from "assert"
import { Definer } from "../../lib/Definer"

class CommunityApiService {
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

    async chosenMemberCommunityArticles(data: SearchMemberArticleObj) {
        try {
            const url = `${this.path}/community/articles?mb_id=${data.mb_id}&page=${data.page}&limit=${data.limit}`;
            const result = await axios.get(url, { withCredentials: true });
            console.log("chosenMemberCommunityArticles state::", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.data, result?.data.message);
            const articles: BoArticle[] = result.data.data;
            return articles
        } catch (err: any) {
            console.log(`Error::: chosenMemberCommunityArticles, ${err.message}`)
            throw err
        }
    }
    async chosenSingleBoArticle(id: string) {
        try {
            const url = `${this.path}/community/single-article/${id}`;
            const result = await axios.get(url, { withCredentials: true });
            console.log("chosenSingleBoArticle state::", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.data, result?.data.message);
            const article: BoArticle = result.data.data;
            return article
        } catch (err: any) {
            console.log(`Error::: chosenMemberCommunityArticles, ${err.message}`)
            throw err
        }
    }
}

export default CommunityApiService