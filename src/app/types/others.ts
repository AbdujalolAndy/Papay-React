export interface SearchObj {
    page: number;
    limit: number;
    order: string;
}

export interface ProductSearchObj {
    page: number;
    limit: number;
    order: string;
    restaurant_mb_id?: string;
    product_collection?: string;
}
export interface MemberLiken {
    like_group: string,
    like_ref_id: string,
    like_status: number
}

export interface CartItem {
    _id: string;
    quantity: number;
    name: string;
    price: number;
    image: string
}

export interface ChatMsg {
    msg: string;
    mb_id: string;
    mb_image: string;
    mb_nick: string;
}

export interface ChatGreetMsg {
    msg: string;
}

export interface ChatInfoMsg {
    total: number
}