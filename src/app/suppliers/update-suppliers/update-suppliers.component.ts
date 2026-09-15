import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { SupplierService } from 'src/app/Services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-suppliers',
  templateUrl: './update-suppliers.component.html',
  styleUrls: ['./update-suppliers.component.css']
})
export class UpdateSuppliersComponent implements OnInit {
  isViewMode: boolean = false;
  isSaving: boolean = false;
  supplierForm!: FormGroup;

  supplierId: any;


  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private alert: AlertService
  ) {

    this.supplierForm = this.fb.group({

      id: [''],

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
      // STATUS
      // =========================

      isActive: [
        true
      ]

    });

  }


  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.supplierId =
      this.activeRoute.snapshot
        .paramMap.get('id')!;

    console.log(
      this.supplierId,
      'supplier id'
    );
    // =========================
    // CHECK VIEW MODE
    // =========================

    this.isViewMode =
      this.activeRoute.snapshot
        .queryParamMap
        .get('mode') === 'view';

    this.getSupplierById();

  }


  // =========================
  // GET SUPPLIER BY ID
  // =========================

  getSupplierById(): void {

    this.supplierService
      .getSupplierById(this.supplierId)
      .subscribe({

        next: (response: any) => {

          const supplier =
            response.data;

          console.log(
            supplier,
            'supplier details'
          );


          // =========================
          // PATCH FORM
          // =========================

          this.supplierForm.patchValue({

            id:
              supplier._id,

            name:
              supplier.name,

            companyName:
              supplier.companyName,

            phone:
              supplier.phone,

            email:
              supplier.email,

            gstNumber:
              supplier.gstNumber,


            // =========================
            // ADDRESS
            // =========================

            addressLine1:
              supplier.address?.addressLine1 || '',

            addressLine2:
              supplier.address?.addressLine2 || '',

            city:
              supplier.address?.city || '',

            state:
              supplier.address?.state || '',

            pincode:
              supplier.address?.pincode || '',

            country:
              supplier.address?.country || 'India',


            notes:
              supplier.notes,

            isActive:
              supplier.isActive

          });


          // =========================
          // VIEW MODE
          // =========================

          if (this.isViewMode) {

            this.supplierForm.disable();

          }

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  // =========================
  // SUBMIT
  // =========================

  onSubmit(): void {
    this.isSaving = true;
    console.log(
      this.supplierForm.value,
      'update values'
    );


    if (this.supplierForm.invalid) {

      this.supplierForm.markAllAsTouched();

      return;

    }


    const formValue =
      this.supplierForm.value;


    // =========================
    // PREPARE DATA
    // =========================

    const supplierData = {

      name:
        formValue.name,

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
    // UPDATE SUPPLIER
    // =========================

    this.supplierService
      .updateSupplier(
        this.supplierId,
        supplierData
      )
      .subscribe({

        next: (response) => {

          this.alert.success(
            'Updated Successfully'
          );
          this.isSaving = true;
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
              'Updated Failed'

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
