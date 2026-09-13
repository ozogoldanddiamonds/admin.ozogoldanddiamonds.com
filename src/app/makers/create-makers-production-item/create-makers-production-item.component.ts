import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { MakersProductionItemService } from 'src/app/Services/makers-production-item.service';
import { MakersProductionService } from 'src/app/Services/makers-production.service';
import { MakersService } from 'src/app/Services/makers.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-create-makers-production-item',
  templateUrl: './create-makers-production-item.component.html',
  styleUrls: ['./create-makers-production-item.component.css']
})
export class CreateMakersProductionItemComponent implements OnInit {


  // ==========================================
  // FORM
  // ==========================================

  makerProductionItemForm!: FormGroup;


  // ==========================================
  // PRODUCTION LIST
  // ==========================================

  productionList: any[] = [];


  // ==========================================
  // PRODUCT LIST
  // ==========================================

  productList: any[] = [];


  // ==========================================
  // VARIANT LIST
  // ==========================================

  variantList: any[] = [];


  // ==========================================
  // SELECTED PRODUCTION
  // ==========================================

  selectedProduction: any = null;


  // ==========================================
  // SELECTED PRODUCT
  // ==========================================

  selectedProduct: any = null;


  // ==========================================
  // SELECTED VARIANT
  // ==========================================

  selectedVariant: any = null;


  // ==========================================
  // UI
  // ==========================================

  isSubmitted = false;

  isLoading = false;


  constructor(

    private fb:
      FormBuilder,

    private makerProductionService:
      MakersProductionService,

    private makerProductionItemService:
      MakersProductionItemService,

    private productService:
      ProductService,

    private makerService:
      MakersService,

    private router:
      Router,

    private alertService:
      AlertService

  ) { }


  // ==========================================
  // ON INIT
  // ==========================================

  ngOnInit(): void {

    this.initializeForm();

    this.getMakerProductions();

    this.getProducts();

  }


  // ==========================================
  // INITIALIZE FORM
  // ==========================================

  initializeForm(): void {

    this.makerProductionItemForm =
      this.fb.group({

        // ====================================
        // Production
        // ====================================

        production: [

          '',

          Validators.required

        ],


        // ====================================
        // Product
        // ====================================

        product: [

          '',

          Validators.required

        ],


        // ====================================
        // Variant
        // ====================================

        variantId: [

          '',

          Validators.required

        ],


        // ====================================
        // Quantity Given
        // ====================================

        quantityGiven: [

          '',

          [

            Validators.required,

            Validators.min(1)

          ]

        ],


        // ====================================
        // Quantity Received
        // ====================================

        quantityReceived: [

          0,

          [

            Validators.min(0)

          ]

        ],


        // ====================================
        // Notes
        // ====================================

        notes: [

          ''

        ]

      });

  }
  getVariantLabel(variant: any): string {

    if (!variant) {
      return 'Variant';
    }

    const parts: string[] = [];


    // ==========================================
    // SKU
    // ==========================================

    if (variant.sku) {

      parts.push(
        `SKU: ${variant.sku}`
      );

    }


    // ==========================================
    // Size
    // ==========================================

    if (variant.size) {

      parts.push(
        `Size: ${variant.size}`
      );

    }


    // ==========================================
    // Metal Purity
    // ==========================================

    if (variant.metalPurity) {

      parts.push(
        variant.metalPurity
      );

    }


    // ==========================================
    // Metal Color
    // ==========================================

    if (variant.metalColor) {

      parts.push(
        variant.metalColor
      );

    }


    // ==========================================
    // Fallback
    // ==========================================

    return parts.length
      ? parts.join(' | ')
      : 'Variant';

  }

  // ==========================================
  // GET MAKER PRODUCTIONS
  // ==========================================

  getMakerProductions(): void {

    this.makerProductionService
      .getAllMakerProductions()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Maker Productions:',
            response
          );


          this.productionList =
            response?.data || [];

        },


        error: (error: any) => {

          console.log(
            'Get Maker Productions Error:',
            error
          );


          this.productionList = [];


          this.alertService.error(

            error?.error?.message ||

            'Failed to load maker productions'

          );

        }

      });

  }


  // ==========================================
  // GET PRODUCTS
  // ==========================================

  getProducts(): void {

    this.productService
      .getAllProducts()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Products Response:',
            response
          );


          this.productList = (response?.data || []).map((product: any) => {

            const productName =
              product.productName ||
              product.name ||
              'Product';

            const productCode =
              product.productCode ||
              product.code ||
              '';

            return {
              ...product,

              // Display name
              displayName: productCode
                ? `${productName} - ${productCode}`
                : productName,

              // Search value
              searchName: productCode
                ? `${productName} ${productCode}`
                : productName
            };

          });

        },


        error: (error: any) => {

          console.log(
            'Get Products Error:',
            error
          );


          this.productList = [];


          this.alertService.error(

            error?.error?.message ||

            'Failed to load products'

          );

        }

      });

  }


  // ==========================================
  // PRODUCTION CHANGE
  // ==========================================

  onProductionChange(): void {

    const productionId =
      this.makerProductionItemForm
        .get('production')
        ?.value;


    // ========================================
    // Reset Selected
    // ========================================

    this.selectedProduction =
      null;


    if (!productionId) {

      return;

    }


    // ========================================
    // Find Production
    // ========================================

    this.selectedProduction =
      this.productionList.find(

        production =>

          String(production._id) ===
          String(productionId)

      ) || null;


    console.log(
      'Selected Production:',
      this.selectedProduction
    );

  }

  // ==========================================
  // ADD NEW PRODUCT
  // ==========================================

  addNewProduct(searchTerm: string): void {

    if (!searchTerm?.trim()) {

      return;

    }


    const productName =
      searchTerm.trim();


    console.log(
      'Add New Product:',
      productName
    );


    this.router.navigate(
      ['/admin/create-product'],
      {
        queryParams: {
          name: productName
        }
      }
    );

  }
  // ==========================================
  // PRODUCT CHANGE
  // ==========================================

  onProductChange(): void {

    const productId =
      this.makerProductionItemForm
        .get('product')
        ?.value;


    // ========================================
    // Reset Variant
    // ========================================

    this.variantList = [];

    this.selectedProduct = null;

    this.selectedVariant = null;


    this.makerProductionItemForm
      .get('variantId')
      ?.setValue('');


    if (!productId) {

      return;

    }


    // ========================================
    // Find Product
    // ========================================

    this.selectedProduct =
      this.productList.find(

        product =>

          String(product._id) ===
          String(productId)

      ) || null;


    console.log(
      'Selected Product:',
      this.selectedProduct
    );


    if (!this.selectedProduct) {

      return;

    }


    // ========================================
    // Load Variants
    // ========================================

    this.variantList =
      this.selectedProduct.variants || [];


    console.log(
      'Variant List:',
      this.variantList
    );

  }


  // ==========================================
  // VARIANT CHANGE
  // ==========================================

  onVariantChange(): void {

    const variantId =
      this.makerProductionItemForm
        .get('variantId')
        ?.value;


    this.selectedVariant =
      null;


    if (!variantId) {

      return;

    }


    this.selectedVariant =
      this.variantList.find(

        variant =>

          String(variant._id) ===
          String(variantId)

      ) || null;


    console.log(
      'Selected Variant:',
      this.selectedVariant
    );

  }


  // ==========================================
  // GET SELECTED PRODUCT NAME
  // ==========================================

  getSelectedProductName(): string {

    if (
      !this.selectedProduct
    ) {

      return '';

    }


    return (

      this.selectedProduct.productName ||

      this.selectedProduct.name ||

      this.selectedProduct.productCode ||

      this.selectedProduct.code ||

      ''

    );

  }


  // ==========================================
  // GET SELECTED VARIANT NAME
  // ==========================================

  getSelectedVariantName(): string {

    if (!this.selectedVariant) {

      return '';

    }


    return this.getVariantLabel(
      this.selectedVariant
    );

  }

  // ==========================================
  // PENDING QUANTITY
  // ==========================================

  getPendingQuantity(): number {

    const quantityGiven =
      Number(

        this.makerProductionItemForm
          ?.get('quantityGiven')
          ?.value || 0

      );


    const quantityReceived =
      Number(

        this.makerProductionItemForm
          ?.get('quantityReceived')
          ?.value || 0

      );


    const pending =
      quantityGiven -
      quantityReceived;


    return Math.max(
      pending,
      0
    );

  }


  // ==========================================
  // SUBMIT
  // ==========================================

  onSubmit(): void {

    this.isSubmitted = true;


    // ========================================
    // VALIDATE FORM
    // ========================================

    if (
      this.makerProductionItemForm.invalid
    ) {

      this.makerProductionItemForm
        .markAllAsTouched();


      this.alertService.error(

        'Please fill all required fields'

      );

      return;

    }


    const value =
      this.makerProductionItemForm.value;


    // ========================================
    // QUANTITY GIVEN
    // ========================================

    const quantityGiven =
      Number(
        value.quantityGiven
      );


    if (
      !Number.isFinite(quantityGiven) ||
      quantityGiven < 1
    ) {

      this.alertService.error(

        'Quantity Given must be at least 1'

      );

      return;

    }


    // ========================================
    // QUANTITY RECEIVED
    // ========================================

    const quantityReceived =
      value.quantityReceived === '' ||
        value.quantityReceived === null ||
        value.quantityReceived === undefined

        ? 0

        : Number(
          value.quantityReceived
        );


    if (
      !Number.isFinite(quantityReceived) ||
      quantityReceived < 0
    ) {

      this.alertService.error(

        'Quantity Received must be 0 or greater'

      );

      return;

    }


    // ========================================
    // RECEIVED CANNOT EXCEED GIVEN
    // ========================================

    if (
      quantityReceived >
      quantityGiven
    ) {

      this.alertService.error(

        'Quantity Received cannot be greater than Quantity Given'

      );

      return;

    }


    // ========================================
    // PRODUCTION
    // ========================================

    if (!value.production) {

      this.alertService.error(
        'Please select production'
      );

      return;

    }


    // ========================================
    // PRODUCT
    // ========================================

    if (!value.product) {

      this.alertService.error(
        'Please select product'
      );

      return;

    }


    // ========================================
    // VARIANT
    // ========================================

    if (!value.variantId) {

      this.alertService.error(
        'Please select variant'
      );

      return;

    }


    // ========================================
    // PREPARE PAYLOAD
    // ========================================

    const itemData = {

      production:
        value.production,

      product:
        value.product,

      variantId:
        value.variantId,

      quantityGiven:
        quantityGiven,

      quantityReceived:
        quantityReceived,

      notes:
        value.notes
          ?.trim() || ''

    };


    // ========================================
    // DEBUG
    // ========================================

    console.log(
      'Maker Production Item Payload:',
      itemData
    );


    // ========================================
    // LOADING
    // ========================================

    this.isLoading = true;


    // ========================================
    // CREATE API
    // ========================================

    this.makerProductionItemService
      .createMakerProductionItem(
        itemData
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Create Maker Production Item Response:',
            response
          );


          this.isLoading = false;


          this.alertService.success(

            response?.message ||

            'Maker production item created successfully'

          );


          // ==================================
          // NAVIGATE
          // ==================================

          this.router.navigate([

            '/admin/gold-smith-production-item-list'

          ]);

        },


        error: (error: any) => {

          console.log(
            'Create Maker Production Item Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to create maker production item'

          );

        }

      });

  }


  // ==========================================
  // BACK
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/admin/gold-smith-production-item-list'

    ]);

  }

}
