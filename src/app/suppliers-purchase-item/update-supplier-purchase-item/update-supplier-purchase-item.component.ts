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
  selectedPurchase: any = null;

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

          console.log(
            'All Supplier Purchases:',
            this.purchases
          );

          // Existing purchase ID from form
          const purchaseId =
            this.supplierPurchaseItemForm
              .get('purchase')
              ?.value;

          if (purchaseId) {

            this.selectedPurchase =
              this.purchases.find(
                (purchase: any) =>
                  purchase._id === purchaseId
              ) || null;

            console.log(
              'Selected Purchase after loading purchases:',
              this.selectedPurchase
            );
          }
        },

        error: (error) => {

          console.error(
            'Get Supplier Purchases Error:',
            error
          );

        }

      });
  }


  // =========================
  // GET ALL PRODUCTS
  // =========================

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        this.products = response.data || [];

        const productId =
          this.supplierPurchaseItemForm.get('product')?.value;

        const selectedProduct = this.products.find(
          (product: any) => product._id === productId
        );

        // Do not reset the existing variant selection here.
        if (selectedProduct && this.variants.length === 0) {
          this.variants = selectedProduct.variants || [];
        }
      },

      error: (error: any) => {
        console.error('Get products error:', error);
      }
    });
  }


  // =========================
  // GET ITEM BY ID
  // =========================

  getSupplierPurchaseItemById(): void {
    if (!this.purchaseId || !this.itemId) {
      console.error('Purchase ID or Item ID missing:', {
        purchaseId: this.purchaseId,
        itemId: this.itemId
      });
      return;
    }

    this.supplierPurchaseItemService
      .getSupplierPurchaseItemById(this.purchaseId)
      .subscribe({
        next: (response: any) => {
          const items = Array.isArray(response.data)
            ? response.data
            : [];

          // Select the clicked item, NOT the first item.
          const item = items.find(
            (entry: any) => entry._id === this.itemId
          );

          if (!item) {
            console.error('Matching purchase item not found:', {
              itemId: this.itemId,
              items
            });
            return;
          }

          console.log('Correct selected item:', item);

          const purchaseId =
            typeof item.purchase === 'string'
              ? item.purchase
              : item.purchase?._id || '';

          const productId =
            typeof item.product === 'string'
              ? item.product
              : item.product?._id || '';

          const variantId =
            typeof item.variantId === 'string'
              ? item.variantId
              : item.variantId?._id || '';

          // Prefer the populated product returned with this item.
          const product =
            item.product && typeof item.product === 'object'
              ? item.product
              : this.products.find(
                (entry: any) => entry._id === productId
              );

          // Load dropdown options before patching the variant ID.
          this.variants = product?.variants || [];

          this.supplierPurchaseItemForm.patchValue(
            {
              id: item._id,
              purchase: purchaseId,
              product: productId,
              variantId: variantId,

              quantity: item.quantity ?? 1,
              purchasePrice: item.purchasePrice ?? 0,
              supplierProductCode: item.supplierProductCode ?? '',
              batchNumber: item.batchNumber ?? '',

              discount: item.discount ?? 0,
              tax: item.tax ?? 0,
              totalAmount: item.totalAmount ?? 0,
              notes: item.notes ?? ''
            },
            { emitEvent: false }
          );

          this.onPurchaseChange();

          console.log('Loaded variants:', this.variants);
          console.log(
            'Patched form:',
            this.supplierPurchaseItemForm.getRawValue()
          );

          if (!productId) {
            console.warn(
              'Selected item has no product in the API response:',
              item
            );
          }

          if (this.isViewMode) {
            this.supplierPurchaseItemForm.disable({
              emitEvent: false
            });
          }
        },

        error: (error: any) => {
          console.error('Get supplier purchase item error:', error);
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

    console.log('Selected Purchase ID:', purchaseId);

    this.selectedPurchase =
      this.purchases.find(
        (purchase: any) =>
          purchase._id === purchaseId
      ) || null;

    console.log(
      'Selected Purchase:',
      this.selectedPurchase
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


      // IMPORTANT
      purchase: formValue.purchase,

      product: formValue.product,

      variantId: formValue.variantId,

      quantity:
        Number(formValue.quantity),

      purchasePrice:
        Number(formValue.purchasePrice),

      supplierProductCode:
        formValue.supplierProductCode,

      batchNumber:
        formValue.batchNumber,

      discount:
        Number(formValue.discount) || 0,

      tax:
        Number(formValue.tax) || 0,

      totalAmount:
        Number(formValue.totalAmount),

      notes:
        formValue.notes || ''
    };


    console.log(
      updateData,
      'update supplier purchase item'
    );

    const itemId =
      formValue.id;

    console.log(
      'Updating Item ID:',
      itemId
    );

    // =========================
    // UPDATE API
    // =========================

    this.supplierPurchaseItemService
      .updateSupplierPurchaseItem(
        itemId,
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
