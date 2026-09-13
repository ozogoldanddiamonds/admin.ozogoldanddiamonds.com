import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { ProductService } from 'src/app/Services/product.service';
import { SupplierPurchaseItemsService } from 'src/app/Services/supplier-purchase-items.service';
import { SupplierPurchaseService } from 'src/app/Services/supplier-purchase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-supplier-purchase-item',
  templateUrl: './create-supplier-purchase-item.component.html',
  styleUrls: ['./create-supplier-purchase-item.component.css']
})
export class CreateSupplierPurchaseItemComponent implements OnInit {

  supplierPurchaseItemForm!: FormGroup;


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

    private supplierPurchaseService:
      SupplierPurchaseService,

    private supplierPurchaseItemService:
      SupplierPurchaseItemsService,

    private productService:
      ProductService,

    private router: Router,

    private alert: AlertService
  ) { }


  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.supplierPurchaseItemForm =
      this.fb.group({

        // =========================
        // PURCHASE
        // =========================

        purchase: [
          '',
          Validators.required
        ],


        // =========================
        // PRODUCT
        // =========================

        product: [
          '',
          Validators.required
        ],


        // =========================
        // VARIANT
        // =========================

        variantId: [
          '',
          Validators.required
        ],


        // =========================
        // QUANTITY
        // =========================

        quantity: [
          1,
          [
            Validators.required,
            Validators.min(1)
          ]
        ],


        // =========================
        // PURCHASE PRICE
        // =========================

        purchasePrice: [
          0,
          [
            Validators.required,
            Validators.min(0)
          ]
        ],
        supplierProductCode: ['', [Validators.required,]],
        batchNumber: ['', [Validators.required,]],

        // =========================
        // DISCOUNT
        // =========================

        discount: [
          0,
          [
            Validators.min(0)
          ]
        ],


        // =========================
        // TAX
        // =========================

        tax: [
          0,
          [
            Validators.min(0)
          ]
        ],


        // =========================
        // TOTAL AMOUNT
        // =========================

        totalAmount: [
          0,
          [
            Validators.required,
            Validators.min(0)
          ]
        ],


        // =========================
        // NOTES
        // =========================

        notes: [
          ''
        ]

      });


    // =========================
    // GET PURCHASES
    // =========================

    this.getAllSupplierPurchases();


    // =========================
    // GET PRODUCTS
    // =========================

    this.getAllProducts();


    // =========================
    // TOTAL CALCULATION
    // =========================

    this.supplierPurchaseItemForm
      .valueChanges
      .subscribe(() => {

        this.calculateTotal();

      });

  }


  // =========================
  // GET ALL PURCHASES
  // =========================

  getAllSupplierPurchases(): void {

    this.supplierPurchaseService
      .getAllSupplierPurchases()
      .subscribe({

        next: (response: any) => {

          console.log(
            response,
            'supplier purchases'
          );


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

          console.log(
            response,
            'products'
          );


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


    console.log(
      this.selectedPurchase,
      'selected purchase'
    );

  }


  // =========================
  // PRODUCT CHANGE
  // =========================

  onProductChange(): void {

    const productId =
      this.supplierPurchaseItemForm
        .get('product')
        ?.value;


    // =========================
    // RESET VARIANT
    // =========================

    this.variants = [];


    this.supplierPurchaseItemForm
      .get('variantId')
      ?.setValue('');


    if (!productId) {

      return;

    }


    // =========================
    // FIND PRODUCT
    // =========================

    const selectedProduct =
      this.products.find(
        product =>
          product._id === productId
      );


    console.log(
      selectedProduct,
      'selected product'
    );


    // =========================
    // GET VARIANTS
    // =========================

    if (
      selectedProduct &&
      selectedProduct.variants
    ) {

      this.variants =
        selectedProduct.variants;

    }


    console.log(
      this.variants,
      'product variants'
    );

  }


  // =========================
  // CALCULATE TOTAL
  // =========================

  calculateTotal(): void {

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


    // =========================
    // BASE AMOUNT
    // =========================

    const baseAmount =
      quantity * purchasePrice;


    // =========================
    // AFTER DISCOUNT
    // =========================

    const afterDiscount =
      baseAmount - discount;


    // =========================
    // TAX
    // =========================

    const taxAmount =
      afterDiscount *
      (tax / 100);


    // =========================
    // FINAL TOTAL
    // =========================

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


    // =========================
    // PREPARE DATA
    // =========================

    const supplierPurchaseItemData = {

      purchase:
        formValue.purchase,

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
      supplierPurchaseItemData,
      'supplier purchase item data'
    );


    // =========================
    // CREATE ITEM
    // =========================

    this.supplierPurchaseItemService
      .createSupplierPurchaseItem(
        supplierPurchaseItemData
      )
      .subscribe({

        next: (response) => {

          console.log(
            response
          );


          this.alert.success(
            'Supplier Purchase Item Created Successfully'
          );


          this.router.navigate([
            '/admin/supplier-purchase-item'
          ]);


          this.supplierPurchaseItemForm
            .reset();

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
              'Failed To Create Supplier Purchase Item'

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
