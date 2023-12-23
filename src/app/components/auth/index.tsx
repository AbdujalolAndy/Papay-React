import { Backdrop, Fade, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Fab, Stack, TextField } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login"

import styled from "styled-components";

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
    const classes = UseStyle();
    const signUpOpen = false;
    const loginOpen = true;
    return (
        <div>
            <Modal
                aria-labelledby="transition modal-title"
                aria-describedby="transition modal description"
                className={classes.modal}
                open={signUpOpen}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade
                    in={signUpOpen}
                >
                    <Stack className={classes.paper} direction={"row"} sx={{ width: "800px" }}>
                        <ModalImg src="/auth/password.jpeg" alt="camera" />
                        <Stack sx={{ marginLeft: "69px", alignItems: "center" }}>
                            <h2>SignUp Form</h2>
                            <TextField
                                //onChange={}
                                sx={{ marginTop: "7px", }}
                                id="outlinned-basic"
                                label="username"
                                variant="outlined"
                            />
                            <TextField
                                //onChange={}
                                sx={{ my: "17px", }}
                                id="outlinned-basic"
                                label="phone number"
                                variant="outlined"
                            />
                            <TextField
                                //onChange={}
                                id="outlinned-basic"
                                label="password"
                                variant="outlined"
                            />
                            <Fab
                                //onChange={}
                                sx={{ marginTop: "30px", width: "120px" }}
                                variant="extended"
                                color="primary"
                            >
                                <LoginIcon sx={{mr:1}}/>
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
                open={loginOpen}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade
                    in={loginOpen}
                >
                    <Stack className={classes.paper} direction={"row"} sx={{ width: "800px" }}>
                        <ModalImg src="/auth/password.jpeg" alt="camera" />
                        <Stack sx={{ marginLeft: "69px", alignItems: "center" }}>
                            <h2>Login Form</h2>
                            <TextField
                                //onChange={}
                                sx={{ my: "17px", }}
                                id="outlinned-basic"
                                label="username"
                                variant="outlined"
                            />
                            <TextField
                                //onChange={}
                                id="outlinned-basic"
                                label="password"
                                variant="outlined"
                            />
                            <Fab
                                //onChange={}
                                sx={{ marginTop: "30px", width: "120px" }}
                                variant="extended"
                                color="primary"
                            >
                                <LoginIcon sx={{mr:1}}/>
                                Login
                            </Fab>
                        </Stack>
                    </Stack>
                </Fade>
            </Modal>
        </div>

    )
}