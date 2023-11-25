import { CloudDownload } from "@mui/icons-material";
import { Box, Button, Stack } from "@mui/material";

export function MySettings() {
    return (
        <Stack className="my_settings_page">
            <Box className="member_media_frame">
                <img
                    src="/auth/default_user.svg"
                    alt=""
                    className="mb_image"
                    width={"100px"}
                    height={"100px"}
                />
                <div className="media_change_box">
                    <span>Rasm Yuklash</span>
                    <p>JPG, JPEG, PNG rasmlarni yuklay olasz!</p>
                    <div className="up_del_box">
                        <Button style={{ minWidth: "0" }} component="label">
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
                        placeholder="Nabijonov Abdujalol"
                        name="mb_nick"
                    />
                </div>
            </Box>
            <Box className="input_frame">
                <div className="short_input">
                    <label htmlFor="phone_num" className="spec_label">Telfon Raqam</label>
                    <input
                        id="phone_num"
                        type="text"
                        placeholder="+8210 3201 1222"
                        name="mb_phone"
                        className="spec_input mb_phone"
                    />
                </div>
                <div className="short_input">
                    <label htmlFor="address" className="spec_label">Manzil</label>
                    <input
                        id="address"
                        type="text"
                        placeholder="Jollam-do, Yeosu city 717-102"
                        name="mb_address"
                        className="spec_input mb_address"
                    />
                </div>
            </Box>
            <Box className="input_frame">
                <div className="long_input">
                    <label htmlFor="description" className="spec_label">Ma'lumot</label>
                    <textarea
                        id="description"
                        placeholder="Mavjud emas"
                        name="description"
                        className="spec_textarea mb_description"
                    />
                </div>
            </Box>
            <Box display="flex" justifyContent={"flex-end"} sx={{ mt: "25px" }}>
                <Button variant="contained">Saqlash</Button>
            </Box>
        </Stack>
    )
}