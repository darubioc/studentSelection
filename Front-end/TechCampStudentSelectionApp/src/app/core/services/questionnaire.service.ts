import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { QuestCategory } from '../dto/questionnaireInterface';
import { AnswAnswers } from '../dto/questionnaireInterface copy';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  localApiUrl = environment.apiRoute + 'Questionnaire'


  constructor(private http: HttpClient) { }

  getQuestionnaire():Observable<QuestCategory[]> {
    return this.http.get<QuestCategory[]>(this.localApiUrl+`/categories`);
  }
  getAnswers():Observable<AnswAnswers[]> {
    return this.http.get<AnswAnswers[]>(this.localApiUrl+'/answers');
  }
}
