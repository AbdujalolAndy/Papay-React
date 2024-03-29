import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import { Box, Checkbox, Link, Stack } from "@mui/material";
import { BoArticle } from "../../types/boArticle";
import { serverApi } from "../../../lib/config";
import moment from "moment";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import BoArticlesApiService from "../../apiServices/communityApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { verifiedMemberData } from "../../apiServices/verify";


export default function TargetArticles(props: any) {

    //Handlers
    const targetLikeArticle = async (event: any) => {
        try {
            assert.ok(verifiedMemberData, Definer.auth_err1);
            const boArticleServiceApi = new BoArticlesApiService(),
                like_result = await boArticleServiceApi.boArticlesLikeTarget({ like_ref_id: event.target.value, group_type: 'community' })
            assert.ok(like_result, Definer.general_err1);
            await sweetTopSmallSuccessAlert("success", 700, false);
            props.setRebuild(new Date())
        } catch (err: any) {
            sweetErrorHandling(err).then()
        }
    }
    return (
        <Stack>
            {props.targetBoArticles?.map((article: BoArticle) => {
                const art_img_url = article?.art_image ? `${serverApi}/${article?.art_image?.replace(/\\/g, "/")}` : "/community/default_article.svg"
                return (
                    <Link
                        sx={{ textDecoration: "none" }}
                        className="all_article_box"
                        href={`/member-page/other?mb_id=${article.mb_id}&art_id=${article._id}`}
                    >
                        <Box
                            className={"all_article_img"}
                            sx={{ backgroundImage: `url(${art_img_url})`, backgroundPosition: "center" }}
                        ></Box>
                        <Box className="all_article_container" >
                            <Box alignItems={"center"} display={"flex"}>
                                <img
                                    src={"/auth/default_user.svg"}
                                    width={"35px"}
                                    style={{ borderRadius: "50%", backgroundSize: "cover" }}
                                />
                                <span className="all_article_author_user">{article.member_data.mb_nick}</span>
                            </Box>
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                sx={{ mt: "15px" }}
                            >
                                <span className="all_article_title">{article.bo_id}</span>
                                <p className="all_article_desc">{article.art_subject}</p>
                            </Box>
                            <Box>
                                <Box
                                    className="article_share"
                                    style={{ width: "100%", height: "auto" }}
                                >
                                    <Box
                                        className="article_share_main"

                                    >
                                        <span style={{ marginRight: "40px" }}>{moment(article.createdAt).format("YYYY-MM-DD")}</span>
                                        <Checkbox
                                            value={article._id}
                                            icon={<FavoriteBorder />}
                                            checkedIcon={<Favorite style={{ fill: "red" }} />}
                                            checked={article.me_liked && article.me_liked[0]?.my_favorite ? true : false}
                                            onClick={targetLikeArticle}

                                        />
                                        <span style={{ marginRight: "18px" }}>{article.art_likes}</span>
                                        <Checkbox
                                            icon={<RemoveRedEye />}
                                            checked={false}
                                        />
                                        <span style={{ marginLeft: "18px" }}>{article.art_views}</span>
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