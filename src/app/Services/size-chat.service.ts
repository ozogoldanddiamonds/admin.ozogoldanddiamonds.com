import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class SizeChatService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllSizeCharts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-all-size-charts`);
  }

  createSizeChart(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-size-chart`, formData);
  }

  updateSizeChart(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-size-chart/${id}`, formData);
  }

  getSizeChartBySubCategory(subCategoryId: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/get-size-chart-by-sub-category/${subCategoryId}`
    );
  }

  deleteSizeChart(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-size-chart/${id}`);
  }
}
