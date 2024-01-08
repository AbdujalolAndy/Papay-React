import axios from "axios";
import { serverApi } from "../../lib/config";
import { FollowSearchObj, Follower, Following } from "../types/follow";
import assert from "assert";
import { Definer } from "../../lib/Definer";

class FollowApiService {
    private readonly path: string
    constructor() {
        this.path = serverApi
    }

    async getMemberFollowers(data: FollowSearchObj): Promise<Follower[]> {
        try {
            const url = `${this.path}/follow/followers?page=${data.page}&limit=${data.limit}&mb_id=${data.mb_id}`;
            const result = await axios.get(url, { withCredentials: true });
            console.log("getMemberFollowers state:::", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.data, result?.data.message);
            const followers: Follower[] = result.data.data;
            return followers
        } catch (err: any) {
            console.log(`ERROR::: getMemberFollowers ${err.message}`);
            throw err
        }
    }
    async getMemberFollowings(data: FollowSearchObj): Promise<Following[]> {
        try {
            const url = `${this.path}/follow/followings?page=${data.page}&limit=${data.limit}&mb_id=${data.mb_id}`;
            const result = await axios.get(url, { withCredentials: true });
            console.log("getMemberFollowers state:::", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.data, result?.data.message);
            const following: Following[] = result.data.data;
            return following
        } catch (err: any) {
            console.log(`ERROR::: getMemberFollowings ${err.message}`);
            throw err
        }
    }

    async subscribe(mb_id: string): Promise<boolean> {
        try {
            const url = `${this.path}/follow/subscribe`;
            const result = await axios.post(url, { mb_id: mb_id }, { withCredentials: true });
            console.log("getMemberFollowers state:::", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.data, result?.data.message);
            return !!result.data.data;
        } catch (err: any) {
            console.log(`ERROR::: subscribe ${err.message}`);
            throw err
        }
    }
    async unsubscribe(mb_id: string): Promise<boolean> {
        try {
            const url = `${this.path}/follow/unsubscribe`;
            const result = await axios.post(url, { mb_id: mb_id }, { withCredentials: true });
            console.log("getMemberFollowers state:::", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.data, result?.data.message);
            return !!result.data.data;
        } catch (err: any) {
            console.log(`ERROR::: unsubscribe ${err.message}`);
            throw err
        }
    }
}

export default FollowApiService;