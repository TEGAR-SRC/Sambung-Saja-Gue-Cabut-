import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { QuestionAnswers } from "../../interface/questions-answers.interface";

import { QuestionsAnswerService } from "../../services/questions-answer.service";

import { GetQuestionAnswers, SendQuestion, UpdateQuestionAnswers, Feedback } from "../action/questions-answers.action";

export class QuestionStateModel {
  question = {
    data: [] as QuestionAnswers[],
    total: 0
  }
}

@State<QuestionStateModel>({
  name: "question",
  defaults: {
    question: {
      data: [],
      total: 0
    },
  },
})
@Injectable()
export class QuestionAnswersState {

  constructor(private questionsAnswersService: QuestionsAnswerService ) {}

  @Selector()
  static questionsAnswers(state: QuestionStateModel) {
    return state.question;
  }

  @Action(GetQuestionAnswers)
  getQuestionAnswers(ctx: StateContext<QuestionStateModel>, action: GetQuestionAnswers) {
    this.questionsAnswersService.skeletonLoader = true;
    return this.questionsAnswersService.getQuestionAnswers(action.slug).pipe(
      tap({
        next: result => {
          ctx.patchState({
            question: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            }
          });
        },
        complete:() => {
          this.questionsAnswersService.skeletonLoader = false;
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(SendQuestion)
  sendQuestion(ctx: StateContext<QuestionStateModel>, action: SendQuestion) {
    return this.questionsAnswersService.sendQuestion(action.payload).pipe(
      tap({
        next: result => {
          const state = ctx.getState();
          ctx.patchState({
            ...state,
            question: {
              data: [...state.question.data, result],
              total: state?.question.total + 1
            }
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(UpdateQuestionAnswers)
  update(ctx: StateContext<QuestionStateModel>, { payload, id }: UpdateQuestionAnswers) {
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
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(Feedback)
  Feedback(ctx: StateContext<QuestionStateModel>, action: Feedback) {
    const state = ctx.getState();
    const question = [...state.question.data];
    const index = question.findIndex(item => Number(item.id) === Number(action.payload['question_and_answer_id']));

    if(action.type === 'liked' || action.type === 'disliked') {
      const currentReaction = question[index].reaction;
      const newReaction = action.payload['reaction'];
      if (currentReaction === newReaction) {
        if (action.type === 'liked') {
          question[index].total_likes -= 1;
        } else {
          question[index].total_dislikes -= 1;
        }
        question[index].reaction = null;
        action.payload['reaction'] = null
      } else {
        if (currentReaction === 'liked') {
          question[index].total_likes -= 1;
        } else if (currentReaction === 'disliked') {
          question[index].total_dislikes -= 1;
        }
        if (action.type === 'liked') {
          question[index].total_likes += 1;
        } else {
          question[index].total_dislikes += 1;
        }
        question[index].reaction = newReaction;
        action.payload['reaction'] = newReaction
      }
    }

    ctx.patchState({
      ...state,
      question: {
        data: question,
        total: state.question.total
      }
    });
    return this.questionsAnswersService.feedback(action.payload);
  }
}
