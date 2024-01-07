import React from "react"
import moment from "moment"
import { Box, Checkbox, Container, Stack } from "@mui/material";
import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import { BoArticle } from "../../types/boArticle";
import { serverApi } from "../../../lib/config";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";

export function MemberPosts(props: any) {
    //Initializations
    const { chosenMemberBoArticles, setArticleRebuild, chosenSingleBoArticleHandler } = props;
    //Handler
    const targetArticleLike = async (e: any) => {
        try {
            e.stopPropagation()
            assert.ok(localStorage.getItem("member_data"), Definer.auth_err1);
            const memberService = new MemberApiService(),
                like_result = await memberService.memberLikeTarget({
                    like_ref_id: e.target.value,
                    group_type: "community"
                });
            assert.ok(like_result, Definer.general_err1);
            await sweetTopSmallSuccessAlert("success", 700, false);
            setArticleRebuild(new Date())
        } catch (err: any) {
            sweetErrorHandling(err)
        }
    }
    return (
        <Box className="post_content">
            {chosenMemberBoArticles.map((article: BoArticle) => {
                const image_path = article.art_image ?
                    `${serverApi}/${article.art_image}` :
                    "/community/default_article.svg"
                return (
                    <Stack
                        className="all_article_box"
                        sx={{ cursor: "pointer" }}
                        onClick={()=>chosenSingleBoArticleHandler(article._id)}
                    >
                        <Box
                            className="all_article_img"
                            sx={{ backgroundImage: `url(${image_path})` }}
                        ></Box>
                        <Box className="all_article_container">
                            <Box
                                alignItems={"center"}
                                display={"flex"}
                            >
                                <img
                                    src={article.member_data.mb_image ? `${serverApi}/${article.member_data.mb_image}` : "/auth/default_user.svg"}
                                    width={"35px"}
                                    style={{ borderRadius: "50%", backgroundSize: "cover" }}
                                />
                                <span className="all_article_author_user">{article?.member_data?.mb_nick}</span>
                            </Box>
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                sx={{ mt: "15px" }}
                            >
                                <span className="all_article_title">{article?.bo_id}</span>
                                <p className="all_article_desc">{article?.art_content}</p>
                            </Box>
                            <Box>
                                <Box
                                    className="article_share"
                                    style={{ width: "100%", height: "auto" }}
                                    sx={{ mb: "10px" }}
                                >
                                    <Box
                                        className="article_share_main"
                                        style={{
                                            color: "#fff",
                                            marginLeft: "150px",
                                            display: "flex",
                                            alignItems: "center"
                                        }}>
                                        <span>{moment(article?.createdAt).format("YY-MM-DD HH:mm")}</span>
                                        <Checkbox
                                            sx={{ ml: "40px" }}
                                            icon={<FavoriteBorder />}
                                            checkedIcon={<Favorite style={{ fill: "red" }} />}
                                            checked={article.me_liked && article.me_liked[0]?.my_favorite ? true : false}
                                            value={article._id}
                                            onClick={targetArticleLike}
                                        />
                                        <span style={{ marginRight: "18px" }}>{article?.art_likes}</span>
                                        <RemoveRedEye />
                                        <span style={{ marginLeft: "18px" }}>{article?.art_views}</span>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Stack>
                )
            })}
        </Box>
    )
}