import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { UserScheme } from '../models/userschema';

@Injectable({
  providedIn: 'root'
})
export class UserscheemaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Create User Scheme
  createUserScheme(data: UserScheme): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/create-user-scheme`,
      data
    );

  }

  // Get All User Schemes
  getAllUserSchemes(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-all-user-schemes`

    );

  }

  // Get User Scheme By Id
  getUserSchemeById(id: string): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-user-scheme/${id}`

    );

  }

  // Update User Scheme
  updateUserScheme(id: string, data: UserScheme): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/update-user-scheme/${id}`,
      data
    );

  }

  updateUserSchemeStatus(
    id: string,
    status: string
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/update-user-scheme-status/${id}`,
      {
        status
      }
    );

  }

  // Delete User Scheme
  deleteUserScheme(id: string): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/delete-user-scheme/${id}`
    );

  }
}
