import { CloudDownload } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import { UpdateMember } from "../../types/user";
import { verifiedMemberData } from "../../apiServices/verify";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";

export function MySettings() {
    //Initializations
    const [file, setFile] = useState<string>(verifiedMemberData.mb_image),
        [memberUpdate, setMemberUpdate] = useState<UpdateMember>({
            mb_nick: "",
            mb_address: "",
            mb_image: "",
            mb_phone: "",
            mb_description: ""
        })
    //Handlers
    const changeMemberNickHandler = (e: any) => {
        memberUpdate.mb_nick = e.target.value;
        setMemberUpdate({ ...memberUpdate });
    };
    const changeMemberPhoneHandler = (e: any) => {
        memberUpdate.mb_phone = e.target.value;
        setMemberUpdate({ ...memberUpdate });
    };
    const changeMemberAddressHandler = (e: any) => {
        memberUpdate.mb_address = e.target.value;
        setMemberUpdate({ ...memberUpdate });
    };
    const changeMemberDescriptionHandler = (e: any) => {
        memberUpdate.mb_description = e.target.value;
        setMemberUpdate({ ...memberUpdate });
    };

    const handleImagePreviewer = (e: any) => {
        try {
            const file = e.target.files[0];

            const fileType = file["type"],
                validTypes = ["image/jpg", "image/jpeg", "image/pmg"];
            assert.ok(validTypes.includes(fileType) && file, Definer.input_err2);

            memberUpdate.mb_image = file;
            setMemberUpdate({ ...memberUpdate });
            setFile(URL.createObjectURL(file));
        } catch (err) {
            console.log(`ERROR ::: handleImagePreviewer ${err}`);
            sweetErrorHandling(err).then();
        }
    };

    const handleSubmitButton = async () => {
        try {
            const memberService = new MemberApiService();
            const result = await memberService.updateMemberData(memberUpdate);
            assert.ok(result, Definer.general_err1);
            sweetTopSmallSuccessAlert(
                "Information modified successfully!",
                700,
                false
            );
            window.location.reload();
        } catch (err) {
            console.log(`ERROR ::: handleSubmitButton ${err}`);
            sweetErrorHandling(err).then();
        }
    };

    return (
        <Stack className="my_settings_page">
            <Box className="member_media_frame">
                <img
                    src={file}
                    alt=""
                    className="mb_image"
                    width={"100px"}
                    height={"100px"}
                    style={{ borderRadius: "50%" }}
                />
                <div className="media_change_box">
                    <span>Rasm Yuklash</span>
                    <p>JPG, JPEG, PNG rasmlarni yuklay olasz!</p>
                    <div className="up_del_box">
                        <Button style={{ minWidth: "0" }} component="label" onChange={handleImagePreviewer}>
                            <CloudDownload />
                            <input type="file" hidden />
                        </Button>
                    </div>
                </div>
            </Box>
            <Box className="input_frame">
                <div className="long_input">
                    <label htmlFor="name" className="spec_label">Ism</label>
                    <input
                        type="text"
                        id="name"
                        className="spec_input mb_nick"
                        placeholder={verifiedMemberData.mb_nick}
                        name="mb_nick"
                        onChange={changeMemberNickHandler}
                    />
                </div>
            </Box>
            <Box className="input_frame">
                <div className="short_input">
                    <label htmlFor="phone_num" className="spec_label">Telfon Raqam</label>
                    <input
                        id="phone_num"
                        type="text"
                        placeholder={verifiedMemberData.mb_phone}
                        name="mb_phone"
                        className="spec_input mb_phone"
                        onChange={changeMemberPhoneHandler}
                    />
                </div>
                <div className="short_input">
                    <label htmlFor="address" className="spec_label">Manzil</label>
                    <input
                        id="address"
                        type="text"
                        placeholder={verifiedMemberData.mb_address}
                        name="mb_address"
                        className="spec_input mb_address"
                        onChange={changeMemberAddressHandler}
                    />
                </div>
            </Box>
            <Box className="input_frame">
                <div className="long_input">
                    <label htmlFor="description" className="spec_label">Ma'lumot</label>
                    <textarea
                        id="description"
                        placeholder={verifiedMemberData.mb_description == "" ? "Mavjud emas" : verifiedMemberData.mb_description}
                        name="description"
                        className="spec_textarea mb_description"
                        onChange={changeMemberDescriptionHandler}
                    />
                </div>
            </Box>
            <Box display="flex" justifyContent={"flex-end"} sx={{ mt: "25px" }} onClick={handleSubmitButton}>
                <Button variant="contained">Saqlash</Button>
            </Box>
        </Stack>
    )
}