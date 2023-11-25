import React from "react"
import "../../../css/community.css"
import { Avatar, Box, Container, Stack } from "@mui/material";
import { Send } from "@mui/icons-material";

export const CommunityChats = (props: any) => {
    const [messageList, setMessageList] = React.useState();
    return (
        <Stack className="chat_frame">
            <Box className="chat_top">Jonli Muloqot</Box>
            <Box className="chat_content">
                <Box className="chat_main">
                    <Box
                        flexDirection={"row"}
                        justifyContent={"flex-end"}
                        display={"flex"}
                        sx={{ m: "10px 0" }}
                    >
                        <div className="msg_right">Assalomu Alaykum, Jonibek aka.</div>
                    </Box>
                    <Box
                        flexDirection={"row"}
                        display={'flex'}
                        alignItems={"flex-end"}
                        justifyContent={"flex-end"}
                        sx={{ m: "10px 0" }}
                    >
                        <div className="msg_right">Yaxshimisz. Aka</div>
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"row"}
                        sx={{ m: "10px 0" }}
                    >
                        <Avatar alt="andy" src={"/community/avatar_ex_4.jpg"} />
                        <div className="msg_left">Va alaykum Assalom. Hormang</div>
                    </Box>
                    <Box
                        flexDirection={"row"}
                        display={'flex'}
                        alignItems={"flex-end"}
                        justifyContent={"flex-end"}
                        sx={{ m: "10px 0" }}
                    >
                        <div className="msg_right">Rahmat Aka, Bo'lyapti:)</div>
                    </Box>
                    <Box
                        flexDirection={"row"}
                        display={'flex'}
                        alignItems={"flex-end"}
                        justifyContent={"flex-end"}
                        sx={{ m: "10px 0" }}
                    >
                        <div className="msg_right">Aka Uzur. Kecha Darsga kirolmadm, <br /> Budilnikka qo'yish esdan chiqibdi😔 uxlab qo'libman aka.</div>
                    </Box>
                    <Box
                        flexDirection={"row"}
                        display={'flex'}
                        alignItems={"flex-end"}
                        justifyContent={"flex-start"}
                        sx={{ m: "10px 0" }}
                    >
                        <Avatar alt="andy" src={"/community/avatar_ex_4.jpg"} />
                        <div className="msg_left">Mayli mayli Nimayam derdim endi.</div>
                    </Box>
                    <Box
                        flexDirection={"row"}
                        display={'flex'}
                        alignItems={"flex-end"}
                        justifyContent={"flex-end"}
                        sx={{ m: "10px 0" }}
                    >
                        <div className="msg_right">Rahmat aka. Tushunganiz uchun👍</div>
                    </Box>
                </Box>
            </Box>
            <Box className="chat_bott">
                <input
                    type="text"
                    name={"message"}
                    className={"msg_input"}
                    placeholder="Xabar jo'natish"
                />
                <button className="send_msg_btn">
                    <Send style={{ color: "#fff" }} />
                </button>
            </Box>
        </Stack>
    )


}