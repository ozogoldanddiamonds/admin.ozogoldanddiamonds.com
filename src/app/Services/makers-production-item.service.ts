import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class MakersProductionItemService {
  // ==========================================
  // API URL
  // ==========================================

  private apiUrl =
    environment.apiUrl;


  constructor(
    private http: HttpClient
  ) { }


  // ==========================================
  // CREATE
  // ==========================================

  createMakerProductionItem(
    data: any
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/create-maker-production-item`,

      data

    );

  }


  // ==========================================
  // GET ALL
  // ==========================================

  getAllMakerProductionItems(): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-all-maker-production-items`

    );

  }


  // ==========================================
  // GET BY PRODUCTION
  // ==========================================

  getProductionItems(
    productionId: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-production-items/${productionId}`

    );

  }
  // ==========================================
  // GET MAKER PRODUCTION ITEM BY ID
  // ==========================================

  getMakerProductionItemById(
    id: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-maker-production-item/${id}`

    );

  }

  // ==========================================
  // GET BY PRODUCT
  // ==========================================

  getProductProductionItems(
    productId: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-product-production-items/${productId}`

    );

  }


  // ==========================================
  // GET BY VARIANT
  // ==========================================

  getVariantProductionItems(
    variantId: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-variant-production-items/${variantId}`

    );

  }


  // ==========================================
  // UPDATE
  // ==========================================

  updateMakerProductionItem(
    id: string,
    data: any
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/update-maker-production-item/${id}`,

      data

    );

  }


  // ==========================================
  // DELETE
  // ==========================================

  deleteMakerProductionItem(
    id: string
  ): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/delete-maker-production-item/${id}`

    );

  }

}
