import { Backdrop, Fade, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Fab, Stack, TextField } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login"

import styled from "styled-components";
import { sweetErrorHandling, sweetFailureProvider, sweetTopSuccessAlert } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";

const UseStyle = makeStyles((theme) => ({
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
    const classes = UseStyle();
    let mb_nick: string = "",
        mb_password: string = "",
        mb_phone: number = 0

    //Handler
    const handlerUserName = (e: any) => mb_nick = e.target.value;
    const handlerPhone = (e: any) => mb_phone = e.target.value;
    const handlerPassword = (e: any) => mb_password = e.target.value;

    const handleSignUpRequest = async () => {
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