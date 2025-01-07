import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Params } from '../interface/core.interface';
import { QnAModel, QuestionAnswers } from '../interface/questions-answers.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionsAnswersService {

  constructor(private http: HttpClient) { }

  getQuestionAnswers(payload?: Params): Observable<QnAModel> {
    return this.http.get<QnAModel>(`${environment.URL}/question-and-answer`, { params: payload });
  }

  editQuestionAnswers(id: number): Observable<QuestionAnswers> {
    return this.http.get<QuestionAnswers>(`${environment.URL}/question-and-answer/${id}`);
  }

  updateQuestionAnswers(id: number, payload: Params): Observable<QuestionAnswers> {
    return this.http.put<QuestionAnswers>(`${environment.URL}/question-and-answer/${id}`, payload);
  }

  deleteQuestionAnswers(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.URL}/question-and-answer/${id}`);
  }

  deleteAllQuestionAnswers(ids: number[]): Observable<number> {
    return this.http.post<number>(`${environment.URL}/question-and-answer/deleteAll`, {ids: ids});
  }

}
