import { Injectable } from "@angular/core";
import { Store, Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { NotificationService } from "../../services/notification.service";
import { QuestionsAnswersService } from "../../services/questions-answers.service";
import { GetQuestionAnswers, EditQuestionAnswers, UpdateQuestionAnswers, 
    DeleteAllQuestionAnswers, DeleteQuestionAnswers } from "../action/questions-answers.action";
import { QuestionAnswers } from "../../interface/questions-answers.interface";

export class QuestionAnswersStateModel {
  question = {
    data: [] as QuestionAnswers[],
    total: 0
  }
  selectedQuestion: QuestionAnswers | null;
}

@State<QuestionAnswersStateModel>({
  name: "question",
  defaults: {
    question: {
      data: [],
      total: 0
    },
    selectedQuestion: null
  },
})
@Injectable()
export class QuestionAnswersState {
  
  constructor(private store: Store,
    private notificationService: NotificationService,
    private questionsAnswersService: QuestionsAnswersService) {}

  @Selector()
  static questionAnswers(state: QuestionAnswersStateModel) {
    return state.question;
  }

  @Selector()
  static selectedQuestionAnswers(state: QuestionAnswersStateModel) {
    return state.selectedQuestion;
  }

  @Action(GetQuestionAnswers)
  getQuestionAnswers(ctx: StateContext<QuestionAnswersStateModel>, action: GetQuestionAnswers) {
    return this.questionsAnswersService.getQuestionAnswers(action.payload).pipe(
      tap({
        next: result => { 
          ctx.patchState({
            question: {
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

  @Action(EditQuestionAnswers)
  edit(ctx: StateContext<QuestionAnswersStateModel>, { id }: EditQuestionAnswers) {
    return this.questionsAnswersService.editQuestionAnswers(id).pipe(
      tap({
        next: result => { 
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            selectedQuestion: result
          });
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateQuestionAnswers)
  update(ctx: StateContext<QuestionAnswersStateModel>, { payload, id }: UpdateQuestionAnswers) {
    return this.questionsAnswersService.updateQuestionAnswers(id, payload).pipe(
      tap({
        next: result => { 
          if(typeof result === 'object') {
            const state = ctx.getState();
            const questions = [...state.question.data];
            const index = questions.findIndex(question => question.id === id);
            questions[index] = result;

            ctx.patchState({
              ...state,
              question: {
                data: questions,
                total: state.question.total
              }
            });
          }
        },
        complete:() => {
          this.notificationService.showSuccess('Q&A Updated Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteQuestionAnswers)
  delete(ctx: StateContext<QuestionAnswersStateModel>, { id }: DeleteQuestionAnswers) {
    return this.questionsAnswersService.deleteQuestionAnswers(id).pipe(
      tap({
        next: () => { 
          this.store.dispatch(new GetQuestionAnswers({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Q&A Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(DeleteAllQuestionAnswers)
  deleteAll(ctx: StateContext<QuestionAnswersStateModel>, { ids }: DeleteAllQuestionAnswers) {
    return this.questionsAnswersService.deleteAllQuestionAnswers(ids).pipe(
      tap({
        next: () => {
          this.store.dispatch(new GetQuestionAnswers({'page': 1, 'paginate': 15}));
        },
        complete:() => {
          this.notificationService.showSuccess('Q&A Deleted Successfully');
        },
        error: err => { 
          throw new Error(err?.error?.message);
        }
      })
    );
  }
}
