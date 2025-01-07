import { PaginateModel } from "./core.interface";

export interface NoticeModel extends PaginateModel {
  data: Notice[];
}

export interface Notice {
  id: number;
  title: string;
  description: string;
  priority: string;
  badge: string;
  is_read: number | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

 