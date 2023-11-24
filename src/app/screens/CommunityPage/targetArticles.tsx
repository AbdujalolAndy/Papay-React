import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import { Box, Checkbox, Link, Stack } from "@mui/material";


export default function TargetArticles(props: any) {
    return (
        <Stack>
            {props.targetBoArticles?.map((article: any, index: string) => {
                const art_img_url = "/community/default_article.svg"
                return (
                    <Link
                        href=""
                        sx={{ textDecoration: "none" }}
                        className="all_article_box"
                    >
                        <Box
                            className={"all_article_img"}
                            sx={{ backgroundImage: `url(${article.img ?? art_img_url})`, backgroundPosition: "center" }}
                        ></Box>
                        <Box className="all_article_container" >
                            <Box alignItems={"center"} display={"flex"}>
                                <img
                                    src={"/auth/default_user.svg"}
                                    width={"35px"}
                                    style={{ borderRadius: "50%", backgroundSize: "cover" }}
                                />
                                <span className="all_article_author_user">{article.name}</span>
                            </Box>
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                sx={{ mt: "15px" }}
                            >
                                <span className="all_article_title">evaluation</span>
                                <p className="all_article_desc">{article.desc}</p>
                            </Box>
                            <Box>
                                <Box
                                    className="article_share"
                                    style={{ width: "100%", height: "auto" }}
                                >
                                    <Box
                                        className="article_share_main"

                                    >
                                        <span style={{ marginRight: "40px" }}>{article.date}</span>
                                        <Checkbox
                                            icon={<FavoriteBorder />}
                                            checked={false}

                                        />
                                        <span style={{ marginRight: "18px" }}>{article.like}</span>
                                        <Checkbox
                                            icon={<RemoveRedEye />}
                                            checked={false}
                                        />
                                        <span style={{ marginLeft: "18px" }}>{article.views}</span>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Link>
                )
            })}
        </Stack>
    )
}