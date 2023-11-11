import react from "react";
import { Box, Container, Stack } from '@mui/material';
import { NavLink } from "react-router-dom";


export function Footer() {
    return (
        <div className="footer_config">
            <Container>
                <Stack className={"main_footer_container"}>
                    <Stack flexDirection={"row"} style={{ height: "242px" }}>
                        <Stack flexDirection={"column"} className="info">
                            <Box>
                                <img src={"/papay_footer.svg"} />
                            </Box>
                            <Box className={"main_text"}>
                                Lorem ipsum dolor sit amet,
                                consectetur adipiscing elit,
                                sed do eiusmod tempor Sed ut
                                perspiciatis unde omnis iste
                            </Box>
                            <Stack className="contact_links">
                                <Box><img src={"/icons/facebook.svg"} /></Box>
                                <Box><img src={"/icons/twitter.svg"} /></Box>
                                <Box><img src={"/icons/instagram.svg"} /></Box>
                                <Box><img src={"/icons/youtube.svg"} /></Box>
                            </Stack>
                        </Stack>
                        <Stack className="parts">
                            <Box className="part_subject">Bo'limlar</Box>
                            <Box className="divider"></Box>
                            <Box className="targets">
                                <NavLink to="/">Bosh Sahifa</NavLink>
                                <NavLink to="/restaurant">Oshhonalar</NavLink>
                                <NavLink to="/community">Jamiyat</NavLink>
                                <NavLink to="/help">Yordam</NavLink>
                            </Box>
                        </Stack>
                        <Stack className="find_us">
                            <Box className="find">Bizni Top</Box>
                            <Box className="divider"></Box>
                            <Stack className="details" sx={{ mt: "19.36px" }}>
                                <Box className="detail_one">L.</Box>
                                <Box className="detail_two">Uzbekistan</Box>
                            </Stack>
                            <Stack className="details" sx={{ mt: "42px" }}>
                                <Box className="detail_one">P.</Box>
                                <Box className="detail_two">+998 - 99  266  25  62</Box>
                            </Stack>
                            <Stack className="details" sx={{ mt: "9px" }}>
                                <Box className="detail_one">L.</Box>
                                <Box className="detail_two">Papays@restaurant.com</Box>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Box className="liner"></Box>
                    <Box className="copyrights">
                        &copy; Copyright Papays 2022, All right reserved.
                    </Box>
                </Stack>
            </Container>
        </div>
    )
}