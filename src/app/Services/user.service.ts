import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl =
    environment.apiUrl;

  constructor(
    private http:
      HttpClient
  ) { }

  /*
  GET ALL USERS
  */
  getAllUsers():
    Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}/getAllUsers`
    );
  }


  /*
  GET USERS COUNT
  */
  getUsersCount():
    Observable<any> {
    return this.http.get(
      `${this.apiUrl}/getUsersCount`
    );
  }
}
