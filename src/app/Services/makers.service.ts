import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class MakersService {

  // ==========================================
  // API URL
  // ==========================================

  private apiUrl =
    environment.apiUrl;


  constructor(
    private http: HttpClient
  ) { }


  // ==========================================
  // CREATE MAKER
  // ==========================================

  createMaker(
    data: any
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/create-maker`,

      data

    );

  }


  // ==========================================
  // GET ALL MAKERS
  // ==========================================

  getAllMakers(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-all-makers`

    );

  }


  // ==========================================
  // GET ACTIVE MAKERS
  // ==========================================

  getActiveMakers(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-active-makers`

    );

  }


  // ==========================================
  // GET MAKER BY ID
  // ==========================================

  getMakerById(
    id: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-maker/${id}`

    );

  }


  // ==========================================
  // UPDATE MAKER
  // ==========================================

  updateMaker(
    id: string,
    data: any
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/update-maker/${id}`,

      data

    );

  }


  // ==========================================
  // UPDATE MAKER STATUS
  // ==========================================

  updateMakerStatus(
    id: string,
    isActive: boolean
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/update-maker-status/${id}`,

      {
        isActive
      }

    );

  }


  // ==========================================
  // DELETE MAKER
  // ==========================================

  deleteMaker(
    id: string
  ): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/delete-maker/${id}`

    );

  }
}
