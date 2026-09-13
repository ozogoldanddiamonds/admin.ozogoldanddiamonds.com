import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminLoginService } from '../Services/admin-login.service';
import { AlertService } from '../Services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  role: string = '';
  selectedRole = '';
  showPassword = false;

  isLogin = true;

  authForm!: FormGroup;

  constructor(

    private router: Router,

    private fb: FormBuilder,
    private alertService: AlertService,

    private authService: AdminLoginService

  ) {

    this.initializeForm();

  }
  ngOnInit(): void {
    this.role =
      localStorage.getItem('role') || '';

    console.log(
      'ROLE =>',
      this.role
    );
  }

  // =====================
  // FORM INIT
  // =====================

  initializeForm(): void {

    this.authForm =
      this.fb.group({

        name: [''],
        role: [''],
        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],

        password: [
          '',
          Validators.required
        ]

      });

  }

  // =====================
  // LOGIN / REGISTER TOGGLE
  // =====================

  signupForm(): void {

    this.isLogin =
      !this.isLogin;

    if (this.isLogin) {

      this.authForm
        .get('name')
        ?.clearValidators();

    }

    else {

      this.authForm
        .get('name')
        ?.setValidators(
          Validators.required
        );

    }

    this.authForm
      .get('name')
      ?.updateValueAndValidity();

  }
  togglePassword() {

    this.showPassword =
      !this.showPassword;

  }

  // =====================
  // SUBMIT
  // =====================

  onSubmit() {

    if (!this.selectedRole) {

      this.alertService.error(
        'Please Select Role'
      );

      return;
    }

    const loginData = {

      email: this.authForm.value.email,

      password: this.authForm.value.password

    };

    this.authService.login(loginData)
      .subscribe({

        next: (res: any) => {

          console.log(res);
          console.log('SELECTED ROLE =>', this.selectedRole);
          console.log('API ROLE =>', res.role);
          console.log('API RESPONSE =>', res);

          // Role Validation
          if (
            this.selectedRole !== res.role
          ) {

            this.alertService.error(
              'Selected Role Not Matched'
            );

            return;
          }

          // Save Login Data
          localStorage.setItem(
            'token',
            res.token
          );

          localStorage.setItem(
            'role',
            res.role
          );

          localStorage.setItem(
            'name',
            res.name
          );

          localStorage.setItem(
            'email',
            res.email
          );

          localStorage.setItem(
            'adminId',
            res._id
          );

          // Branch Login
          if (
            res.role === 'BRANCH'
          ) {

            this.router.navigate([
              '/admin/dashboard'
            ]);

          }

          // Sub Branch Login
          else if (
            res.role === 'SUB_BRANCH'
          ) {

            this.router.navigate([
              '/SUB_BRANCH/dashboard'
            ]);

          }

        },

        error: (err) => {

          this.alertService.error(
            err.error?.message ||
            'Something went wrong'
          );

        }

      });

  }

  // =====================
  // FORGOT PASSWORD
  // =====================

  forgotPassword(): void {

    const email = this.authForm.value.email;

    if (!email) {

      this.alertService.error(
        'Please enter your email'
      );

      return;
    }

    this.authService
      .forgotPassword(email)
      .subscribe({

        next: (response: any) => {

          this.alertService.success(
            response.message ||
            'Reset link sent successfully'
          );

        },

        error: (error) => {

          this.alertService.error(
            error?.error?.message ||
            'Something went wrong'
          );

        }

      });

  }

}
