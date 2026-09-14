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


  // =====================================================
  // FORM
  // =====================================================

  supplierPurchaseItemForm!: FormGroup;


  // =====================================================
  // PURCHASES
  // =====================================================

  purchases: any[] = [];


  // =====================================================
  // PRODUCTS
  // =====================================================

  products: any[] = [];


  // =====================================================
  // VARIANTS
  // =====================================================

  variants: any[] = [];


  // =====================================================
  // SELECTED PURCHASE
  // =====================================================

  selectedPurchase: any = null;


  // =====================================================
  // ADDED PRODUCT VARIANTS
  // =====================================================

  supplierPurchaseItems: any[] = [];


  // =====================================================
  // LOADING
  // =====================================================

  isLoading = false;


  // =====================================================
  // SAVING
  // =====================================================

  isSaving = false;


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



  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.initializeForm();


    // ================================================
    // GET PURCHASES
    // ================================================

    this.getAllSupplierPurchases();


    // ================================================
    // GET PRODUCTS
    // ================================================

    this.getAllProducts();


    // ================================================
    // CALCULATE TOTAL
    // ================================================

    this.supplierPurchaseItemForm
      .valueChanges
      .subscribe(() => {

        this.calculateTotal();

      });

  }



  // =====================================================
  // INITIALIZE FORM
  // =====================================================

  initializeForm(): void {

    this.supplierPurchaseItemForm =
      this.fb.group({

        // ==========================================
        // PURCHASE
        // ==========================================

        purchase: [

          '',

          Validators.required

        ],


        // ==========================================
        // PRODUCT
        // ==========================================

        product: [

          '',

          Validators.required

        ],


        // ==========================================
        // VARIANT
        // ==========================================

        variantId: [

          '',

          Validators.required

        ],


        // ==========================================
        // QUANTITY
        // ==========================================

        quantity: [

          1,

          [

            Validators.required,

            Validators.min(1)

          ]

        ],


        // ==========================================
        // PURCHASE PRICE
        // ==========================================

        purchasePrice: [

          0,

          [

            Validators.required,

            Validators.min(0)

          ]

        ],


        // ==========================================
        // SUPPLIER PRODUCT CODE
        // ==========================================

        supplierProductCode: [

          '',

          Validators.required

        ],


        // ==========================================
        // BATCH NUMBER
        // ==========================================

        batchNumber: [

          '',

          Validators.required

        ],


        // ==========================================
        // DISCOUNT
        // ==========================================

        discount: [

          0,

          [

            Validators.min(0)

          ]

        ],


        // ==========================================
        // TAX
        // ==========================================

        tax: [

          0,

          [

            Validators.min(0)

          ]

        ],


        // ==========================================
        // TOTAL AMOUNT
        // ==========================================

        totalAmount: [

          0,

          [

            Validators.required,

            Validators.min(0)

          ]

        ],


        // ==========================================
        // NOTES
        // ==========================================

        notes: [

          ''

        ]

      });

  }



  // =====================================================
  // GET ALL SUPPLIER PURCHASES
  // =====================================================

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
            response?.data || [];

        },


        error: (error: any) => {

          console.error(
            error
          );


          this.purchases = [];

          this.alert.error(

            error?.error?.message ||

            'Failed to load supplier purchases'

          );

        }

      });

  }



  // =====================================================
  // GET ALL PRODUCTS
  // =====================================================

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
            response?.data || [];


          console.log(
            'Product List:',
            this.products
          );

        },


        error: (error: any) => {

          console.error(
            error
          );


          this.products = [];


          this.alert.error(

            error?.error?.message ||

            'Failed to load products'

          );

        }

      });

  }



  // =====================================================
  // PURCHASE CHANGE
  // =====================================================

  onPurchaseChange(): void {

    const purchaseId =

      this.supplierPurchaseItemForm
        .get('purchase')
        ?.value;


    // ================================================
    // FIND PURCHASE
    // ================================================

    this.selectedPurchase =

      this.purchases.find(

        purchase =>

          String(purchase._id) ===
          String(purchaseId)

      ) || null;


    console.log(
      this.selectedPurchase,
      'selected purchase'
    );


    // ================================================
    // IMPORTANT
    // ================================================
    // Purchase change ayithe old added items
    // remove cheyyadam safe.
    //
    // Because all items must belong to
    // same supplier purchase.
    // ================================================

    if (
      this.supplierPurchaseItems.length > 0
    ) {

      this.supplierPurchaseItems = [];

    }

  }



  // =====================================================
  // PRODUCT CHANGE
  // =====================================================

  onProductChange(): void {

    const productId =

      this.supplierPurchaseItemForm
        .get('product')
        ?.value;


    // ================================================
    // RESET VARIANTS
    // ================================================

    this.variants = [];


    this.supplierPurchaseItemForm
      .get('variantId')
      ?.setValue(
        '',
        {
          emitEvent: false
        }
      );


    // ================================================
    // NO PRODUCT
    // ================================================

    if (!productId) {

      return;

    }


    // ================================================
    // FIND PRODUCT
    // ================================================

    const selectedProduct =

      this.products.find(

        product =>

          String(product._id) ===
          String(productId)

      );


    console.log(
      selectedProduct,
      'selected product'
    );


    // ================================================
    // LOAD VARIANTS
    // ================================================

    if (
      selectedProduct &&
      Array.isArray(
        selectedProduct.variants
      )
    ) {

      this.variants =
        selectedProduct.variants;

    }


    console.log(
      this.variants,
      'product variants'
    );

  }



  // =====================================================
  // CALCULATE TOTAL
  // =====================================================

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


    // ================================================
    // BASE AMOUNT
    // ================================================

    const baseAmount =

      quantity *
      purchasePrice;


    // ================================================
    // AFTER DISCOUNT
    // ================================================

    const afterDiscount =

      Math.max(

        baseAmount -
        discount,

        0

      );


    // ================================================
    // TAX
    // ================================================

    const taxAmount =

      afterDiscount *
      (tax / 100);


    // ================================================
    // FINAL TOTAL
    // ================================================

    const totalAmount =

      afterDiscount +
      taxAmount;


    // ================================================
    // PATCH TOTAL
    // ================================================

    this.supplierPurchaseItemForm
      .get('totalAmount')
      ?.setValue(

        Number(
          totalAmount.toFixed(2)
        ),

        {
          emitEvent: false
        }

      );

  }



  // =====================================================
  // ADD PRODUCT + VARIANT
  // =====================================================

  addProductVariant(): void {

    // ================================================
    // VALIDATE PURCHASE
    // ================================================

    const purchaseId =

      this.supplierPurchaseItemForm
        .get('purchase')
        ?.value;


    if (!purchaseId) {

      this.alert.error(
        'Please select supplier purchase'
      );

      return;

    }


    // ================================================
    // VALIDATE PRODUCT
    // ================================================

    const productId =

      this.supplierPurchaseItemForm
        .get('product')
        ?.value;


    if (!productId) {

      this.alert.error(
        'Please select product'
      );

      return;

    }


    // ================================================
    // VALIDATE VARIANT
    // ================================================

    const variantId =

      this.supplierPurchaseItemForm
        .get('variantId')
        ?.value;


    if (!variantId) {

      this.alert.error(
        'Please select product variant'
      );

      return;

    }


    // ================================================
    // VALIDATE OTHER FIELDS
    // ================================================

    const quantity =

      Number(

        this.supplierPurchaseItemForm
          .get('quantity')
          ?.value

      );


    if (
      !Number.isFinite(quantity) ||
      quantity < 1
    ) {

      this.alert.error(
        'Valid quantity is required'
      );

      return;

    }


    const purchasePrice =

      Number(

        this.supplierPurchaseItemForm
          .get('purchasePrice')
          ?.value

      );


    if (
      !Number.isFinite(purchasePrice) ||
      purchasePrice < 0
    ) {

      this.alert.error(
        'Valid purchase price is required'
      );

      return;

    }


    const supplierProductCode =

      this.supplierPurchaseItemForm
        .get('supplierProductCode')
        ?.value
        ?.trim();


    if (!supplierProductCode) {

      this.alert.error(
        'Supplier Product Code is required'
      );

      return;

    }


    const batchNumber =

      this.supplierPurchaseItemForm
        .get('batchNumber')
        ?.value
        ?.trim();


    if (!batchNumber) {

      this.alert.error(
        'Batch Number is required'
      );

      return;

    }


    // ================================================
    // DISCOUNT
    // ================================================

    const discount =

      Number(

        this.supplierPurchaseItemForm
          .get('discount')
          ?.value

      ) || 0;


    if (discount < 0) {

      this.alert.error(
        'Discount cannot be negative'
      );

      return;

    }


    // ================================================
    // TAX
    // ================================================

    const tax =

      Number(

        this.supplierPurchaseItemForm
          .get('tax')
          ?.value

      ) || 0;


    if (tax < 0) {

      this.alert.error(
        'Tax cannot be negative'
      );

      return;

    }


    // ================================================
    // TOTAL
    // ================================================

    this.calculateTotal();


    const totalAmount =

      Number(

        this.supplierPurchaseItemForm
          .get('totalAmount')
          ?.value

      ) || 0;


    // ================================================
    // FIND PRODUCT
    // ================================================

    const selectedProduct =

      this.products.find(

        product =>

          String(product._id) ===
          String(productId)

      );


    if (!selectedProduct) {

      this.alert.error(
        'Selected product not found'
      );

      return;

    }


    // ================================================
    // FIND VARIANT
    // ================================================

    const selectedVariant =

      this.variants.find(

        variant =>

          String(variant._id) ===
          String(variantId)

      );


    if (!selectedVariant) {

      this.alert.error(
        'Selected product variant not found'
      );

      return;

    }


    // ================================================
    // DUPLICATE CHECK
    // ================================================
    //
    // Same purchase + same product +
    // same variant should not be added twice.
    //
    // Backend lo kuda same validation undi.
    //
    // ================================================

    const duplicateItem =

      this.supplierPurchaseItems.find(

        item =>

          String(item.purchase) ===
          String(purchaseId)

          &&

          String(item.product) ===
          String(productId)

          &&

          String(item.variantId) ===
          String(variantId)

      );


    if (duplicateItem) {

      this.alert.error(

        'This product variant is already added to this purchase'

      );

      return;

    }


    // ================================================
    // PRODUCT NAME
    // ================================================

    const productName =

      selectedProduct.name ||

      selectedProduct.productName ||

      'Product';


    // ================================================
    // VARIANT NAME
    // ================================================

    const variantName =

      selectedVariant.name ||

      selectedVariant.variantName ||

      selectedVariant.sku ||

      selectedVariant._id;


    // ================================================
    // CREATE LOCAL ITEM
    // ================================================

    const item = {

      // IDs
      purchase:
        purchaseId,

      product:
        productId,

      variantId:
        variantId,


      // Display data
      productName:
        productName,

      variantName:
        variantName,


      // Item data
      quantity:
        quantity,

      purchasePrice:
        purchasePrice,

      supplierProductCode:
        supplierProductCode,

      batchNumber:
        batchNumber,

      discount:
        discount,

      tax:
        tax,

      totalAmount:
        totalAmount,

      notes:
        this.supplierPurchaseItemForm
          .get('notes')
          ?.value
          ?.trim() || ''

    };


    // ================================================
    // ADD TO ARRAY
    // ================================================

    this.supplierPurchaseItems.push(
      item
    );


    console.log(
      'Added Supplier Purchase Item:',
      item
    );


    console.log(
      'All Supplier Purchase Items:',
      this.supplierPurchaseItems
    );


    // ================================================
    // RESET ITEM-LEVEL FIELDS
    // ================================================
    //
    // Purchase remains same.
    //
    // User can immediately select another
    // product and variant.
    //
    // ================================================

    this.resetProductVariantFields();


    // ================================================
    // SUCCESS MESSAGE
    // ================================================

    this.alert.success(
      'Product variant added successfully'
    );

  }



  // =====================================================
  // RESET PRODUCT / VARIANT FIELDS
  // =====================================================

  resetProductVariantFields(): void {

    this.supplierPurchaseItemForm.patchValue({

      product:
        '',

      variantId:
        '',

      quantity:
        1,

      purchasePrice:
        0,

      supplierProductCode:
        '',

      batchNumber:
        '',

      discount:
        0,

      tax:
        0,

      totalAmount:
        0,

      notes:
        ''

    });


    this.variants = [];

  }



  // =====================================================
  // REMOVE PRODUCT VARIANT
  // =====================================================

  removeProductVariant(
    index: number
  ): void {

    if (
      index < 0 ||
      index >=
      this.supplierPurchaseItems.length
    ) {

      return;

    }


    this.supplierPurchaseItems.splice(
      index,
      1
    );


    console.log(
      'Removed item index:',
      index
    );


    console.log(
      'Remaining items:',
      this.supplierPurchaseItems
    );


    this.alert.success(
      'Product variant removed'
    );

  }



  // =====================================================
  // SUBMIT ALL ITEMS
  // =====================================================

  onSubmit(): void {

    // ================================================
    // PURCHASE VALIDATION
    // ================================================

    const purchaseId =

      this.supplierPurchaseItemForm
        .get('purchase')
        ?.value;


    if (!purchaseId) {

      this.alert.error(
        'Please select supplier purchase'
      );

      return;

    }


    // ================================================
    // ITEMS VALIDATION
    // ================================================

    if (
      this.supplierPurchaseItems.length === 0
    ) {

      this.alert.error(

        'Please add at least one product variant'

      );

      return;

    }


    // ================================================
    // PREVENT DOUBLE SUBMIT
    // ================================================

    if (this.isSaving) {

      return;

    }


    this.isSaving = true;


    // ================================================
    // CREATE PAYLOADS
    // ================================================

    const requests =
      this.supplierPurchaseItems.map(
        item => {

          return {

            purchase:
              item.purchase,

            product:
              item.product,

            variantId:
              item.variantId,

            quantity:
              Number(
                item.quantity
              ),

            purchasePrice:
              Number(
                item.purchasePrice
              ),

            supplierProductCode:
              item.supplierProductCode
                ?.trim() || '',

            batchNumber:
              item.batchNumber
                ?.trim() || '',

            discount:
              Number(
                item.discount
              ) || 0,

            tax:
              Number(
                item.tax
              ) || 0,

            totalAmount:
              Number(
                item.totalAmount
              ),

            notes:
              item.notes
                ?.trim() || ''

          };

        }
      );


    console.log(
      'All Supplier Purchase Item Payloads:',
      requests
    );


    // ================================================
    // CREATE ITEMS ONE BY ONE
    // ================================================

    this.createItemsSequentially(
      requests,
      0
    );

  }



  // =====================================================
  // CREATE ITEMS SEQUENTIALLY
  // =====================================================

  createItemsSequentially(
    items: any[],
    index: number
  ): void {

    // ================================================
    // ALL ITEMS CREATED
    // ================================================

    if (
      index >= items.length
    ) {

      this.isSaving = false;


      this.alert.success(

        `${items.length} supplier purchase item(s) created successfully`

      );


      this.router.navigate([
        '/admin/supplier-purchase-item'
      ]);


      return;

    }


    const item =
      items[index];


    console.log(

      `Creating item ${index + 1} of ${items.length}`,

      item

    );


    // ================================================
    // CREATE API
    // ================================================

    this.supplierPurchaseItemService

      .createSupplierPurchaseItem(item)

      .subscribe({

        next: (response: any) => {

          console.log(

            `Created item ${index + 1}`,

            response

          );


          // ==========================================
          // CREATE NEXT ITEM
          // ==========================================

          this.createItemsSequentially(

            items,

            index + 1

          );

        },


        error: (error: any) => {

          console.error(

            `Failed to create item ${index + 1}`,

            error

          );


          this.isSaving = false;


          Swal.fire({

            icon: 'error',

            title: 'Failed',

            text:

              error?.error?.message ||

              `Failed to create product item ${index + 1}`

          });

        }

      });

  }



  // =====================================================
  // ADD NEW PRODUCT
  // =====================================================

  addNewProduct(
    searchTerm: string
  ): void {

    if (
      !searchTerm?.trim()
    ) {

      return;

    }


    console.log(

      searchTerm,

      'product to add'

    );


    this.router.navigate(

      ['/admin/create-product'],

      {

        queryParams: {

          name:
            searchTerm.trim()

        }

      }

    );

  }



  // =====================================================
  // BACK
  // =====================================================

  goBack(): void {

    this.router.navigate([

      '/admin/supplier-purchase-item'

    ]);

  }
}
