import { MeLiked } from "./product";
import { Member } from "./user";

export interface BoArticle {
    _id: string;
    art_subject: string;
    art_content: string;
    art_image?: string | null;
    bo_id: string;
    art_status: string;
    art_likes: number;
    art_views: number;
    mb_id: number;
    createdAt: Date;
    updated: Date;
    member_data: Member;
    me_liked: MeLiked[]; //Meliked
}

export interface SearchBoArticle{
bo_id:string,
page:number,
order?:string,
limit:number
}