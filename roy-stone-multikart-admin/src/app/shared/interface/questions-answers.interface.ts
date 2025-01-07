import { Attachment } from "./attachment.interface";
import { PaginateModel } from "./core.interface";

export interface QnAModel extends PaginateModel {
    data: QuestionAnswers[];
}
export interface QuestionAnswers {
    id:  number;
    answer: string;
    product_id:  number;
    product: Product;
    product_name: string;
    store: Store;
    status: string;
    reaction: string | null;
    question: string;
    total_dislikes: number;
    total_likes: number;
    consumer_id: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}


export interface Product {
    id:  number;
    name: string;
    product_thumbnail_id: number;
    product_thumbnail: Attachment;
}
  
export interface Store {
    id:  number;
    store_name: string;
}