import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  // ==========================================
  // API URL
  // ==========================================

  private apiUrl =
    environment.apiUrl;


  constructor(
    private http: HttpClient
  ) { }


  // ==========================================
  // Get All Supplier Purchases
  // ==========================================

  getAllSupplierPurchases(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-all-supplier-purchases`

    );

  }

  createSupplier(data: any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/create-supplier`,
      data
    );

  }

  // =========================
  // GET ALL SUPPLIERS
  // =========================

  getAllSuppliers(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/get-all-suppliers`
    );

  }

  // =========================
  // GET SUPPLIER BY ID
  // =========================

  getSupplierById(id: any): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/get-supplier/${id}`
    );

  }


  // =========================
  // UPDATE SUPPLIER
  // =========================

  updateSupplier(
    id: any,
    data: any
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/update-supplier/${id}`,
      data
    );
  }
}