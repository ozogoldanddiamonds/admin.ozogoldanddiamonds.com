import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { SupplierService } from 'src/app/Services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-suppliers',
  templateUrl: './create-suppliers.component.html',
  styleUrls: ['./create-suppliers.component.css']
})
export class CreateSuppliersComponent {
  supplierForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private router: Router,
    private alert: AlertService
  ) {

    this.supplierForm = this.fb.group({

      // =========================
      // SUPPLIER NAME
      // =========================

      name: [
        '',
        Validators.required
      ],

      // =========================
      // COMPANY NAME
      // =========================

      companyName: [
        ''
      ],

      // =========================
      // PHONE
      // =========================

      phone: [
        '',
        Validators.required
      ],

      // =========================
      // EMAIL
      // =========================

      email: [
        '',
        Validators.email
      ],

      // =========================
      // GST NUMBER
      // =========================

      gstNumber: [
        ''
      ],

      // =========================
      // ADDRESS
      // =========================

      addressLine1: [
        ''
      ],

      addressLine2: [
        ''
      ],

      city: [
        ''
      ],

      state: [
        ''
      ],

      pincode: [
        ''
      ],

      country: [
        'India'
      ],

      // =========================
      // NOTES
      // =========================

      notes: [
        ''
      ],

      // =========================
      // ACTIVE STATUS
      // =========================

      isActive: [
        true
      ]

    });

  }


  // =========================
  // SUBMIT
  // =========================

  onSubmit(): void {

    if (this.supplierForm.invalid) {

      this.supplierForm.markAllAsTouched();

      return;

    }

    const formValue = this.supplierForm.value;

    // =========================
    // PREPARE DATA
    // =========================

    const supplierData = {

      name: formValue.name,

      companyName:
        formValue.companyName,

      phone:
        formValue.phone,

      email:
        formValue.email,

      gstNumber:
        formValue.gstNumber,

      address: {

        addressLine1:
          formValue.addressLine1?.trim() || '',

        addressLine2:
          formValue.addressLine2?.trim() || '',

        city:
          formValue.city?.trim() || '',

        state:
          formValue.state?.trim() || '',

        pincode:
          formValue.pincode?.trim() || '',

        country:
          formValue.country?.trim() || 'India'

      },

      notes:
        formValue.notes,

      isActive:
        formValue.isActive

    };


    // =========================
    // CREATE SUPPLIER
    // =========================

    this.supplierService
      .createSupplier(supplierData)
      .subscribe({

        next: (response) => {

          this.alert.success(
            'Created Successfully'
          );

          this.router.navigate([
            '/admin/supplier-list'
          ]);

        },

        error: (error) => {

          console.error(error);

          Swal.fire({

            icon: 'error',

            title: 'Oops...',

            text:
              error?.error?.message ||
              'Create Failed'

          });

        }

      });

  }


  // =========================
  // BACK
  // =========================

  goBack(): void {

    this.router.navigate([
      '/admin/supplier-list'
    ]);

  }
}
