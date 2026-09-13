import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { ProductService } from 'src/app/Services/product.service';
import { SupplierPurchaseItemsService } from 'src/app/Services/supplier-purchase-items.service';
import { SupplierPurchaseService } from 'src/app/Services/supplier-purchase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-supplier-purchase-item',
  templateUrl: './update-supplier-purchase-item.component.html',
  styleUrls: ['./update-supplier-purchase-item.component.css']
})
export class UpdateSupplierPurchaseItemComponent implements OnInit {


  // =========================
  // FORM
  // =========================

  supplierPurchaseItemForm!: FormGroup;


  // =========================
  // ID
  // =========================

  itemId: any;
  purchaseId: any;

  // =========================
  // VIEW MODE
  // =========================

  isViewMode: boolean = false;


  // =========================
  // PURCHASES
  // =========================

  purchases: any[] = [];


  // =========================
  // PRODUCTS
  // =========================

  products: any[] = [];


  // =========================
  // VARIANTS
  // =========================

  variants: any[] = [];


  // =========================
  // SELECTED PURCHASE
  // =========================

  selectedPurchase: any = null;


  constructor(
    private fb: FormBuilder,

    private supplierPurchaseItemService:
      SupplierPurchaseItemsService,

    private supplierPurchaseService:
      SupplierPurchaseService,

    private productService:
      ProductService,

    private router: Router,

    private activeRoute:
      ActivatedRoute,

    private alert:
      AlertService
  ) {


    // =========================
    // FORM
    // =========================

    this.supplierPurchaseItemForm =
      this.fb.group({

        id: [
          ''
        ],


        purchase: [
          '',
          Validators.required
        ],


        product: [
          '',
          Validators.required
        ],


        variantId: [
          '',
          Validators.required
        ],


        quantity: [
          1,
          [
            Validators.required,
            Validators.min(1)
          ]
        ],


        purchasePrice: [
          0,
          [
            Validators.required,
            Validators.min(0)
          ]
        ],
        supplierProductCode: ['', [Validators.required,]],
        batchNumber: ['', [Validators.required,]],

        discount: [
          0,
          [
            Validators.min(0)
          ]
        ],


        tax: [
          0,
          [
            Validators.min(0)
          ]
        ],


        totalAmount: [
          0,
          [
            Validators.required,
            Validators.min(0)
          ]
        ],


        notes: [
          ''
        ]

      });

  }


  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.purchaseId =
      this.activeRoute.snapshot.paramMap.get('purchaseId');

    this.itemId =
      this.activeRoute.snapshot.paramMap.get('itemId');


    this.isViewMode =
      this.activeRoute.snapshot
        .queryParamMap
        .get('mode') === 'view';


    console.log(
      this.itemId,
      'item id'
    );


    console.log(
      this.isViewMode,
      'view mode'
    );


    // =========================
    // GET PURCHASES
    // =========================

    this.getAllSupplierPurchases();


    // =========================
    // GET PRODUCTS
    // =========================

    this.getAllProducts();


    // =========================
    // GET ITEM
    // =========================

    this.getSupplierPurchaseItemById();

  }


  // =========================
  // GET ALL PURCHASES
  // =========================

  getAllSupplierPurchases(): void {

    this.supplierPurchaseService
      .getAllSupplierPurchases()
      .subscribe({

        next: (response: any) => {

          this.purchases =
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
  // GET ALL PRODUCTS
  // =========================

  getAllProducts(): void {

    this.productService
      .getAllProducts()
      .subscribe({

        next: (response: any) => {

          this.products =
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
  // GET ITEM BY ID
  // =========================

  getSupplierPurchaseItemById(): void {

    this.supplierPurchaseItemService
      .getSupplierPurchaseItemById(this.purchaseId)
      .subscribe({

        next: (response: any) => {

          console.log(
            response,
            'supplier purchase item response'
          );


          // =========================
          // DATA ARRAY
          // =========================

          const item =
            response.data?.[0];


          if (!item) {

            Swal.fire({

              icon: 'error',

              title: 'Not Found',

              text:
                'Supplier purchase item not found'

            });

            return;

          }


          console.log(
            item,
            'supplier purchase item'
          );


          // =========================
          // PURCHASE ID
          // =========================

          const purchaseId =
            item.purchase;


          // =========================
          // PRODUCT ID
          // =========================

          const productId =
            item.product?._id;


          // =========================
          // PURCHASE
          // =========================

          this.selectedPurchase =
            this.purchases.find(
              (purchase: any) =>
                purchase._id === purchaseId
            ) || null;


          // =========================
          // IMPORTANT
          // LOAD VARIANTS DIRECTLY
          // FROM API RESPONSE
          // =========================

          this.variants =
            item.product?.variants || [];


          console.log(
            this.variants,
            'loaded variants'
          );


          // =========================
          // CHECK VARIANT
          // =========================

          const selectedVariant =
            this.variants.find(
              (variant: any) =>
                variant._id === item.variantId
            );


          console.log(
            selectedVariant,
            'selected variant'
          );


          // =========================
          // PATCH FORM
          // =========================

          this.supplierPurchaseItemForm
            .patchValue({

              id:
                item._id,

              purchase:
                purchaseId,

              product:
                productId,

              variantId:
                selectedVariant?._id ||
                item.variantId,

              quantity:
                item.quantity,

              purchasePrice:
                item.purchasePrice,
              supplierProductCode:
                item.supplierProductCode,
              batchNumber:
                item.batchNumber,

              discount:
                item.discount,

              tax:
                item.tax,

              totalAmount:
                item.totalAmount,

              notes:
                item.notes

            });


          console.log(
            this.supplierPurchaseItemForm.value,
            'patched form values'
          );


          // =========================
          // VIEW MODE
          // =========================

          if (this.isViewMode) {

            this.supplierPurchaseItemForm
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
  // PURCHASE CHANGE
  // =========================

  onPurchaseChange(): void {

    const purchaseId =
      this.supplierPurchaseItemForm
        .get('purchase')
        ?.value;


    this.selectedPurchase =
      this.purchases.find(
        purchase =>
          purchase._id === purchaseId
      ) || null;

  }


  // =========================
  // PRODUCT CHANGE
  // =========================

  onProductChange(): void {

    const productId =
      this.supplierPurchaseItemForm
        .get('product')
        ?.value;


    this.variants = [];


    this.supplierPurchaseItemForm
      .get('variantId')
      ?.setValue('');


    if (!productId) {

      return;

    }


    const selectedProduct =
      this.products.find(
        product =>
          product._id === productId
      );


    if (
      selectedProduct &&
      selectedProduct.variants
    ) {

      this.variants =
        selectedProduct.variants;

    }

  }


  // =========================
  // TOTAL CALCULATION
  // =========================

  calculateTotal(): void {

    if (this.isViewMode) {

      return;

    }


    const quantity =
      Number(
        this.supplierPurchaseItemForm
          .get('quantity')
          ?.value
      ) || 0;


    const purchasePrice =
      Number(
        this.supplierPurchaseItemForm
          .get('purchasePrice')
          ?.value
      ) || 0;


    const discount =
      Number(
        this.supplierPurchaseItemForm
          .get('discount')
          ?.value
      ) || 0;


    const tax =
      Number(
        this.supplierPurchaseItemForm
          .get('tax')
          ?.value
      ) || 0;


    const baseAmount =
      quantity * purchasePrice;


    const afterDiscount =
      baseAmount - discount;


    const taxAmount =
      afterDiscount *
      (tax / 100);


    const totalAmount =
      afterDiscount + taxAmount;


    this.supplierPurchaseItemForm
      .get('totalAmount')
      ?.setValue(

        totalAmount >= 0
          ? Number(
            totalAmount.toFixed(2)
          )
          : 0,

        {
          emitEvent: false
        }

      );

  }


  // =========================
  // SUBMIT
  // =========================

  onSubmit(): void {

    if (this.isViewMode) {

      return;

    }


    if (
      this.supplierPurchaseItemForm
        .invalid
    ) {

      this.supplierPurchaseItemForm
        .markAllAsTouched();

      return;

    }


    const formValue =
      this.supplierPurchaseItemForm.value;


    const updateData = {

      product:
        formValue.product,

      variantId:
        formValue.variantId,

      quantity:
        Number(
          formValue.quantity
        ),

      purchasePrice:
        Number(
          formValue.purchasePrice
        ),
      supplierProductCode:
        formValue.supplierProductCode,
      batchNumber:
        formValue.batchNumber,
      discount:
        Number(
          formValue.discount
        ) || 0,

      tax:
        Number(
          formValue.tax
        ) || 0,

      totalAmount:
        Number(
          formValue.totalAmount
        ),

      notes:
        formValue.notes || ''

    };


    console.log(
      updateData,
      'update supplier purchase item'
    );


    // =========================
    // UPDATE API
    // =========================

    this.supplierPurchaseItemService
      .updateSupplierPurchaseItem(
        this.itemId,
        updateData
      )
      .subscribe({

        next: (response) => {

          console.log(
            response
          );


          this.alert.success(
            'Updated Successfully'
          );


          this.router.navigate([
            '/admin/supplier-purchase-item'
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
      '/admin/supplier-purchase-item'
    ]);

  }


  addNewProduct(searchTerm: string): void {

    if (!searchTerm?.trim()) {
      return;
    }

    console.log(
      searchTerm,
      'product to add'
    );

    // Product create page ki navigate cheyyachu
    this.router.navigate(
      ['/admin/create-product'],
      {
        queryParams: {
          name: searchTerm.trim()
        }
      }
    );

  }
}
