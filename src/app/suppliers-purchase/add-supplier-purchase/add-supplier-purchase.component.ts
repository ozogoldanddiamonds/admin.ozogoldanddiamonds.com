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
export class AddSupplierPurchaseComponent  implements OnInit {


  // =====================================
  // VARIABLES
  // =====================================

  isSaving: boolean = false;

  supplierPurchaseForm!: FormGroup;

  suppliers: any[] = [];

  selectedDocuments: File[] = [];

  documentPreviews: any[] = [];


  constructor(
    private fb: FormBuilder,

    private supplierService:
      SupplierService,

    private supplierPurchaseService:
      SupplierPurchaseService,

    private router: Router,

    private alert: AlertService
  ) { }


  // =====================================
  // INIT
  // =====================================

  ngOnInit(): void {

    this.createForm();

    this.getAllSuppliers();

  }


  // =====================================
  // CREATE FORM
  // =====================================

  createForm(): void {

    this.supplierPurchaseForm =
      this.fb.group({

        // Supplier
        supplier: [
          '',
          Validators.required
        ],

        // Invoice Number
        invoiceNumber: [
          '',
          Validators.required
        ],

        // Invoice Date
        invoiceDate: [
          '',
          Validators.required
        ],

        // Purchase Date
        purchaseDate: [
          new Date()
            .toISOString()
            .split('T')[0]
        ],

        // Subtotal
        subtotal: [
          0
        ],

        // Discount
        discount: [
          0
        ],

        // Tax
        tax: [
          0
        ],

        // Total Amount
        totalAmount: [
          '',
          [
            Validators.required,
            Validators.min(0)
          ]
        ],

        // Payment Status
        paymentStatus: [
          'PENDING'
        ],

        // Notes
        notes: [
          ''
        ],

        // Status
        status: [
          'DRAFT'
        ]

      });

  }


  // =====================================
  // GET ALL SUPPLIERS
  // =====================================

  getAllSuppliers(): void {

    this.supplierService
      .getAllSuppliers()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Supplier Response:',
            response
          );

          this.suppliers =
            response.data || [];

        },

        error: (error) => {

          console.error(
            'Supplier Error:',
            error
          );

          Swal.fire({

            icon: 'error',

            title: 'Error',

            text:
              'Failed to load suppliers'

          });

        }

      });

  }


  // =====================================
  // DOCUMENT CHANGE
  // =====================================

  onDocumentsChange(event: any): void {

    const files =
      event.target.files;


    if (
      !files ||
      files.length === 0
    ) {

      return;

    }


    // =====================================
    // MAX 10 FILES
    // =====================================

    if (
      this.selectedDocuments.length +
      files.length > 10
    ) {

      Swal.fire({

        icon: 'warning',

        title: 'Maximum 10 Documents',

        text:
          'You can upload a maximum of 10 documents.'

      });

      event.target.value = '';

      return;

    }


    // =====================================
    // ADD FILES
    // =====================================

    const newFiles =
      Array.from(files) as File[];


    this.selectedDocuments.push(
      ...newFiles
    );


    // =====================================
    // CREATE PREVIEWS
    // =====================================

    newFiles.forEach(
      (file: File) => {

        // IMAGE

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

        // PDF / OTHER

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


    // Allow same file selection again

    event.target.value = '';

  }


  // =====================================
  // CHECK IMAGE
  // =====================================

  isImage(url: string): boolean {

    if (!url) {
      return false;
    }

    return /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i
      .test(url);

  }


  // =====================================
  // VIEW NEW IMAGE
  // =====================================

  viewPreview(
    preview: any
  ): void {

    if (
      preview?.isImage &&
      preview?.url
    ) {

      const newWindow =
        window.open();

      if (newWindow) {

        newWindow.document.write(`
          <html>
            <head>
              <title>${preview.name}</title>
            </head>

            <body style="
              margin:0;
              display:flex;
              align-items:center;
              justify-content:center;
              background:#111;
              height:100vh;
            ">

              <img
                src="${preview.url}"
                style="
                  max-width:95%;
                  max-height:95%;
                  object-fit:contain;
                "
              >

            </body>
          </html>
        `);

      }

    }

  }


  // =====================================
  // REMOVE DOCUMENT
  // =====================================

  removeDocument(
    index: number
  ): void {

    this.selectedDocuments.splice(
      index,
      1
    );

    this.documentPreviews.splice(
      index,
      1
    );

  }


  // =====================================
  // SUBMIT
  // =====================================

 onSubmit(): void {

    // Validation
    if (this.supplierPurchaseForm.invalid) {

        this.supplierPurchaseForm.markAllAsTouched();

        return;
    }

    // Start loading
    this.isSaving = true;

    const formValue =
        this.supplierPurchaseForm.value;

    const formData =
        new FormData();

    // Existing functionality same
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
        String(formValue.subtotal || 0)
    );

    formData.append(
        'discount',
        String(formValue.discount || 0)
    );

    formData.append(
        'tax',
        String(formValue.tax || 0)
    );

    formData.append(
        'totalAmount',
        String(formValue.totalAmount || 0)
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

    this.selectedDocuments.forEach(
        (file: File) => {

            formData.append(
                'documents',
                file
            );

        }
    );


    // API
    this.supplierPurchaseService
        .createSupplierPurchase(formData)
        .subscribe({

            next: (response) => {

                // Stop loading
                this.isSaving = false;

                this.alert.success(
                    'Supplier Purchase Created Successfully'
                );

                this.router.navigate([
                    '/admin/supplier-purchase-list'
                ]);

                this.supplierPurchaseForm.reset();

                this.selectedDocuments = [];

                this.documentPreviews = [];

            },

            error: (error) => {

                // Stop loading
                this.isSaving = false;

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


  // =====================================
  // BACK
  // =====================================

  goBack(): void {

    this.router.navigate([
      '/admin/supplier-purchase-list'
    ]);

  }

}