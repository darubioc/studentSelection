import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate, CreateCandidate } from '../dto/candidateInterface';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  selectedCandidate!: Candidate | undefined
  localApiUrl = environment.apiRoute + 'candidates'
  constructor(private http: HttpClient) { }

  getCandidateList(page:number = 0, size: number = 20, sort: String ="id,asc"):Observable<any>{
    return this.http.get<any>(`${this.localApiUrl}?page=${page}&size=${size}&sort=${sort}`);
  }
  createCandidate(candidate:CreateCandidate):Observable<CreateCandidate | any>{
    return this.http.post<CreateCandidate | any>(`${this.localApiUrl}/save`, candidate);
  }
  updateCandidate(candidate:CreateCandidate):Observable<any>{
    return this.http.put<any>(`${this.localApiUrl}/${candidate.id}`, candidate)
  }
  deleteCandidate(id: number):Observable<any>{
    return this.http.delete(`${this.localApiUrl}/${id}`);
  }

  getSelectedCandidate():Candidate | undefined{
    return this.selectedCandidate;
  }
  setSelectedCandidate(candidate:Candidate | undefined){
    this.selectedCandidate = candidate;
  }
  postCandidatesFile(payload: FormData): Observable<any> {
    return this.http.post(this.localApiUrl+'/upload-file', payload);
  }
}
