import axios from "axios";
import { serverApi } from "../../lib/config"
import assert from "assert"
import { Definer } from "../../lib/Definer";
import { Member, Restaurant } from "../types/user";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../lib/sweetAlert";
import { MemberLiken } from "../types/others";

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
    async logoutRequest(): Promise<any> {
        try {
            const url = `${this.path}/logout`;
            const result = await axios.get(url, { withCredentials: true });
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state !== "fail", result?.data?.message);
            const logout_result = result.data.state
            return logout_result === "success"
        } catch (err: any) {
            console.log(`ERROR::: logoutRequest ${err.message}`);
            throw err
        }
    }
    async memberLikeTarget(data: any) {
        try {
            const result = await axios.post(this.path + "/member-liken", data, { withCredentials: true })
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state != "fail", result.data.message);
            console.log("Like_result:::", result)
            const result_like:MemberLiken = result.data.data;
            return result_like
        } catch (err: any) {
            console.log(`ERROR::: memberLikeTarget ${err.message}`);
            throw err
        }
    }
}

export default MemberApiService;