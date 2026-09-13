import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierPurchaseService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  // =========================
  // GET ALL SUPPLIER PURCHASES
  // =========================

  getAllSupplierPurchases(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/get-all-supplier-purchases`
    );

  }

  deleteSupplierPurchase(
    id: any
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/delete-supplier-purchase/${id}`
    );

  }



  // =========================
  // CREATE SUPPLIER PURCHASE
  // =========================

  createSupplierPurchase(
    formData: FormData
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/create-supplier-purchase`,
      formData
    );

  }

  getSupplierPurchaseById(
    id: any
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/get-supplier-purchase/${id}`
    );

  }


  updateSupplierPurchase(
    id: any,
    formData: FormData
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/update-supplier-purchase/${id}`,
      formData
    );

  }
}
