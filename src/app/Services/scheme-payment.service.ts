import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class SchemePaymentService {
 private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // ==========================
  // Get All Payments
  // ==========================

  getAllPayments(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-all-payments`

    );

  }

  // ==========================
  // Get Payment By Id
  // ==========================

  getPaymentById(id: string): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-payment/${id}`

    );

  }
}
