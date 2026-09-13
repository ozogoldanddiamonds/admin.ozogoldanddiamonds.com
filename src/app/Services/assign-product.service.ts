import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { AssignedProduct } from '../models/assign-product.model';

@Injectable({
  providedIn: 'root'
})
export class AssignProductService {


  private apiUrl =
    environment.apiUrl;

  constructor(
    private http:
      HttpClient
  ) { }



  // assignProduct(
  //   data: AssignProduct
  // ): Observable<any> {

  //   return this.http.post(

  //     `${this.apiUrl}/assign-product`,

  //     data,

  //     this.getHeaders()

  //   );

  // }
  getAssignedProductsBySubBranch(subBranchId: string) {

    return this.http.get(

      environment.apiUrl +

      '/assigned-products/' +

      subBranchId

    );

  }
  getMyAssignedProducts() {

    return this.http.get(

      this.apiUrl +

      "/my-assigned-products",

      this.getHeaders()

    );

  }

  getAssignedProducts() {

    return this.http.get(

      `${this.apiUrl}/assigned-products`,

      this.getHeaders()

    );

  }
  // 👇 Ikkada add cheyyi
  getHeaders() {

    const token = localStorage.getItem('token');

    console.log("TOKEN =>", token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    console.log("AUTH HEADER =>", headers.get('Authorization'));

    return { headers };

  }
  assignProducts(data: any): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/assign-multiple-products`,

      data,

      this.getHeaders()

    );

  }

  returnProduct(
    data: any
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/return-product`,

      data,

      this.getHeaders()

    );

  }
}
