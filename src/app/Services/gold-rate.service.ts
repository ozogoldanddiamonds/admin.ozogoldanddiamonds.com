import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { GoldRate } from '../models/goldRate';

@Injectable({
  providedIn: 'root'
})
export class GoldRateService {

  private apiUrl =
    environment.apiUrl;

  constructor(
    private http:
      HttpClient
  ) { }

  /*
  CREATE GOLD RATE
  */
  createGoldRate(
    data: GoldRate
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/gold-rate`,
      data
    );
  }

  /*
  GET ALL GOLD RATES
  */
  getAllGoldRates():
    Observable<any> {
    return this.http.get(
      `${this.apiUrl}/gold-rate`
    );
  }

  /*
  GET GOLD RATE BY ID
  */
  getGoldRateById(
    id: string
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/gold-rate/${id}`
    );
  }

  /*
  UPDATE GOLD RATE
  */
  updateGoldRate(
    id: string,
    data: GoldRate
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/gold-rate/${id}`,
      data
    );
  }

  /*
  DELETE GOLD RATE
  */
  deleteGoldRate(
    id: string
  ): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/gold-rate/${id}`
    );
  }
}
