import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/getallcategory`);
  }

  // Add a new Category
  // addCategory(Category: Category): Observable<Category> {
  //   return this.http.post< Category>(this.apiUrl + "category", Category);
  // }

  /*
 CREATE CATEGORY
 */
  createCategory(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-category`, formData);
  }

  uploadImage(formData: FormData): Observable<{ imageUrl: string }> {
    return this.http.post<{ imageUrl: string }>(this.apiUrl + 'upload', formData);
  }

  /*
UPDATE CATEGORY
*/
  updateCategory(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatecategory/${id}`, formData);
  }
  /*
GET BY ID
*/
  getCategoryById(id: string) {
    return this.http.get(`${this.apiUrl}/getbyIdcategory/${id}`);
  }
  deleteCategory(id: string) {
    return this.http.delete(`${this.apiUrl}/deletecategory/${id}`
    );
  }
}

