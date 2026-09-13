import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminLoginService } from 'src/app/Services/admin-login.service';
import { AlertService } from 'src/app/Services/alert.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  employeeForm!: FormGroup;

  loading = false;

  photo!: File;

  aadhaarImage!: File;

  photoPreview: any = '';

  aadhaarPreview: any = '';

  subBranches: any[] = [];

  constructor(

    private fb: FormBuilder,

    private employeeService: EmployeeService,

    private adminService: AdminLoginService,

    private alert: AlertService,

    private router: Router

  ) {}

  ngOnInit(): void {

    this.employeeForm = this.fb.group({

      firstName: [
        '',
        Validators.required
      ],

      lastName: [
        '',
        Validators.required
      ],

      contactNumber: [

        '',

        [

          Validators.required,

          Validators.pattern('^[0-9]{10}$')

        ]

      ],

      role: [

        '',

        Validators.required

      ],

      subBranchId: [

        '',

        Validators.required

      ],

      address: [

        '',

        Validators.required

      ],

      location: [

        '',

        Validators.required

      ]

    });

    this.getSubBranches();

  }

  // Get Sub Branches

  getSubBranches() {
    console.log(this.photo);

console.log(this.aadhaarImage);

    this.adminService
      .getAllSubBranches()
      .subscribe({

        next: (res: any) => {

          this.subBranches = res.data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // Employee Photo

  onPhotoChange(event: any) {

    if (event.target.files.length > 0) {

      this.photo = event.target.files[0];

      const reader = new FileReader();

      reader.onload = () => {

        this.photoPreview = reader.result;

      };

      reader.readAsDataURL(this.photo);

    }

  }

  // Aadhaar Image

  onAadhaarChange(event: any) {

    if (event.target.files.length > 0) {

      this.aadhaarImage = event.target.files[0];

      const reader = new FileReader();

      reader.onload = () => {

        this.aadhaarPreview = reader.result;

      };

      reader.readAsDataURL(this.aadhaarImage);

    }

  }

  // Create Employee

  createEmployee() {

    if (this.employeeForm.invalid) {

      this.employeeForm.markAllAsTouched();

      return;

    }

    const formData = new FormData();

    formData.append(
      'firstName',
      this.employeeForm.value.firstName
    );

    formData.append(
      'lastName',
      this.employeeForm.value.lastName
    );

    formData.append(
      'contactNumber',
      this.employeeForm.value.contactNumber
    );

    formData.append(
      'role',
      this.employeeForm.value.role
    );

    formData.append(
      'subBranchId',
      this.employeeForm.value.subBranchId
    );

    formData.append(
      'address',
      this.employeeForm.value.address
    );

    formData.append(
      'location',
      this.employeeForm.value.location
    );

    if (this.photo) {

      formData.append(
        'photo',
        this.photo
      );

    }

    if (this.aadhaarImage) {

      formData.append(
        'aadhaarImage',
        this.aadhaarImage
      );

    }

    this.loading = true;

    this.employeeService
      .createEmployee(formData)
      .subscribe({

        next: (res: any) => {

          this.loading = false;

          this.alert.success(
            res.message || 'Employee Created Successfully'
          );

          setTimeout(() => {

            this.router.navigate([
              '/admin/employee-list'
            ]);

          }, 2000);

        },

        error: (err: any) => {

          this.loading = false;

          console.log(err);

          this.alert.error(

            err?.error?.message ||

            'Failed To Create Employee'

          );

        }

      });

  }

  goBack() {

    this.router.navigate([
      '/admin/employee-list'
    ]);

  }

}