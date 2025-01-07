import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetBlogs, CreateBlog, EditBlog, 
         UpdateBlog, UpdateBlogStatus, DeleteBlog, 
         DeleteAllBlog } from "../action/blog.action";
import { Blog } from "../../interface/blog.interface";
import { BlogService } from "../../services/blog.service";
import { NotificationService } from "../../services/notification.service";

export class BlogStateModel {
  blog = {
    data: [] as Blog[],
    total: 0
  }
  selectedBlog: Blog | null;
}

@State<BlogStateModel>({
  name: "blog",
  defaults: {
    blog: {
      data: [],
      total: 0
    },
    selectedBlog: null
  },
})
@Injectable()
export class BlogState {
  
  constructor(private store: Store,
    private notificationService: NotificationService,
    private blogService: BlogService) {}

  @Selector()
  static blog(state: BlogStateModel) {
    return state.blog;
  }
  
  @Selector()
  static blogs(state: BlogStateModel) {
    return state.blog.data.map(res => { 
      return { label: res?.title, value: res?.id }
    });
  }

  @Selector()
  static selectedBlog(state: BlogStateModel) {
    return state.selectedBlog;
  }

  @Action(GetBlogs)
  getBlogs(ctx: StateContext<BlogStateModel>, action: GetBlogs) {
    return this.blogService.getBlogs(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            blog: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            }
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(CreateBlog)
  create(ctx: StateContext<BlogStateModel>, action: CreateBlog) {
    return this.blogService.createBlog(action.payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            blog: {
              data: [...state.blog.data, result],
              total: state?.blog.total + 1
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Blog Created Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditBlog)
  edit(ctx: StateContext<BlogStateModel>, { id }: EditBlog) {
    return this.blogService.editBlog(id).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedBlog: result
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateBlog)
  update(ctx: StateContext<BlogStateModel>, { payload, id }: UpdateBlog) {
    return this.blogService.updateBlog(id, payload).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const blogs = [...state.blog.data];
            const index = blogs.findIndex(blog => blog.id === id);
            blogs[index] = result;

            ctx.patchState({
              ...state,
              blog: {
                data: blogs,
                total: state.blog.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Blog Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateBlogStatus)
  updateStatus(ctx: StateContext<BlogStateModel>, { id, status }: UpdateBlogStatus) {
    return this.blogService.updateBlogStatus(id, status).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const blogs = [...state.blog.data];
            const index = blogs.findIndex(blog => blog.id === id);
            blogs[index] = result;

            ctx.patchState({
              ...state,
              blog: {
                data: blogs,
                total: state.blog.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Blog Status Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteBlog)
  delete(ctx: StateContext<BlogStateModel>, { id }: DeleteBlog) {
    return this.blogService.deleteBlog(id).pipe(
      tap({
        next: () => { 
          this.store.dispatch(new GetBlogs({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Blog Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllBlog)
  deleteAll(ctx: StateContext<BlogStateModel>, { ids }: DeleteAllBlog) {
    return this.blogService.deleteAllBlog(ids).pipe(
      tap({
        next: () => {
          this.store.dispatch(new GetBlogs({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Blog Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
