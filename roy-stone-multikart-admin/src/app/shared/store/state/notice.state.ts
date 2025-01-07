import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { NotificationService } from "../../services/notification.service";
import { Notice } from "../../interface/notice.interface";
import { CreateNotice, DeleteNotice, EditNotice, GetNotice, MarkAsReadNotice, ResentNotice, UpdateNotice } from "../action/notice.action";
import { NoticeService } from "../../services/notice.service";

export class NoticeStateModel {
  notice = {
    data: [] as Notice[],
    total: 0
  }
  selectedNotice: Notice | null;
  recentNotice: Notice | null;
}

@State<NoticeStateModel>({
  name: "notice",
  defaults: {
    notice: {
      data: [],
      total: 0
    },
    selectedNotice: null,
    recentNotice: null
  },
})
@Injectable()
export class NoticeState {
  
  constructor(private store: Store,
    private notificationService: NotificationService,
    private noticeService: NoticeService) {}

  @Selector()
  static notice(state: NoticeStateModel) {
    return state.notice;
  }

  @Selector()
  static selectedNotice(state: NoticeStateModel) {
    return state.selectedNotice;
  }

  @Selector()
  static recentNotice(state: NoticeStateModel) {
    return state.recentNotice;
  }


  @Action(GetNotice)
  getNotices(ctx: StateContext<NoticeStateModel>, action: GetNotice) {
    return this.noticeService.getNotice(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            notice: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            },
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(CreateNotice)
  create(ctx: StateContext<NoticeStateModel>, action: CreateNotice) {
    return this.noticeService.createNotice(action.payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            notice: {
                data: [...state.notice.data, result],
                total: state?.notice.total + 1
            }
        });
        },
        complete:() => {
          this.notificationService.showSuccess('Notice Created Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditNotice)
  edit(ctx: StateContext<NoticeStateModel>, { id }: EditNotice) {
    return this.noticeService.editNotice(id).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedNotice: result,
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(ResentNotice)
  recentNotice(ctx: StateContext<NoticeStateModel>, { id }: ResentNotice) {
    return this.noticeService.editNotice(id).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            recentNotice: result?.is_read === 0 ? result : null 
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateNotice)
  update(ctx: StateContext<NoticeStateModel>, { payload, id }: UpdateNotice) {
    return this.noticeService.updateNotice(id, payload).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const notices = [...state.notice.data];
            const index = notices.findIndex(notice => notice.id === id);
            notices[index] = result;

            ctx.patchState({
              ...state,
              notice: {
                data: notices,
                total: state.notice.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Notice Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(MarkAsReadNotice)
  markAsRead(ctx: StateContext<NoticeStateModel>, { id }: MarkAsReadNotice) {
    return this.noticeService.markAsRead(id).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const notices = [...state.notice.data];
            const index = notices.findIndex(notice => notice.id === id);
            notices[index] = result;
            
            ctx.patchState({
              ...state,
              notice: {
                data: notices,
                total: state.notice.total
              },
              recentNotice: null 
            });
          }
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteNotice)
  delete(ctx: StateContext<NoticeStateModel>, { id }: DeleteNotice) {
    return this.noticeService.deleteNotice(id).pipe(
      tap({
        next: () => { 
          this.store.dispatch(new GetNotice({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Notice Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }
 

}
