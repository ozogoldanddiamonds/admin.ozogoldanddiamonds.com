import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { CustomDesignActionResponse, CustomDesignListResponse } from '../models/custom-design-request';

@Injectable({
  providedIn: 'root'
})
export class CustomdesignService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }


  // =========================================================
  // CUSTOMER - CREATE REQUEST
  // =========================================================

  createCustomDesignRequest(formData: FormData): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/create`,
      formData,
      {
        headers: this.getHeaders()
      }
    );
  }


  // =========================================================
  // CUSTOMER - MY REQUESTS
  // =========================================================

  getMyCustomDesignRequests(): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/custom-design/my-requests`,
      {
        headers: this.getHeaders()
      }
    );
  }


  // =========================================================
  // CUSTOMER - MY REQUEST BY ID
  // =========================================================

  getMyCustomDesignRequestById(
    id: string
  ): Observable<any> {

    return this.http.get(
      `${this.apiUrl}/costomdesigenbyid/${id}`,
      {
        headers: this.getHeaders()
      }
    );
  }


  // =========================================================
  // CUSTOMER - CANCEL REQUEST
  // =========================================================

  cancelRequest(id: string): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/cancel/${id}`,
      {},
      {
        headers: this.getHeaders()
      }
    );
  }


  // =========================================================
  // ADMIN - GET ALL REQUESTS
  // =========================================================

  getAllCustomDesignRequests(): Observable<CustomDesignListResponse> {

    return this.http.get<CustomDesignListResponse>(
      `${this.apiUrl}/allcustomdesigen`,
      {
        headers: this.getHeaders()
      }
    );
  }


  // =========================================================
  // ADMIN - GET REQUEST BY ID
  // =========================================================


  getCustomDesignRequestById(id: string): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/allcustomdesigenById/${id}`,
      {
        headers: this.getHeaders()
      }
    );
  }


  // =========================================================
  // ADMIN - UPDATE STATUS
  // =========================================================

  updateCustomDesignRequestStatus(
    id: string,
    status: string
  ): Observable<CustomDesignActionResponse> {

    return this.http.put<CustomDesignActionResponse>(
      `${this.apiUrl}/custom-design/${id}/status`,
      {
        status
      },
      {
        headers: this.getHeaders()
      }
    );
  }


  // =========================================================
  // ADMIN - UPDATE NOTES
  // =========================================================

  updateCustomDesignRequestNotes(
    id: string,
    adminNotes: string
  ): Observable<CustomDesignActionResponse> {

    return this.http.put<CustomDesignActionResponse>(
      `${this.apiUrl}/custom-design/${id}/notes`,
      {
        adminNotes
      },
      {
        headers: this.getHeaders()
      }
    );
  }


  // =========================================================
  // ADMIN - DELETE REQUEST
  // =========================================================

  deleteCustomDesignRequest(id: string): Observable<any> {

    return this.http.delete<any>(
      `${this.apiUrl}/custom-design-delet/${id}`,
      {
        headers: this.getHeaders()
      }
    );
  }



}