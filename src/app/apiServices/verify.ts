import Cookies from "universal-cookie";

const cookie = new Cookies();
let member_data: any = null;

if (cookie.get("access_token")) {
    const memebrDataJson: any = localStorage.getItem("member_data")
        ? localStorage.getItem("member_data")
        : null;
    member_data = memebrDataJson ? JSON.parse(memebrDataJson) : null
} else {
    localStorage.removeItem("member_data")
}



console.log("=== verify ====");
console.log(member_data);

export const verifiedMemberData = member_data ? member_data : null;
