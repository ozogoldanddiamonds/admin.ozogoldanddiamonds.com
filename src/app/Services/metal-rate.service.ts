import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetalRateService {
  private apiUrl =
    environment.apiUrl;

  constructor(
    private http:
      HttpClient
  ) { }

  createMetalRate(
    data: any
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/createMetalRate`,
      data
    );
  }
  getAllMetalRates():
    Observable<any> {
    return this.http.get(
      `${this.apiUrl}/getAllMetalRates`
    );
  }
  updateMetalRate(
    id: string,
    data: any
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/updateMetalRate/${id}`,
      data
    );
  }
  getMetalRateById(
    id: string
  ): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/getMetalRateById/${id}`
    );
  }
  deleteMetalRate(
    id: string
  ): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/deleteMetalRate/${id}`
    );
  }
}
