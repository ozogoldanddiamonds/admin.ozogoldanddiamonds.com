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


  isSaving: boolean = false;

  supplierPurchaseForm!: FormGroup;

  suppliers: any[] = [];

  supplierPurchaseId: string = '';

  // Existing Cloudinary documents
  existingDocuments: any[] = [];

  // Newly selected files
  selectedDocuments: File[] = [];

  // New file previews
  documentPreviews: any[] = [];


  constructor(
    private fb: FormBuilder,

    private supplierService: SupplierService,

    private supplierPurchaseService:
      SupplierPurchaseService,

    private route: ActivatedRoute,

    private router: Router,

    private alert: AlertService
  ) { }


  // =====================================
  // INIT
  // =====================================

  ngOnInit(): void {

    this.supplierPurchaseId =
      this.route.snapshot.paramMap.get('id') || '';

    this.createForm();

    this.getAllSuppliers();

    if (this.supplierPurchaseId) {
      this.getSupplierPurchase();
    }

  }


  // =====================================
  // CREATE FORM
  // =====================================

  createForm(): void {

    this.supplierPurchaseForm =
      this.fb.group({

        supplier: [
          '',
          Validators.required
        ],

        invoiceNumber: [
          '',
          Validators.required
        ],

        invoiceDate: [
          '',
          Validators.required
        ],

        purchaseDate: [
          ''
        ],

        subtotal: [
          0
        ],

        discount: [
          0
        ],

        tax: [
          0
        ],

        totalAmount: [
          '',
          [
            Validators.required,
            Validators.min(0)
          ]
        ],

        paymentStatus: [
          'PENDING'
        ],

        notes: [
          ''
        ],

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

          this.suppliers =
            response.data || [];

        },

        error: (error) => {

          console.error(
            'Supplier Error:',
            error
          );

        }

      });

  }


  // =====================================
  // GET PURCHASE BY ID
  // =====================================

  getSupplierPurchase(): void {

    this.supplierPurchaseService
      .getSupplierPurchaseById(
        this.supplierPurchaseId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Purchase Details:',
            response
          );

          const purchase =
            response.data || response;


          // =====================================
          // PATCH FORM
          // =====================================

          this.supplierPurchaseForm.patchValue({

            supplier:
              purchase.supplier?._id ||
              purchase.supplier ||
              '',

            invoiceNumber:
              purchase.invoiceNumber || '',

            invoiceDate:
              this.formatDate(
                purchase.invoiceDate
              ),

            purchaseDate:
              this.formatDate(
                purchase.purchaseDate
              ),

            subtotal:
              purchase.subtotal ?? 0,

            discount:
              purchase.discount ?? 0,

            tax:
              purchase.tax ?? 0,

            totalAmount:
              purchase.totalAmount ?? 0,

            paymentStatus:
              purchase.paymentStatus ||
              'PENDING',

            notes:
              purchase.notes || '',

            status:
              purchase.status ||
              'DRAFT'

          });


          // =====================================
          // EXISTING FILES
          // =====================================

          this.existingDocuments =
            purchase.documents || [];

        },

        error: (error) => {

          console.error(
            error
          );

          Swal.fire({

            icon: 'error',

            title: 'Error',

            text:
              error?.error?.message ||
              'Failed To Load Supplier Purchase'

          });

        }

      });

  }


  // =====================================
  // DATE FORMAT
  // =====================================

  formatDate(date: any): string {

    if (!date) {
      return '';
    }

    const d = new Date(date);

    const year =
      d.getFullYear();

    const month =
      String(
        d.getMonth() + 1
      ).padStart(2, '0');

    const day =
      String(
        d.getDate()
      ).padStart(2, '0');

    return `${year}-${month}-${day}`;

  }


  // =====================================
  // FILE CHANGE
  // =====================================

  onDocumentsChange(event: any): void {

  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0) {
    return;
  }

  const files: File[] = Array.from(input.files);

  // Existing + already selected + new files
  const totalFiles =
    this.existingDocuments.length +
    this.selectedDocuments.length +
    files.length;

  if (totalFiles > 10) {

    Swal.fire({
      icon: 'warning',
      title: 'Maximum 10 Documents',
      text: 'You can upload maximum 10 documents.'
    });

    input.value = '';
    return;
  }

  files.forEach((file: File) => {

    // Add actual file
    this.selectedDocuments.push(file);

    // IMAGE
    if (file.type.startsWith('image/')) {

      const reader = new FileReader();

      reader.onload = () => {

        this.documentPreviews.push({

          name: file.name,

          url: reader.result,

          isImage: true,

          isPdf: false

        });

      };

      reader.readAsDataURL(file);

    }

    // PDF
    else if (file.type === 'application/pdf') {

      this.documentPreviews.push({

        name: file.name,

        url: '',

        isImage: false,

        isPdf: true

      });

    }

    // OTHER FILE
    else {

      this.documentPreviews.push({

        name: file.name,

        url: '',

        isImage: false,

        isPdf: false

      });

    }

  });

  // Same file again select cheyyadaniki
  input.value = '';

}


  // =====================================
  // IMAGE CHECK
  // =====================================

  isImage(url: string): boolean {

    if (!url) {
      return false;
    }

    return /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i
      .test(url);

  }
  // video
  isPdf(document: any): boolean {

  if (!document) {
    return false;
  }

  return (
    document.type === 'PDF' ||
    document.description?.toLowerCase().endsWith('.pdf') ||
    document.url?.toLowerCase().includes('.pdf')
  );

}


  // =====================================
  // VIEW EXISTING FILE
  // =====================================

  viewDocument(url: string): void {

    if (!url) {
      return;
    }

    window.open(
      url,
      '_blank'
    );

  }


  // =====================================
  // REMOVE EXISTING FILE
  // =====================================

  removeExistingDocument(
    index: number
  ): void {

    Swal.fire({

      icon: 'warning',

      title: 'Remove Document?',

      text:
        'Are you sure you want to remove this document?',

      showCancelButton: true,

      confirmButtonText:
        'Yes, Remove',

      cancelButtonText:
        'Cancel'

    }).then((result) => {

      if (result.isConfirmed) {

        this.existingDocuments.splice(
          index,
          1
        );

      }

    });

  }


  // =====================================
  // REMOVE NEW FILE
  // =====================================

  removeNewDocument(
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
  // SUBMIT UPDATE
  // =====================================

  onSubmit(): void {

    if (
      this.supplierPurchaseForm.invalid
    ) {

      this.supplierPurchaseForm
        .markAllAsTouched();

      return;

    }


    this.isSaving = true;


    const formValue =
      this.supplierPurchaseForm.value;


    const formData =
      new FormData();


    // =====================================
    // BASIC DETAILS
    // =====================================

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


    // =====================================
    // AMOUNTS
    // =====================================

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
        formValue.totalAmount || 0
      )
    );


    // =====================================
    // PAYMENT
    // =====================================

    formData.append(
      'paymentStatus',
      formValue.paymentStatus
    );


    // =====================================
    // NOTES
    // =====================================

    formData.append(
      'notes',
      formValue.notes || ''
    );


    // =====================================
    // STATUS
    // =====================================

    formData.append(
      'status',
      formValue.status
    );


    // =====================================
    // EXISTING DOCUMENTS
    // =====================================

    formData.append(
      'existingDocuments',
      JSON.stringify(
        this.existingDocuments
      )
    );


    // =====================================
    // NEW DOCUMENTS
    // =====================================

    this.selectedDocuments.forEach(
      (file: File) => {

        formData.append(
          'documents',
          file
        );

      }
    );


    // =====================================
    // UPDATE API
    // =====================================

    this.supplierPurchaseService
      .updateSupplierPurchase(
        this.supplierPurchaseId,
        formData
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Update Response:',
            response
          );

          this.isSaving = false;


          this.alert.success(
            'Supplier Purchase Updated Successfully'
          );


          this.router.navigate([
            '/admin/supplier-purchase-list'
          ]);

        },

        error: (error) => {

          console.error(
            'Update Error:',
            error
          );

          this.isSaving = false;


          Swal.fire({

            icon: 'error',

            title: 'Oops...',

            text:
              error?.error?.message ||
              'Failed To Update Supplier Purchase'

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