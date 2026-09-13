import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Coupon } from '../models/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // CREATE

  createCoupon(
    data: Coupon
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/create-coupon`,

      data

    );

  }

  // GET ALL

  getAllCoupons():
    Observable<any> {

    return this.http.get(

      `${this.apiUrl}/getall-coupon`

    );

  }

  // GET BY ID

  getCouponById(
    id: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/getbyid-coupon/${id}`

    );

  }

  // UPDATE

  updateCoupon(
    id: string,
    data: Coupon
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/updatecoupon/${id}`,

      data

    );

  }

  // DELETE

  deleteCoupon(
    id: string
  ): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/Deletecoupon/${id}`

    );

  }
}
