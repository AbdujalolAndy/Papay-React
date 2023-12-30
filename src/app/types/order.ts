import { Product } from "./product";

export interface OrderItems {
    item_quantity: number;
    item_price: number;
    order_id: string;
    product_id: string;
}


export interface Order {
    _id: string;
    order_total_amount: number;
    order_delivery_cost: number;
    order_status: string;
    mb_id: string;
    order_items: OrderItems[];
    product_data: Product[];
    createdAt: Date;
    updatedAt: Date
}

