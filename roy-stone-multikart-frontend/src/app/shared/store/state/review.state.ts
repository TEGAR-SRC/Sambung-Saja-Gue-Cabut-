import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { Review } from "../../interface/review.interface";

import { NotificationService } from "../../services/notification.service";
import { ReviewService } from "../../services/review.service";

import { GetReview, SendReview, UpdateReview } from "../action/review.action";

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

  constructor(private notificationService: NotificationService,
    private reviewsService: ReviewService ) {}

  @Selector()
  static review(state: ReviewStateModel) {
    return state.review;
  }

  @Action(GetReview)
  getReview(ctx: StateContext<ReviewStateModel>, action: GetReview) {
    return this.reviewsService.getReview(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            review: {
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

  @Action(SendReview)
  sendReview(ctx: StateContext<ReviewStateModel>, action: SendReview) {
    return this.reviewsService.sendReview(action.payload).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            review: {
              data: [...state.review.data, result],
              total: state?.review.total + 1
            }
          });
        },
        complete:() => {
          this.notificationService.showSuccess('Review Send Successfully.');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateReview)
  update(ctx: StateContext<ReviewStateModel>, { payload, id }: UpdateReview) {
    return this.reviewsService.updateReview(id, payload).pipe(
      tap({
        next: result => {
          if(typeof result === 'object') {
            const state = ctx.getState();
            const reviews = [...state.review.data];
            const index = reviews.findIndex(review => review.id === id);
            reviews[index] = result;

            ctx.patchState({
              ...state,
              review: {
                data: reviews,
                total: state.review.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Review Updated Successfully.');
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
