import { Attachment } from "./attachment.interface";
import { PaginateModel } from "./core.interface";

export interface MenuModel extends PaginateModel {
    data: Menu[];
}

export interface Menu {
  id?: number;
  title: string;
  link_type: string;
  path: string;
  parent_id: number; 
  show?: boolean;
  mega_menu: number | boolean;
  mega_menu_type: string;
  set_page_link: string; 
  badge_text: string;
  badge_color: string;
  is_target_blank: boolean | number;
  product_ids: number[]; 
  blog_ids: number[]; 
  child: Menu[];
  banner_image_id: string;
  banner_image: Attachment;
  item_image_id: string;
  item_image: Attachment;
  status: number | boolean;
}

export interface MobileMenu {
  id?: number;
  active?: boolean;
  title?: string;
  icon?: string;
  path?: string;
}
