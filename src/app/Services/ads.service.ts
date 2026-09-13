import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environment';
import { Ads } from '../models/ads';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  private apiUrl =
    environment.apiUrl;

  constructor(
    private http:
      HttpClient
  ) { }

  createAds(formData: FormData): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/createAds`,
      formData
    );
  }

  getAllAds(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/get-all-ads`
    );
  }

  getAdsById(id: string) {

    return this.http.get(
      `${this.apiUrl}/get-ads/${id}`
    );

  }
  updateAdsStatus(
    id: string,
    section: string,
    isActive: boolean
  ) {

    return this.http.put(

      `${this.apiUrl}/updateAdsStatus/${id}`,

      {
        section,
        isActive
      }

    );

  }

  updateSection(
    id: string,
    formData: FormData
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/updateSection/${id}`,
      formData
    );
  }

  deleteAds(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/deleteAds/${id}`
    );
  }
}
