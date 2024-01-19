import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { typeObject } from '../dto/typeInterface';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {
  localApiUrl = environment.apiRoute + 'documentType'

  constructor(private http: HttpClient) { }

  getDocumentTypes():Observable<typeObject[]> {
    return this.http.get<typeObject[]>(this.localApiUrl);
  }

}
