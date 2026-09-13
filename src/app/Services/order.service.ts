import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl =
    environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  createOrder(data: any): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/createOrder`,

      data

    );

  }
  // ==========================================
  // GET ALL ORDERS
  // ==========================================

  getAllOrders(
    page: number = 1,
    limit: number = 10
  ): Observable<any> {

    let params =
      new HttpParams()

        .set(
          'page',
          page.toString()
        )

        .set(
          'limit',
          limit.toString()
        );


    return this.http.get(

      `${this.apiUrl}/getAllOrders`,

      {
        params
      }

    );

  }


  // ==========================
  // GET ORDER BY ID
  // ==========================

  getOrderById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-order/${id}`);
  }

  // ==========================
  // GET ORDERS BY USER
  // ==========================

  getOrdersByUser(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getOrdersByUser/${userId}`);
  }

  // ==========================
  // GET BRANCH ORDERS
  // ==========================

  getBranchOrders(branchId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getBranchOrders/${branchId}`);
  }

  // ==========================
  // GET SUB BRANCH ORDERS
  // ==========================

  getSubBranchOrders(subBranchId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getSubBranchOrders/${subBranchId}`);
  }

  cancelOrder(
    id: string,
    data: any
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/cancel-order/${id}`,

      data

    );

  }

  deleteOrder(id: string): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/delete-order/${id}`
    );

  }
  calculatePrice(data: any): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/calculatePrice`,

      data

    );

  }

  getTotalOrders() {

    return this.http.get(
      `${this.apiUrl}/total-orders`
    );

  }

}
