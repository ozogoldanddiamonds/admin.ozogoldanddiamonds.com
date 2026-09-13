import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

   private apiUrl =
    environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  // ======================
  // REGISTER
  // ======================

  register(
    data: any
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/register`,

      data

    );

  }
  getAllSubBranches() {

  return this.http.get(
    `${this.apiUrl}/get-all-subbranches`
  );

}
 // Get By Id

getSubBranchById(id: string) {

  return this.http.get(

    `${environment.apiUrl}/getSubBranchById/${id}`

  );

}

  // Update

  updateSubBranch(
    id: string,
    data: any
  ) {

    return this.http.put(

      `${this.apiUrl}/update-subbranch/${id}`,

      data

    );

  }
  updateSubBranchStatus(
  id: string,
  status: string
) {

  return this.http.put(

    `${environment.apiUrl}/update-subbranch-status/${id}`,

    {
      status
    }

  );

}



  // ======================
  // LOGIN
  // ======================

  login(
    data: any
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/login`,

      data

    );

  }

  // ======================
  // FORGOT PASSWORD
  // ======================

  forgotPassword(
    email: string
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/forgot-password`,

      {
        email
      }

    );

  }
  deleteSubBranch(id: string) {

  return this.http.delete(

    `${this.apiUrl}/delete-subbranch/${id}`

  );

}
getBranchList() {

  return this.http.get(
    `${this.apiUrl}/get-branch-list`
  );

}

  // ======================
  // RESET PASSWORD
  // ======================

  resetPassword(
    token: string,
    password: string
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/reset-password`,

      {
        token,
        password
      }

    );

  }


  // ======================
  // LOGOUT
  // ======================

  logout(): void {

    localStorage.removeItem(
      'token'
    );

    localStorage.removeItem(
      'user'
    );

  }

  // ======================
  // IS LOGGED IN
  // ======================

  isLoggedIn(): boolean {

    return !!localStorage.getItem(
      'token'
    );

  }

  // ======================
  // GET TOKEN
  // ======================

  getToken(): string | null {

    return localStorage.getItem(
      'token'
    );

  }



  // ======================================================================================
  getRole(): string {
  return localStorage.getItem('role') || '';
}

isBranch(): boolean {
  return this.getRole() === 'BRANCH';
}


}
