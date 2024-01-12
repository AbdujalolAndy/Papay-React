import axios from "axios";
import { serverApi } from "../../lib/config"
import assert from "assert"
import { Definer } from "../../lib/Definer";
import { Member, UpdateMember, } from "../types/user";
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
            console.log("state::", result.data.state);
            assert.ok(result?.data, Definer.general_err1)
            assert.ok(result?.data?.state != "fail", result?.data?.message)
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
            console.log("SignupRequest state::", result.data.state);
            assert.ok(result?.data, Definer.general_err1)
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
            console.log("LogoutRequest state::", result.data.state);
            assert.ok(result?.data, Definer.general_err1)
            assert.ok(result?.data?.state != "fail", result?.data?.message)
            const logout_result = result.data.state
            return logout_result === "success"
        } catch (err: any) {
            console.log(`ERROR::: logoutRequest ${err.message}`);
            throw err
        }
    }
    async memberLikeTarget(data: any): Promise<MemberLiken> {
        try {
            const result = await axios.post(this.path + "/member-liken", data, { withCredentials: true })
            console.log("MemberLikeTarget state::", result.data.state);
            assert.ok(result?.data, Definer.general_err1)
            assert.ok(result?.data?.state != "fail", result?.data?.message)
            const result_like: MemberLiken = result.data.data;
            return result_like
        } catch (err: any) {
            console.log(`ERROR::: memberLikeTarget ${err.message}`);
            throw err
        }
    }

    async chosenMember(id: string): Promise<Member> {
        try {
            const url = `${this.path}/member/${id}`;
            const result = await axios.get(url, { withCredentials: true });
            console.log("chosenMember state:::", result.data.state);
            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.data, result?.data.message);
            const member: Member = result.data.data;
            return member
        } catch (err: any) {
            console.log(`Error::: chosenMember, ${err.message}`);
            throw err
        }
    }
    public async updateMemberData(data: UpdateMember) {
        try {
            let formData = new FormData();
            formData.append("mb_nick", data.mb_nick || "");
            formData.append("mb_phone", data.mb_phone || "");
            formData.append("mb_address", data.mb_address || "");
            formData.append("mb_description", data.mb_description || "");
            formData.append("mb_image", data.mb_image || "");

            const result = await axios(`${this.path}/member/update`, {
                method: "POST",
                data: formData,
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            assert.ok(result?.data, Definer.general_err1);
            assert.ok(result?.data?.state != "fail", result?.data?.message);
            console.log("state:", result.data.state);

            const member: Member = result.data.data;
            localStorage.setItem("member_data", JSON.stringify(member));
            return member;
        } catch (err: any) {
            console.log(`ERROR ::: getChosenMember ${err.message}`);
            throw err;
        }
    }
}

export default MemberApiService;