import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { NotificationService } from "../../services/notification.service";
import { FaqService } from "../../services/faq.service";
import { Faq } from "../../interface/faq.interface";
import { CreateFaq, DeleteAllFaq, DeleteFaq,
         EditFaq, GetFaqs, UpdateFaq,
         UpdateFaqStatus } from "../action/faq.action";

export class FaqStateModel {
  faq = {
    data: [] as Faq[],
    total: 0
  }
  selectedFaq: Faq | null;
}

@State<FaqStateModel>({
  name: "faq",
  defaults: {
    faq: {
      data: [],
      total: 0
    },
    selectedFaq: null
  },
})
@Injectable()
export class FaqState {
  
  constructor(private store: Store,
    private notificationService: NotificationService,
    private faqService: FaqService) {}

  @Selector()
  static faq(state: FaqStateModel) {
    return state.faq;
  }

  @Selector()
  static selectedFaq(state: FaqStateModel) {
    return state.selectedFaq;
  }

  @Action(GetFaqs)
  getFaqs(ctx: StateContext<FaqStateModel>, action: GetFaqs) {
    return this.faqService.getFaqs(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            faq: {
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

  @Action(CreateFaq)
  create(ctx: StateContext<FaqStateModel>, action: CreateFaq) {
    return this.faqService.createFaq(action.payload).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            faq: {
              data: [...state.faq.data, result],
              total: state?.faq.total + 1
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Faq Created Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(EditFaq)
  edit(ctx: StateContext<FaqStateModel>, { id }: EditFaq) {
    return this.faqService.editFaq(id).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedFaq: result
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateFaq)
  update(ctx: StateContext<FaqStateModel>, { payload, id }: UpdateFaq) {
    return this.faqService.updateFaq(id, payload).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const faqs = [...state.faq.data];
            const index = faqs.findIndex(faq => faq.id === id);
            faqs[index] = result;

            ctx.patchState({
              ...state,
              faq: {
                data: faqs,
                total: state.faq.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Faq Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateFaqStatus)
  updateStatus(ctx: StateContext<FaqStateModel>, { id, status }: UpdateFaqStatus) {
    return this.faqService.updateFaqStatus(id, status).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const faqs = [...state.faq.data];
            const index = faqs.findIndex(faq => faq.id === id);
            faqs[index] = result;

            ctx.patchState({
              ...state,
              faq: {
                data: faqs,
                total: state.faq.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Faq Status Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteFaq)
  delete(ctx: StateContext<FaqStateModel>, { id }: DeleteFaq) {
    return this.faqService.deleteFaq(id).pipe(
      tap({
        next: () => { 
          this.store.dispatch(new GetFaqs({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Faq Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllFaq)
  deleteAll(ctx: StateContext<FaqStateModel>, { ids }: DeleteAllFaq) {
    return this.faqService.deleteAllFaq(ids).pipe(
      tap({
        next: () => {
          this.store.dispatch(new GetFaqs({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Faqs Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
