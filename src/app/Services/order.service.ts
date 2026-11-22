import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createOrder(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/createOrder`,

      data,
    );
  }
  // ==========================================
  // GET ALL ORDERS
  // ==========================================

  getAllOrders(page: number = 1, limit: number = 10): Observable<any> {
    let params = new HttpParams()

      .set('page', page.toString())

      .set('limit', limit.toString());

    return this.http.get(
      `${this.apiUrl}/getAllOrders`,

      {
        params,
      },
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

  cancelOrder(id: string, data: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/cancel-order/${id}`,

      data,
    );
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-order/${id}`);
  }
  calculatePrice(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/calculatePrice`,

      data,
    );
  }

  getTotalOrders() {
    return this.http.get(`${this.apiUrl}/total-orders`);
  }

  saveShipmentPackages(orderId: string, boxes: any[]) {
    return this.http.put(`${this.apiUrl}/orders/${orderId}/shipment-packages`, {
      boxes,
    });
  }

  bookSequelShipment(orderId: string) {
    return this.http.post(`${this.apiUrl}/orders/${orderId}/book-shipment`, {});
  }

  getSequelShipmentTracking(orderId: string) {
    return this.http.get(`${this.apiUrl}/orders/${orderId}/track-shipment`);
  }

  trackMultipleOrders(orderIds: string[]) {
    return this.http.post<any>(`${this.apiUrl}/orders/track-shipments/bulk`, {
      orderIds,
    });
  }

  cancelSequelShipment(orderId: string, cancelReason: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders/${orderId}/cancel-shipment`, {
      cancelReason,
    });
  }

  downloadOrderPOD(
    orderId: string,
    data: { fromDate: string; toDate: string },
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/orders/${orderId}/download-pod`,
      data,
    );
  }

  getCustomerOrders() {
    return this.http.get(`${this.apiUrl}/admin/orders/customers`);
  }

  getAllBranchOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/orders/branch`);
  }

  getAllSubOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/orders/sub-branch`);
  }
}
