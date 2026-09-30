import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminLoginService } from '../../Services/admin-login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-branch',
  templateUrl: './sub-branch.component.html',
  styleUrls: ['./sub-branch.component.css']
})
export class SubBranchComponent implements OnInit {

  isSaving: boolean = false;

  userForm!: FormGroup;

  branchList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AdminLoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getBranchList();
  }

  //=========================================
  // Initialize Form
  //=========================================
  initializeForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      password: ['', Validators.required],

      role: ['', Validators.required],

      contactNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/)
        ]
      ],

      location: [''],

      address: [''],

      branchId: ['', Validators.required]
    });
  }

  //=========================================
  // Get Branch List
  //=========================================
  getBranchList(): void {
    this.authService.getBranchList().subscribe({
      next: (res: any) => {
        this.branchList = res?.data || [];
      },
      error: (err: any) => {
        console.log('Get Branch List Error:', err);
      }
    });
  }

  //=========================================
  // Create Sub Branch User
  //=========================================
  createUser(): void {
    this.userForm.markAllAsTouched();

    if (this.userForm.invalid || this.isSaving) {
      this.isSaving = false;
      return;
    }

    this.isSaving = true;

    const payload = this.userForm.value;

    this.authService.register(payload).subscribe({
      next: (response: any) => {
        this.isSaving = false;

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response?.message || 'Sub branch created successfully',
          confirmButtonColor: '#7a0000'
        }).then(() => {
          this.router.navigate(['/admin/subranch-list']);
        });
      },
      error: (err: any) => {
        this.isSaving = false;

        console.log('Create Sub Branch Error:', err);

        const backendMessage =
          err?.error?.message ||
          err?.error?.error ||
          err?.message ||
          'Something went wrong.';

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: backendMessage,
          confirmButtonColor: '#7a0000'
        });
      }
    });
  }

  //=========================================
  // Allow Only Numbers
  //=========================================
  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;

    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  //=========================================
  // Go Back
  //=========================================
  goBack(): void {
    this.router.navigate(['/admin/subranch-list']);
  }
}