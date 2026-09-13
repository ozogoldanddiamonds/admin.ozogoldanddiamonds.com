import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class MakersProductionService {


  // ==========================================
  // API URL
  // ==========================================

  private apiUrl =
    environment.apiUrl;


  constructor(
    private http: HttpClient
  ) { }


  // ==========================================
  // GET ALL MAKER PRODUCTIONS
  // ==========================================

  getAllMakerProductions(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-all-maker-productions`

    );

  }


  // ==========================================
  // GET MAKER PRODUCTION BY ID
  // ==========================================

  getMakerProductionById(
    id: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-maker-production/${id}`

    );

  }


  // ==========================================
  // GET PRODUCTIONS BY MAKER
  // ==========================================

  getMakerProductionsByMaker(
    makerId: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-maker-productions/${makerId}`

    );

  }


  // ==========================================
  // CREATE
  // ==========================================

  createMakerProduction(
    data: any
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/create-maker-production`,

      data

    );

  }


  // ==========================================
  // UPDATE
  // ==========================================

  updateMakerProduction(
    id: string,
    data: any
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/update-maker-production/${id}`,

      data

    );

  }


  // ==========================================
  // UPDATE STATUS
  // ==========================================

  updateMakerProductionStatus(
    id: string,
    status: string
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/update-maker-production-status/${id}`,

      {
        status
      }

    );

  }


  // ==========================================
  // DELETE
  // ==========================================

  deleteMakerProduction(
    id: string
  ): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/delete-maker-production/${id}`

    );

  }
}
