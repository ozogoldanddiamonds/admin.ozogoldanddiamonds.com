import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class MetaKeyWordsService {
  private apiUrl = environment.apiUrl
  constructor(
    private http: HttpClient
  ) { }

  // GET: Homepage SEO Settings
  getMetaKeywordsSEO(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/get-meta-keyowords-seo`
    );
  }

  // PUT: Create or Update Homepage SEO Settings
  updateMetaKeywordsSEO(payload: any): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/update-meta-keyowords-seo`,
      payload
    );
  }

  getMetaKeywordsSEOById(id: string) {
    return this.http.get(
      `${this.apiUrl}/getMetaKeywordsSEOById/${id}`
    );
  }
}
