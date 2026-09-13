import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { SupplierPurchaseService } from 'src/app/Services/supplier-purchase.service';
import { SupplierService } from 'src/app/Services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-supplier-purchase',
  templateUrl: './add-supplier-purchase.component.html',
  styleUrls: ['./add-supplier-purchase.component.css']
})
export class AddSupplierPurchaseComponent implements OnInit {

  supplierPurchaseForm!: FormGroup;

  suppliers: any[] = [];

  selectedDocuments: File[] = [];

  existingDocuments: any[] = [];
  documentPreviews: any[] = [];
  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private supplierPurchaseService: SupplierPurchaseService,
    private router: Router,
    private alert: AlertService
  ) { }


  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.supplierPurchaseForm =
      this.fb.group({

        // =========================
        // SUPPLIER
        // =========================

        supplier: [
          '',
          Validators.required
        ],


        // =========================
        // INVOICE NUMBER
        // =========================

        invoiceNumber: [
          '',
          Validators.required
        ],


        // =========================
        // INVOICE DATE
        // =========================

        invoiceDate: [
          '',
          Validators.required
        ],


        // =========================
        // PURCHASE DATE
        // =========================

        purchaseDate: [
          new Date()
            .toISOString()
            .split('T')[0]
        ],


        // =========================
        // SUBTOTAL
        // =========================

        subtotal: [
          0
        ],


        // =========================
        // DISCOUNT
        // =========================

        discount: [
          0
        ],


        // =========================
        // TAX
        // =========================

        tax: [
          0
        ],


        // =========================
        // TOTAL AMOUNT
        // =========================

        totalAmount: [
          '',
          [
            Validators.required,
            Validators.min(0)
          ]
        ],


        // =========================
        // PAYMENT STATUS
        // =========================

        paymentStatus: [
          'PENDING'
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

        status: [
          'DRAFT'
        ]

      });


    // =========================
    // GET SUPPLIERS
    // =========================

    this.getAllSuppliers();

  }


  // =========================
  // GET ALL SUPPLIERS
  // =========================

  getAllSuppliers(): void {

    this.supplierService
      .getAllSuppliers()
      .subscribe({

        next: (response: any) => {

          console.log(
            response,
            'suppliers'
          );

          this.suppliers =
            response.data || [];

        },

        error: (error) => {

          console.error(
            error
          );

        }

      });

  }


  // =========================
  // DOCUMENT CHANGE
  // =========================

  // =========================
  // DOCUMENT CHANGE
  // =========================

  onDocumentsChange(event: any): void {



    const files = event.target.files;

    if (
      !files ||
      files.length === 0
    ) {
      this.selectedDocuments = [];
      this.documentPreviews = [];
      return;
    }


    // =========================
    // MAX 10 DOCUMENTS
    // =========================

    if (files.length > 10) {

      Swal.fire({

        icon: 'warning',

        title: 'Maximum 10 Documents',

        text:
          'You can upload a maximum of 10 documents.'

      });

      event.target.value = '';

      this.selectedDocuments = [];
      this.documentPreviews = [];

      return;
    }


    this.selectedDocuments =
      Array.from(files) as File[];


    // =========================
    // CLEAR OLD PREVIEWS
    // =========================

    this.documentPreviews = [];


    // =========================
    // CREATE PREVIEWS
    // =========================

    this.selectedDocuments.forEach(
      (file: File) => {

        if (
          file.type.startsWith('image/')
        ) {

          const reader =
            new FileReader();

          reader.onload = () => {

            this.documentPreviews.push({

              url:
                reader.result,

              name:
                file.name,

              isImage:
                true

            });

          };

          reader.readAsDataURL(file);

        }

        else {

          this.documentPreviews.push({

            url: '',

            name:
              file.name,

            isImage:
              false

          });

        }

      }
    );

  }
  isImage(url: string): boolean {

    if (!url) {
      return false;
    }

    return /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i
      .test(url);

  }

  // =========================
  // SUBMIT
  // =========================

  onSubmit(): void {

    if (
      this.supplierPurchaseForm
        .invalid
    ) {

      this.supplierPurchaseForm
        .markAllAsTouched();

      return;

    }


    const formValue =
      this.supplierPurchaseForm.value;


    // =========================
    // FORM DATA
    // =========================

    const formData =
      new FormData();


    // =========================
    // BASIC DETAILS
    // =========================

    formData.append(
      'supplier',
      formValue.supplier
    );


    formData.append(
      'invoiceNumber',
      formValue.invoiceNumber
    );


    formData.append(
      'invoiceDate',
      formValue.invoiceDate
    );


    formData.append(
      'purchaseDate',
      formValue.purchaseDate || ''
    );


    // =========================
    // AMOUNTS
    // =========================

    formData.append(
      'subtotal',
      String(
        formValue.subtotal || 0
      )
    );


    formData.append(
      'discount',
      String(
        formValue.discount || 0
      )
    );


    formData.append(
      'tax',
      String(
        formValue.tax || 0
      )
    );


    formData.append(
      'totalAmount',
      String(
        formValue.totalAmount
      )
    );


    // =========================
    // PAYMENT STATUS
    // =========================

    formData.append(
      'paymentStatus',
      formValue.paymentStatus
    );


    // =========================
    // NOTES
    // =========================

    formData.append(
      'notes',
      formValue.notes || ''
    );


    // =========================
    // STATUS
    // =========================

    formData.append(
      'status',
      formValue.status
    );


    // =========================
    // DOCUMENTS
    // =========================

    this.selectedDocuments
      .forEach(
        (file: File) => {

          formData.append(
            'documents',
            file
          );

        }
      );


    console.log(
      'Supplier Purchase FormData prepared'
    );


    // =========================
    // CREATE
    // =========================

    this.supplierPurchaseService
      .createSupplierPurchase(
        formData
      )
      .subscribe({

        next: (response) => {

          console.log(
            response
          );


          this.alert.success(
            'Supplier Purchase Created Successfully'
          );


          this.router.navigate([
            '/admin/supplier-purchase-list'
          ]);


          this.supplierPurchaseForm.reset();

          this.selectedDocuments = [];

        },


        error: (error) => {

          console.error(
            error
          );


          Swal.fire({

            icon: 'error',

            title: 'Oops...',

            text:
              error?.error?.message ||
              'Failed To Create Supplier Purchase'

          });

        }

      });

  }


  // =========================
  // BACK
  // =========================

  goBack(): void {

    this.router.navigate([
      '/admin/supplier-purchase-list'
    ]);

  }


}
