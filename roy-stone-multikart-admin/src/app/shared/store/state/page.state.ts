import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetPages, CreatePage, EditPage, 
         UpdatePage, UpdatePageStatus, DeletePage, 
         DeleteAllPage } from "../action/page.action";
import { Page } from "../../interface/page.interface";
import { PageService } from "../../services/page.service";
import { NotificationService } from "../../services/notification.service";

export class PageStateModel {
  page = {
    data: [] as Page[],
    total: 0
  }
  selectedPage: Page | null;
}

@State<PageStateModel>({
  name: "page",
  defaults: {
    page: {
      data: [],
      total: 0
    },
    selectedPage: null
  },
})
@Injectable()
export class PageState {
  
  constructor(private store: Store,
    private notificationService: NotificationService,
    private pageService: PageService) {}

  @Selector()
  static page(state: PageStateModel) {
    return state.page;
  }

  @Selector()
  static pages(state: PageStateModel) {
    return state.page.data.map(res => { 
      return { label: res?.title, value: res?.slug }
    });
  }

  @Selector()
  static selectedPage(state: PageStateModel) {
    return state.selectedPage;
  }

  @Action(GetPages)
  getPages(ctx: StateContext<PageStateModel>, action: GetPages) {
    return this.pageService.getPages(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            page: {
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

  @Action(CreatePage)
  create(ctx: StateContext<PageStateModel>, action: CreatePage) {
    return this.pageService.createPage(action.payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            page: {
              data: [...state.page.data, result],
              total: state?.page.total + 1
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Page Created Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditPage)
  edit(ctx: StateContext<PageStateModel>, { id }: EditPage) {
    return this.pageService.editPage(id).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedPage: result
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdatePage)
  update(ctx: StateContext<PageStateModel>, { payload, id }: UpdatePage) {
    return this.pageService.updatePage(id, payload).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const pages = [...state.page.data];
            const index = pages.findIndex(page => page.id === id);
            pages[index] = result;

            ctx.patchState({
              ...state,
              page: {
                data: pages,
                total: state.page.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Page Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdatePageStatus)
  updateStatus(ctx: StateContext<PageStateModel>, { id, status }: UpdatePageStatus) {
    return this.pageService.updatePageStatus(id, status).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const pages = [...state.page.data];
            const index = pages.findIndex(page => page.id === id);
            pages[index] = result;

            ctx.patchState({
              ...state,
              page: {
                data: pages,
                total: state.page.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Page Status Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeletePage)
  delete(ctx: StateContext<PageStateModel>, { id }: DeletePage) {
    return this.pageService.deletePage(id).pipe(
      tap({
        next: () => { 
          this.store.dispatch(new GetPages({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Page Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllPage)
  deleteAll(ctx: StateContext<PageStateModel>, { ids }: DeleteAllPage) {
    return this.pageService.deleteAllPage(ids).pipe(
      tap({
        next: () => {
          this.store.dispatch(new GetPages({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Pages Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
