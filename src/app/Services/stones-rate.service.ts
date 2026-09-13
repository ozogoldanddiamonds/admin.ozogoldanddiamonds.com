import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class StonesRateService {

  private apiUrl =
    environment.apiUrl;

  constructor(
    private http:
      HttpClient
  ) { }

  createStoneRate(
    data: any
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/createStoneRate`,
      data
    );
  }
  getAllStoneRates():
    Observable<any> {
    return this.http.get(
      `${this.apiUrl}/getAllStoneRates`
    );
  }
  updateStoneRate(
    id: string,
    data: any
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/updateStoneRate/${id}`,
      data
    );
  }
  getStoneRateById(
    id: string
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/getStoneRateById/${id}`
    );
  }
  deleteStoneRate(
    id: string
  ): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/deleteStoneRate/${id}`
    );
  }
}
