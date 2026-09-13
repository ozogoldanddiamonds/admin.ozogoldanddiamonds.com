import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

 private apiUrl =
    environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getAllReviews():
    Observable<any> {

    return this.http.get(

      `${this.apiUrl}/getall-review`

    );

  }

  getReviewById(
    id: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/getbyid-review/${id}`

    );

  }
   deleteReview(
    id: string
  ): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/delete-review/${id}`

    );

  }

}
