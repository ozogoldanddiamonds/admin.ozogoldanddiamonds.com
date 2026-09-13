import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { MakersProductionItemService } from 'src/app/Services/makers-production-item.service';
import { MakersProductionService } from 'src/app/Services/makers-production.service';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-update-makers-production-item',
  templateUrl: './update-makers-production-item.component.html',
  styleUrls: ['./update-makers-production-item.component.css']
})
export class UpdateMakersProductionItemComponent implements OnInit {


  // ==========================================
  // FORM
  // ==========================================

  makerProductionItemForm!: FormGroup;


  // ==========================================
  // ITEM ID
  // ==========================================

  itemId: string = '';


  // ==========================================
  // MODE
  // ==========================================

  isViewMode = false;

  isEditMode = false;


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
  // SELECTED DATA
  // ==========================================

  selectedProduction: any = null;

  selectedProduct: any = null;

  selectedVariant: any = null;


  // ==========================================
  // UI
  // ==========================================

  isLoading = false;

  isSubmitted = false;


  constructor(

    private fb:
      FormBuilder,

    private route:
      ActivatedRoute,

    private router:
      Router,

    private makerProductionItemService:
      MakersProductionItemService,

    private makerProductionService:
      MakersProductionService,

    private productService:
      ProductService,

    private alertService:
      AlertService

  ) { }


  // ==========================================
  // ON INIT
  // ==========================================

  ngOnInit(): void {

    this.initializeForm();


    // ========================================
    // ITEM ID
    // ========================================

    this.itemId =
      this.route.snapshot
        .paramMap
        .get('id') || '';


    // ========================================
    // MODE
    // ========================================

    const mode =
      this.route.snapshot
        .queryParamMap
        .get('mode');


    this.isViewMode =
      mode === 'view';

    this.isEditMode =
      mode !== 'view';


    console.log(
      'Item ID:',
      this.itemId
    );

    console.log(
      'Mode:',
      mode
    );


    // ========================================
    // VALIDATE ID
    // ========================================

    if (!this.itemId) {

      this.alertService.error(
        'Maker Production Item ID not found'
      );

      this.goBack();

      return;

    }


    // ========================================
    // LOAD MASTER DATA
    // ========================================

    this.getMakerProductions();

    this.getProducts();


    // ========================================
    // GET ITEM DETAILS
    // ========================================

    this.getMakerProductionItemById();

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


  // ==========================================
  // GET ALL MAKER PRODUCTIONS
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


          // ==================================
          // Re-bind selected production
          // after master data arrives
          // ==================================

          this.bindSelectedProduction();

        },


        error: (error: any) => {

          console.log(
            'Get Maker Productions Error:',
            error
          );


          this.productionList = [];

        }

      });

  }


  // ==========================================
  // GET ALL PRODUCTS
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


          this.productList =
            (response?.data || [])
              .map((product: any) => {

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

                  displayName:
                    productCode
                      ? `${productName} - ${productCode}`
                      : productName,

                  searchName:
                    productCode
                      ? `${productName} ${productCode}`
                      : productName

                };

              });


          console.log(
            'Formatted Product List:',
            this.productList
          );

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
  // GET ITEM BY ID
  // ==========================================
  getMakerProductionItemById(): void {

    this.isLoading = true;

    this.makerProductionItemService
      .getMakerProductionItemById(this.itemId)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Maker Production Item Details:',
            response
          );


          const item = response?.data;


          if (!item) {

            this.isLoading = false;

            this.alertService.error(
              'Maker production item details not found'
            );

            return;

          }


          // ==========================================
          // GET IDS
          // ==========================================

          const productionId =
            item.production?._id ||
            item.production ||
            '';


          const productId =
            item.product?._id ||
            item.product ||
            '';


          const variantId =
            item.variantId ||
            '';


          // ==========================================
          // SET SELECTED PRODUCTION
          // ==========================================

          this.selectedProduction =
            this.productionList.find(
              production =>
                String(production._id) ===
                String(productionId)
            ) || item.production || null;


          // ==========================================
          // SET SELECTED PRODUCT
          // ==========================================

          this.selectedProduct =
            this.productList.find(
              product =>
                String(product._id) ===
                String(productId)
            ) || item.product || null;


          // ==========================================
          // LOAD VARIANTS
          // ==========================================

          if (this.selectedProduct) {

            this.variantList =
              this.selectedProduct.variants || [];

          }
          else {

            // API response lo product populated ga
            // vastundi kabatti direct ga use cheyyachu

            this.variantList =
              item.product?.variants || [];

          }


          console.log(
            'Variant List:',
            this.variantList
          );


          // ==========================================
          // PATCH FORM
          // ==========================================

          this.makerProductionItemForm.patchValue({

            production:
              productionId,

            product:
              productId,

            quantityGiven:
              item.quantityGiven ?? 0,

            quantityReceived:
              item.quantityReceived ?? 0,

            notes:
              item.notes || ''

          });


          // ==========================================
          // PATCH VARIANT AFTER VARIANT LIST LOAD
          // ==========================================

          const selectedVariant =
            this.variantList.find(
              variant =>
                String(variant._id) ===
                String(variantId)
            ) || null;


          this.selectedVariant =
            selectedVariant;


          this.makerProductionItemForm.patchValue({

            variantId:
              selectedVariant?._id || variantId || ''

          });


          console.log(
            'Selected Variant:',
            this.selectedVariant
          );


          console.log(
            'Final Form:',
            this.makerProductionItemForm.value
          );


          // ==========================================
          // VIEW MODE
          // ==========================================

          if (this.isViewMode) {

            this.makerProductionItemForm.disable();

          }


          this.isLoading = false;

        },


        error: (error: any) => {

          console.log(
            'Get Item Details Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to load maker production item details'

          );

        }

      });

  }

  // ==========================================
  // BIND SELECTED PRODUCTION
  // ==========================================

  bindSelectedProduction(): void {

    const productionId =
      this.makerProductionItemForm
        ?.get('production')
        ?.value;


    if (!productionId) {

      this.selectedProduction = null;

      return;

    }


    this.selectedProduction =
      this.productionList.find(

        item =>
          String(item._id) ===
          String(productionId)

      ) || null;


  }


  // ==========================================
  // BIND SELECTED PRODUCT
  // ==========================================

  bindSelectedProduct(): void {

    const productId =
      this.makerProductionItemForm
        ?.get('product')
        ?.value;


    if (!productId) {

      this.selectedProduct = null;

      this.variantList = [];

      return;

    }


    this.selectedProduct =
      this.productList.find(

        item =>
          String(item._id) ===
          String(productId)

      ) || null;


    // ========================================
    // Load Variants
    // ========================================

    this.variantList =
      this.selectedProduct
        ?.variants || [];


    this.bindSelectedVariant();

  }


  // ==========================================
  // BIND SELECTED VARIANT
  // ==========================================

  bindSelectedVariant(): void {

    const variantId =
      this.makerProductionItemForm
        ?.get('variantId')
        ?.value;


    if (!variantId) {

      this.selectedVariant = null;

      return;

    }


    this.selectedVariant =
      this.variantList.find(

        variant =>
          String(variant._id) ===
          String(variantId)

      ) || null;

  }


  // ==========================================
  // PRODUCTION CHANGE
  // ==========================================

  onProductionChange(): void {

    const productionId =
      this.makerProductionItemForm
        .get('production')
        ?.value;


    this.selectedProduction =
      null;


    if (!productionId) {

      return;

    }


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
  // PRODUCT CHANGE
  // ==========================================

  onProductChange(): void {

    const productId =
      this.makerProductionItemForm
        .get('product')
        ?.value;


    this.variantList = [];

    this.selectedProduct = null;

    this.selectedVariant = null;


    this.makerProductionItemForm
      .get('variantId')
      ?.setValue('');


    if (!productId) {

      return;

    }


    this.selectedProduct =
      this.productList.find(

        product =>

          String(product._id) ===
          String(productId)

      ) || null;


    if (!this.selectedProduct) {

      return;

    }


    this.variantList =
      this.selectedProduct
        .variants || [];


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
      this.variantList.find(

        variant =>

          String(variant._id) ===
          String(variantId)

      ) || null;

  }


  // ==========================================
  // SELECTED PRODUCT NAME
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
  // SELECTED VARIANT NAME
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


    return Math.max(

      quantityGiven -
      quantityReceived,

      0

    );

  }


  // ==========================================
  // SUBMIT / UPDATE
  // ==========================================

  onSubmit(): void {

    // ========================================
    // PREVENT VIEW SUBMIT
    // ========================================

    if (
      this.isViewMode
    ) {

      return;

    }


    this.isSubmitted = true;


    // ========================================
    // VALIDATE
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
      !Number.isFinite(
        quantityReceived
      ) ||
      quantityReceived < 0
    ) {

      this.alertService.error(

        'Quantity Received must be 0 or greater'

      );

      return;

    }


    // ========================================
    // RECEIVED <= GIVEN
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
    // VALIDATE REFERENCES
    // ========================================

    if (!value.production) {

      this.alertService.error(
        'Please select production'
      );

      return;

    }


    if (!value.product) {

      this.alertService.error(
        'Please select product'
      );

      return;

    }


    if (!value.variantId) {

      this.alertService.error(
        'Please select variant'
      );

      return;

    }


    // ========================================
    // PREPARE UPDATE DATA
    // ========================================

    const updateData = {

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


    console.log(
      'Update Maker Production Item Payload:',
      updateData
    );


    // ========================================
    // LOADING
    // ========================================

    this.isLoading = true;


    // ========================================
    // UPDATE API
    // ========================================

    this.makerProductionItemService
      .updateMakerProductionItem(

        this.itemId,

        updateData

      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Update Maker Production Item Response:',
            response
          );


          this.isLoading = false;


          this.alertService.success(

            response?.message ||

            'Maker production item updated successfully'

          );


          this.router.navigate([

            '/admin/gold-smith-production-item-list'

          ]);

        },


        error: (error: any) => {

          console.log(
            'Update Maker Production Item Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to update maker production item'

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
