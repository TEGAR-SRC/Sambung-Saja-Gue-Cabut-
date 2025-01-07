import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../interface/core.interface';
import { Observable } from 'rxjs';
import { QnAModel, QuestionAnswers } from '../interface/questions-answers.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionsAnswerService {

  public skeletonLoader: boolean = false;

  constructor(private http: HttpClient) {}

  getQuestionAnswers(slug: Params): Observable<QnAModel> {
    return this.http.get<QnAModel>(`${environment.URL}/question-and-answer`,  { params: slug });
  }

  sendQuestion(payload: Params): Observable<QuestionAnswers> {
    return this.http.post<QuestionAnswers>(`${environment.URL}/question-and-answer`, payload);
  }

  updateQuestionAnswers(id: number, payload: Params): Observable<QuestionAnswers> {
    return this.http.put<QuestionAnswers>(`${environment.URL}/question-and-answer/${id}`, payload);
  }

  feedback(payload: Params): Observable<QuestionAnswers> {
    return this.http.post<QuestionAnswers>(`${environment.URL}/question-and-answer/feedback`, payload);
  }
}
