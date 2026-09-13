import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierPurchaseItemsService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  // =========================
  // GET ALL SUPPLIER PURCHASE ITEMS
  // =========================

  getAllSupplierPurchaseItems(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/get-all-supplier-purchase-items`
    );

  }

  // =========================
  // CREATE SUPPLIER PURCHASE ITEM
  // =========================

  createSupplierPurchaseItem(
    data: any
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/create-supplier-purchase-item`,
      data
    );

  }
  // =========================
  // GET PURCHASE ITEMS
  // =========================

  getSupplierPurchaseItemById(
    id: any
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/get-purchase-items/${id}`
    );

  }

  // =========================
  // UPDATE ITEM
  // =========================

  updateSupplierPurchaseItem(
    purchaseId: any,
    data: any
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/update-supplier-purchase-item/${purchaseId}`,
      data
    );

  }
}
