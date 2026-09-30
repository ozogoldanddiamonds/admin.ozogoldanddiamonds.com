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
  isSaving: boolean = false;
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
  [
    Validators.required,
    Validators.pattern(/^[0-9]{10}$/)
  ]
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
  '',
  [
    Validators.pattern(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/
    )
  ]
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
// =========================
// SUBMIT
// =========================

onSubmit(): void {

  // Show validation messages
  this.supplierForm.markAllAsTouched();

  // Stop here if form is invalid
  // Spinner will NOT show
  // API will NOT be called
  if (this.supplierForm.invalid) {
    this.isSaving = false;
    return;
  }

  // Start spinner only after validation passes
  this.isSaving = true;

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

      // =========================
      // SUCCESS
      // =========================

      next: (response) => {

        console.log('Create Supplier Response:', response);

        // Stop spinner
        this.isSaving = false;

        this.alert.success(
          'Created Successfully'
        );

        this.router.navigate([
          '/admin/supplier-list'
        ]);

      },

      // =========================
      // ERROR
      // =========================

      error: (error) => {

        console.error(
          'Create Supplier Error:',
          error
        );

        // Stop spinner
        this.isSaving = false;

        // Get actual backend error message
        const backendMessage =
          error?.error?.message ||
          error?.error?.error ||
          error?.message ||
          'Something went wrong while creating supplier';

        Swal.fire({

          icon: 'error',

          title: 'Unable to Create Supplier',

          text: backendMessage

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
  onPhoneInput(event: any): void {

  const input = event.target;

  // Remove anything except numbers
  input.value = input.value.replace(/[^0-9]/g, '');

  // Keep only first 10 digits
  input.value = input.value.substring(0, 10);

  // Update form value
  this.supplierForm
    .get('phone')
    ?.setValue(input.value, { emitEvent: false });
}
}
