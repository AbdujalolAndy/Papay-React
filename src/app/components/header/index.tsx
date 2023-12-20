import react, { useState, useEffect } from "react";
import { Box, Button, Container, Stack, IconButton, Badge } from "@mui/material";
import { NavLink } from 'react-router-dom';

export function NavbarHome(props: any) {
    const [value, setValue] = useState(24);
    const [condition, setCondition] = useState(true);

    useEffect(() => {
        setValue(value + 1)
    }, [condition])
    return (
        <div className="home_navbar format">
            <Container>
                <Stack
                    flexDirection={"row"}
                    className="navbar_config"
                    justifyContent={"space-between"}
                >
                    <Box>
                        <img src='/icons/papay_logo.svg' />
                    </Box>
                    <Stack
                        flexDirection={"row"}
                        justifyContent={"space-evenly"}
                        alignItems={"center"}
                        className="navbar_links"
                    >
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/" activeClassName="underline">
                                Bosh Sahifa
                            </NavLink>
                        </Box>
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/restaurant" activeClassName="underline">
                                Oshhona
                            </NavLink>
                        </Box>
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/orders" activeClassName="underline">
                                Buyurtma
                            </NavLink>
                        </Box>
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/community" activeClassName="underline">
                                Jamiyat
                            </NavLink>
                        </Box>
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/help" activeClassName="underline">
                                Yordam
                            </NavLink>
                        </Box>
                        <Box>
                            <IconButton aria-label="cart" id="basic-button" aria-controls={undefined} aria-haspopup="true" aria-expanded>
                                <Badge badgeContent={3} color="secondary">
                                    <img src={"/icons/shopping-cart.svg"} />
                                </Badge>
                            </IconButton>
                        </Box>
                        <Box>
                            <Button variant='contained' style={{ color: "#ffffff", background: "#1976d2" }}>
                                KIRISH
                            </Button>
                        </Box>
                    </Stack>
                </Stack>

                <Stack className="head_information">
                    <Stack justifyContent={"row"} style={{ marginTop: "86px", marginLeft: "24px" }}>
                        <Box>
                            <img src="/home/welcome.svg" />
                        </Box>
                        <Box className="define_restaurant">
                            The Authentic Restaurant & Cafe
                        </Box>
                        <Box className="timeline_service">{value} soat xizmatingizdamiz.</Box>
                        <Box sx={{ mt: "90px" }}>
                            <Button onClick={() => setCondition(!condition)} variant="contained" style={{ width: "210px;", height: "60px", background: "#1976D2", color: "#ffffff" }}>
                                RO’YHATDAN O’TISH
                            </Button>
                        </Box>
                    </Stack>

                    <Box className="big_img">
                    </Box>
                </Stack>
            </Container>
        </div>
    )
}