import { Params } from "../../interface/core.interface";
import { Blog } from "../../interface/blog.interface";

export class GetBlogs {
  static readonly type = "[Blog] Get";
  constructor(public payload?: Params) {}
}

export class CreateBlog {
  static readonly type = "[Blog] Create";
  constructor(public payload: Blog) {}
}

export class EditBlog {
  static readonly type = "[Blog] Edit";
  constructor(public id: number) {}
}

export class UpdateBlog {
  static readonly type = "[Blog] Update";
  constructor(public payload: Blog, public id: number) {}
}

export class UpdateBlogStatus {
  static readonly type = "[Blog] Update Status";
  constructor(public id: number, public status: boolean) {}
}

export class DeleteBlog {
  static readonly type = "[Blog] Delete";
  constructor(public id: number) {}
}

export class DeleteAllBlog {
  static readonly type = "[Blog] Delete All";
  constructor(public ids: number[]) {}
}