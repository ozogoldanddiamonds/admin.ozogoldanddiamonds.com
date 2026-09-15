import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { SupplierPurchaseService } from 'src/app/Services/supplier-purchase.service';
import { SupplierService } from 'src/app/Services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-supplier-purchase',
  templateUrl: './update-supplier-purchase.component.html',
  styleUrls: ['./update-supplier-purchase.component.css']
})
export class UpdateSupplierPurchaseComponent implements OnInit {
  existingDocuments: any[] = [];
  documentPreviews: any[] = [];
  supplierPurchaseForm!: FormGroup;
  isSaving: boolean = false;
  purchaseId: any;

  suppliers: any[] = [];

  selectedDocuments: File[] = [];


  isViewMode: boolean = false;


  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private supplierPurchaseService:
      SupplierPurchaseService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private alert: AlertService
  ) {

    this.supplierPurchaseForm =
      this.fb.group({

        id: [''],

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
          ''
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

  }


  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.purchaseId =
      this.activeRoute.snapshot
        .paramMap.get('id')!;


    // =========================
    // VIEW MODE
    // =========================

    this.isViewMode =
      this.activeRoute.snapshot
        .queryParamMap
        .get('mode') === 'view';


    console.log(
      this.purchaseId,
      'purchase id'
    );


    console.log(
      this.isViewMode,
      'view mode'
    );


    // =========================
    // GET SUPPLIERS
    // =========================

    this.getAllSuppliers();


    // =========================
    // GET PURCHASE
    // =========================

    this.getSupplierPurchaseById();

  }


  // =========================
  // GET ALL SUPPLIERS
  // =========================

  getAllSuppliers(): void {

    this.supplierService
      .getAllSuppliers()
      .subscribe({

        next: (response: any) => {

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
  // GET PURCHASE BY ID
  // =========================

  getSupplierPurchaseById(): void {

    this.supplierPurchaseService
      .getSupplierPurchaseById(
        this.purchaseId
      )
      .subscribe({

        next: (response: any) => {

          const purchase =
            response.data;


          console.log(
            purchase,
            'supplier purchase details'
          );


          // =========================
          // EXISTING DOCUMENTS
          // =========================

          this.existingDocuments =
            purchase.documents || [];


          // =========================
          // SUPPLIER ID
          // =========================

          const supplierId =
            purchase.supplier?._id ||
            purchase.supplier;


          // =========================
          // PATCH FORM
          // =========================

          this.supplierPurchaseForm
            .patchValue({

              id:
                purchase._id,

              supplier:
                supplierId,

              invoiceNumber:
                purchase.invoiceNumber,

              invoiceDate:
                purchase.invoiceDate
                  ?.split('T')[0],

              purchaseDate:
                purchase.purchaseDate
                  ?.split('T')[0],

              subtotal:
                purchase.subtotal,

              discount:
                purchase.discount,

              tax:
                purchase.tax,

              totalAmount:
                purchase.totalAmount,

              paymentStatus:
                purchase.paymentStatus,

              notes:
                purchase.notes,

              status:
                purchase.status

            });


          // =========================
          // VIEW MODE
          // =========================

          if (this.isViewMode) {

            this.supplierPurchaseForm
              .disable();

          }

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

  onDocumentsChange(event: any): void {

    if (this.isViewMode) {
      return;
    }

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
    this.isSaving = true;
    if (this.isViewMode) {

      return;

    }


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


    formData.append(
      'paymentStatus',
      formValue.paymentStatus
    );


    formData.append(
      'notes',
      formValue.notes || ''
    );


    formData.append(
      'status',
      formValue.status
    );


    // =========================
    // NEW DOCUMENTS
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
      'Updating supplier purchase...'
    );


    // =========================
    // UPDATE
    // =========================

    this.supplierPurchaseService
      .updateSupplierPurchase(
        this.purchaseId,
        formData
      )
      .subscribe({

        next: (response) => {

          console.log(
            response
          );


          this.alert.success(
            'Updated Successfully'
          );
          this.isSaving = false;

          this.router.navigate([
            '/admin/supplier-purchase-list'
          ]);

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
      '/admin/supplier-purchase-list'
    ]);

  }

}
