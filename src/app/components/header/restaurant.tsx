import react from "react";
import { NavLink } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    IconButton,
    Badge,
    Menu,
    MenuItem,
    ListItem,
    Stack,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import Basket from "./basket";


export function NavbarRestaurant(props: any) {
    return (
        <div className="format_restaurant home_navbar">
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
                            <NavLink to="/">
                                Bosh Sahifa
                            </NavLink>
                        </Box>
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/restaurant" activeClassName="underline">
                                Oshhona
                            </NavLink>
                        </Box>
                        {
                            props.verifiedMemberData ? (
                                <Box className="hover-line" onClick={props.setPath}>
                                    <NavLink to="/orders" activeClassName="underline">
                                        Buyurtma
                                    </NavLink>
                                </Box>
                            ) : null
                        }
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/community" activeClassName="underline">
                                Jamiyat
                            </NavLink>
                        </Box>
                        {props.verifiedMemberData ? (
                            <Box className="hover-line" onClick={props.setPath}>
                                <NavLink to="/member-page" activeClassName="underline">
                                    Sahifam
                                </NavLink>
                            </Box>
                        ) : null}
                        <Box className="hover-line" onClick={props.setPath}>
                            <NavLink to="/help" activeClassName="underline">
                                Yordam
                            </NavLink>
                        </Box>
                        <Basket
                            cartItems={props.cartItems}
                            onAdd={props.onAdd}
                            onRemove={props.onRemove}
                            onDelete={props.onDelete}
                        />
                        {props.verifiedMemberData ? (
                            <img
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "50%"
                                }}
                                src={props.verifiedMemberData.mb_image}
                                onClick={props.handleLogOutClick}
                                alt="user" />
                        ) : (
                            <Box>
                                <Button onClick={props.handleLogInOpen} variant='contained' style={{ color: "#ffffff", background: "#1976d2" }}>
                                    KIRISH
                                </Button>
                            </Box>
                        )}
                        <Menu
                            anchorEl={props.anchor}
                            open={props.open}
                            onClose={props.handleLogOutClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    "&:before": {
                                        content: "''",
                                        display: "block",
                                        position: "absolute",
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: "background.paper",
                                        transform: "translateY(-50%) rotate(45deg)",
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                            <MenuItem
                                onClick={props.handleLogout}
                            >
                                <ListItem>
                                    <Logout fontSize="small" style={{ color: "blue" }} />
                                </ListItem>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Stack>
                </Stack>
            </Container>
        </div>
    )
}