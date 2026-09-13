import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

    private apiUrl =
      environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // CREATE

  createEmployee(
    data: FormData
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/create-employee`,

      data

    );

  }
  // branch by employee
  getBranchEmployees() {

  return this.http.get(

    `${this.apiUrl}/branch-employees`,

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

  // GET ALL

  getAllEmployees():
    Observable<any> {

    return this.http.get(

      `${this.apiUrl}/get-all-employees`

    );

  }

  // GET BY ID

 getEmployeeById(id: string) {

    return this.http.get(

      `${this.apiUrl}/get-employeebyid/${id}`,

      this.getHeaders()

    );

  }

  // UPDATE

updateEmployee(id: string, data: FormData) {
  return this.http.put(
    `${this.apiUrl}/update-employee/${id}`,
    data,
   
  );
}

  // DELETE

  deleteEmployee(
    id: string
  ): Observable<any> {

    return this.http.delete(

      `${this.apiUrl}/delete-employee/${id}`

    );

  }
}
