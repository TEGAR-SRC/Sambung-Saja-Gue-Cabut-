import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { GetReviews, DeleteReview, DeleteAllReview  } from "../action/review.action";
import { Review } from "../../interface/review.interface";
import { ReviewService } from "../../services/review.service";
import { NotificationService } from "../../services/notification.service";

export class ReviewStateModel {
  review = {
    data: [] as Review[],
    total: 0
  }
}

@State<ReviewStateModel>({
  name: "review",
  defaults: {
    review: {
      data: [],
      total: 0
    },
  },
})

@Injectable()
export class ReviewState {
  
  constructor(private store: Store,
    private notificationService: NotificationService, 
    private reviewService: ReviewService) {}

  @Selector()
  static review(state: ReviewStateModel) {
    return state.review;
  }

  @Action(GetReviews)
  getReviews(ctx: StateContext<ReviewStateModel>, action: GetReviews) {
    return this.reviewService.getReviews(action?.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            review: {
              data: result.data,
              total: result?.total ? result?.total : result.data.length
            }
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteReview)
  delete(ctx: StateContext<ReviewStateModel>, { id }: DeleteReview) {
    return this.reviewService.deleteReview(id).pipe(
      tap({
        next: () => { 
          this.store.dispatch(new GetReviews({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Review Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }
  
  @Action(DeleteAllReview)
  deleteAll(ctx: StateContext<ReviewStateModel>, { ids }: DeleteAllReview) {
    return this.reviewService.deleteAllReview(ids).pipe(
      tap({
        next: () => {
          this.store.dispatch(new GetReviews({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Review Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }
  
} 