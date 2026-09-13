import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Scheme } from '../models/scheme';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // ==========================
  // Create Scheme
  // ==========================

  createScheme(data: Scheme): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/create-scheme`,

      data

    );

  }

  // ==========================
  // Get All Schemes
  // ==========================

  getAllSchemes(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-all-schemes`

    );

  }

  // ==========================
  // Get Scheme By Id
  // ==========================

  getSchemeById(id: string): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-scheme/${id}`

    );

  }

  // ==========================
  // Update Scheme
  // ==========================

  updateScheme(id: string, data: Scheme): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/update-scheme/${id}`,

      data

    );

  }

  // ==========================
  // Update Scheme Status
  // ==========================

  updateSchemeStatus(
    id: string,
    isActive: boolean
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/update-scheme-status/${id}`,

      {
        isActive
      }

    );

  }

  // ==========================
  // Delete Scheme
  // ==========================

  deleteScheme(id: string): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/delete-scheme/${id}`

    );

  }

}