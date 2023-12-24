import axios from "axios";
import { serverApi } from "../../lib/config"
import assert from "assert"
import { Definer } from "../../lib/Definer";
import { Member, Restaurant } from "../types/user";

class MemberApiService {
    private readonly path: string
    constructor() {
        this.path = serverApi
    }

    async loginRequest(data: any): Promise<Member> {
        try {
            const url = `${this.path}/login`,
                result = await axios.post(url, data, { withCredentials: true });
            assert.ok(result?.data?.state != "fail", result?.data?.message);

            const member: Member = result.data.data;
            localStorage.setItem("member_data", JSON.stringify(member));
            return member
        } catch (err: any) {
            console.log(`ERROR::: loginRequest ${err.message}`);
            throw err
        }
    }

    async signupRequest(signUpData: any): Promise<Member> {
        try {
            const url = `${this.path}/signup`,
                result = await axios.post(url, signUpData, { withCredentials: true })
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state != "fail", result?.data?.message)
            const new_member: Member = result.data.data;
            localStorage.setItem("member_data", JSON.stringify(new_member))
            return new_member
        } catch (err: any) {
            console.log(`ERROR::: signupRequest ${err.message}`);
            throw err
        }
    }
}

export default MemberApiService;