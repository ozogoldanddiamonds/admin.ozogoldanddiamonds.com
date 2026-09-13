import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

    /*
  CREATE PRODUCT
  */
   /*
  CREATE PRODUCT
  */
  createProduct(
    productData: FormData
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/create-product`,

      productData

    );

  }
  assignProducts(data: any) {

  return this.http.post(

   `${this.apiUrl}/assign-multiple-products`,

    data

  );


}
 // Update Product Status
  updateProductStatus(id: string, isActive: boolean): Observable<any> {
    return this.http.patch(
      `${this.apiUrl}/product/status/${id}`,
      { isActive }
    );
  }

  /*
  GET ALL PRODUCTS
  */
  getAllProducts():
  Observable<any> {

    return this.http.get(

      `${this.apiUrl}/getAllProducts`

    );
  }


  /*
  GET PRODUCT BY ID
  */
  getProductById(
    id: string
  ): Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-product/${id}`

    );
  }


  /*
  UPDATE PRODUCT
  */
   updateProduct(
    id: string,
    productData: FormData
  ): Observable<any> {

    return this.http.put(

      `${this.apiUrl}/update-product/${id}`,

      productData

    );

  }


  /*
  DELETE PRODUCT
  */
  deleteProduct(
    id: string
  ): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/Deleteproduct/${id}`

    );
  }
  

}
