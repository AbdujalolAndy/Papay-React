import React, { useContext, useEffect, useState } from "react"
import "../../../css/community.css"
import { Avatar, Box, Container, Stack } from "@mui/material";
import { Send } from "@mui/icons-material";
import { socketContext } from "../../Context/socket";

export const CommunityChats = (props: any) => {
    //Initializations
    const [new_message, setNew_message] = React.useState<string>();
    const [onlineUsers, setOnlineUsers] = useState<number>(0)
    const socket = useContext(socketContext)
    //Hooks
    useEffect(() => {
        socket.connect();

        socket?.on("connect", () => {
            console.log("Client connect")
        })

        socket?.on("newMsg", (new_message: string) => {
            console.log("Client new message")
        })

        socket?.on("greetMsg", (new_message: string) => {
            console.log("Client greeting message")
        })

        socket?.on("infoMsg", (msg: any) => {
            console.log("Client info message")
            setOnlineUsers(msg.total)
        })

        return () => {
            socket.disconnect()
        };
    }, [socket])
    return (
        <Stack className="chat_frame">
            <Box className="chat_top">Jonli Muloqot{onlineUsers}</Box>
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