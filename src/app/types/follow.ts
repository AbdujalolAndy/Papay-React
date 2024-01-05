import { Member } from "./user";

export interface MeFollowed {
    follow_id: string;
    subscriber_id: string;
    my_following: boolean;
}

export interface Follower{
    _id:string,
    subscriber_id:string;
    updatedAt:Date;
    createdAt:Date;
    subscriber_member_data:Member,
    me_followed:MeFollowed[] | null;
}
export interface Following{
    _id:string,
    subscriber_id:string;
    updatedAt:Date;
    createdAt:Date;
    follow_member_data:Member
}