import { Backdrop, Fade, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Fab, Stack, TextField } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login"

import styled from "styled-components";
import { sweetErrorHandling, sweetFailureProvider, sweetTopSuccessAlert } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 2, 2)
    }
}))

const ModalImg = styled.img`
width:62%;
height:100%;
border-radius:10px;
background:#000;
margin-top:9px;
margin-left:10px
`
export default function AuthenticationModal(props: any) {
    //INITIALIZATIONS
    const classes = useStyles(),
        [mb_nick, set_mb_nick] = useState<string>(""),
        [mb_password, set_mb_password] = useState<string>(""),
        [mb_phone, set_mb_phone] = useState<number>(0),
        //Handler
        handlerUserName = (e: any) => set_mb_nick(e.target.value),
        handlerPhone = (e: any) => set_mb_phone(e.target.value),
        handlerPassword = (e: any) => set_mb_password(e.target.value),

        handleSignUpRequest = async () => {
            try {
                const is_fulfilled = mb_nick != "" && mb_password != "" && mb_phone != 0;
                assert.ok(is_fulfilled, Definer.input_err1);
                const signUpData = {
                    mb_nick: mb_nick,
                    mb_password: mb_password,
                    mb_phone: mb_phone
                }

                const memberApiService = new MemberApiService();
                await memberApiService.signupRequest(signUpData);

                props.handleSignUpClose()
                window.location.reload();
            } catch (err: any) {
                props.handleSignUpClose()
                sweetErrorHandling(err).then()
            }
        }

    const handleRequest = async () => {
        try {
            const is_fulfilled = mb_nick != "" && mb_password != "";
            assert.ok(is_fulfilled, Definer.input_err1);
            const loginData = {
                mb_nick: mb_nick,
                mb_password: mb_password
            }
            const member = new MemberApiService();
            await member.loginRequest(loginData)
            props.handleLogInClose()
            window.location.reload();
        } catch (err: any) {
            props.handleLogInClose()
            sweetErrorHandling(err).then()
        }
    }

    const passwordKeyDowwnHandle = (e: any) => {
        if (e.key === "Enter" && props.signUpOpen) {
            handleSignUpRequest()
        } else if (e.key === "Enter" && props.logInOpen) {
            handleRequest()
        }
    }
    return (
        <div>
            <Modal
                aria-labelledby="transition modal-title"
                aria-describedby="transition modal description"
                className={classes.modal}
                onClose={props.handleSignUpClose}
                open={props.signUpOpen}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade
                    in={props.signUpOpen}
                >
                    <Stack className={classes.paper} direction={"row"} sx={{ width: "800px" }}>
                        <ModalImg src="/auth/password.jpeg" alt="camera" />
                        <Stack sx={{ marginLeft: "69px", alignItems: "center" }}>
                            <h2>SignUp Form</h2>
                            <TextField
                                onChange={handlerUserName}
                                sx={{ marginTop: "7px", }}
                                id="outlinned-basic"
                                label="username"
                                variant="outlined"
                            />
                            <TextField
                                onChange={handlerPhone}
                                sx={{ my: "17px", }}
                                id="outlinned-basic"
                                label="phone number"
                                variant="outlined"
                            />
                            <TextField
                                onChange={handlerPassword}
                                onKeyDown={passwordKeyDowwnHandle}
                                id="outlinned-basic"
                                label="password"
                                variant="outlined"
                            />
                            <Fab
                                onClick={handleSignUpRequest}
                                sx={{ marginTop: "30px", width: "120px" }}
                                variant="extended"
                                color="primary"
                            >
                                <LoginIcon sx={{ mr: 1 }} />
                                Signup
                            </Fab>
                        </Stack>
                    </Stack>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition modal-title"
                aria-describedby="transition modal description"
                className={classes.modal}
                open={props.logInOpen}
                onClose={props.handleLogInClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade
                    in={props.logInOpen}
                >
                    <Stack className={classes.paper} direction={"row"} sx={{ width: "800px" }}>
                        <ModalImg src="/auth/password.jpeg" alt="camera" />
                        <Stack sx={{ marginLeft: "69px", alignItems: "center" }}>
                            <h2>Login Form</h2>
                            <TextField
                                onChange={handlerUserName}
                                sx={{ my: "17px", }}
                                id="outlinned-basic"
                                label="username"
                                variant="outlined"
                            />
                            <TextField
                                onChange={handlerPassword}
                                onKeyDown={passwordKeyDowwnHandle}
                                id="outlinned-basic"
                                label="password"
                                variant="outlined"
                            />
                            <Fab
                                onClick={handleRequest}
                                sx={{ marginTop: "30px", width: "120px" }}
                                variant="extended"
                                color="primary"
                            >
                                <LoginIcon sx={{ mr: 1 }} />
                                Login
                            </Fab>
                        </Stack>
                    </Stack>
                </Fade>
            </Modal>
        </div>

    )
}