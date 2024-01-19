import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Criteria } from '../dto/criteriaInterface';
import { RatedCandidate } from '../dto/reportInterface';

@Injectable({
  providedIn: 'root'
})
export class CandidateSelectionService {
  localApiUrl = environment.apiRoute + 'candidatesSelection'
  constructor(private http: HttpClient) { }

  postConvocation(criteria: any):Observable<any>{
    return this.http.post<any>(`${this.localApiUrl}/selectCandidates`, criteria);

  }
  getConvocations():Observable<any>{
    return this.http.get<any>(`${this.localApiUrl}/convocation`)
  }
  getCriteria(convocationId:number):Observable<Criteria[]>{
    return this.http.get<Criteria[]>(`${this.localApiUrl}/feature/${convocationId}`)
  }
  getReport(convocationId:number):Observable<RatedCandidate[]>{
    return this.http.get<RatedCandidate[]>(`${this.localApiUrl}/report/${convocationId}`)
  }

  getReportFile(convocationId: number): Observable<any>{
    return this.http.get(`${this.localApiUrl}/report/?reportType=PDF&convId=${convocationId}`
    ,{responseType: 'blob'});
  }
}
