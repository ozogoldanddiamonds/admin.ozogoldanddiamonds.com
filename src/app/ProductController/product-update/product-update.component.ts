import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { SubsubcategoryService } from 'src/app/Services/subsubcategory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  // =====================================
  // FORM
  // =====================================

  productForm!: FormGroup;

  // =====================================
  // PRODUCT ID
  // =====================================

  productId!: string;

  // =====================================
  // CATEGORY DATA
  // =====================================

  categories: any[] = [];

  subCategories: any[] = [];

  subSubCategories: any[] = [];

  // =====================================
  // FILES
  // =====================================

  selectedImages: File[] = [];

  selectedVideo!: File;

  selectedCertificate!: File;

  // =====================================
  // PREVIEW
  // =====================================

  imagePreview: any[] = [];

  videoPreview: any;
  certificateFile: File | null = null;
  certificatePreview: string | ArrayBuffer | null = null;

  // =====================================
  // CONSTRUCTOR
  // =====================================


  constructor(

    private fb: FormBuilder,

    private route:
      ActivatedRoute,

    private router:
      Router,

    private productService:
      ProductService,

    private categoryService:
      CategoryService,

    private subCategoryService:
      SubcategoryService,

    private subSubCategoryService:
      SubsubcategoryService,
             private alert: AlertService
      

  ) { }

  // =====================================
  // ON INIT
  // =====================================

  ngOnInit(): void {

    this.initializeForm();

    this.productId =
      this.route.snapshot.params['id'];

    this.getCategories();

    this.getProductById();

  }

  // =====================================
  // INITIALIZE FORM
  // =====================================

  initializeForm(): void {

    this.productForm = this.fb.group({

      name: ['', Validators.required],

      slug: [''],

      shortDescription: [''],

      description: [''],

      category: [''],

      subCategory: [''],

      subSubCategory: [''],

      productType: ['', Validators.required],

      gender: [''],

      occasion: [''],

      brand: [''],

      hallmarkNumber: [''],

      hallmarkCertified: [true],

      certificationIncluded: [true],

      featured: [false],

      bestSeller: [false],

      trending: [false],

      newArrival: [false],

      tags: [''],

      seoTitle: [''],

      seoDescription: [''],

      metaKeywords: [''],

      isActive: [true],

      variants: this.fb.array([])

    });


  }

  // =====================================
  // GET VARIANTS
  // =====================================

  get variants(): FormArray {

    return this.productForm.get(
      'variants'
    ) as FormArray;

  }

  // =====================================
  // CREATE VARIANT
  // =====================================
  createVariant(): FormGroup {

    return this.fb.group({

      size: [''],

      sku: [''],

      stock: [0],

      metalType: ['gold'],

      metalPurity: [''],

      metalColor: ['yellow'],

      grossWeight: [0],

      netWeight: [0],

      wastagePercentage: [0],

      makingCharges: [0],

      makingChargeType: ['fixed'],

      discountPercentage: [0],

      stones: this.fb.array([])

    });

  }

  addVariant(): void {

    const variant =
      this.createVariant();

    this.variants.push(
      variant
    );

  }

  removeVariant(index: number): void {

    this.variants.removeAt(index);

  }
  // =====================================
  // GET DIAMONDS
  // =====================================
  getStones(
    variantIndex: number
  ): FormArray {

    return this.variants
      .at(variantIndex)
      .get('stones') as FormArray;

  }

  createStone(): FormGroup {

    return this.fb.group({

      stoneType: ['diamond'],

      stoneCategory: ['natural'],

      quality: [''],

      totalWeight: [0],

      quantity: [1]

    });

  }
  addStone(
    variantIndex: number
  ): void {

    this.getStones(
      variantIndex
    ).push(
      this.createStone()
    );

  }

  removeStone(
    variantIndex: number,
    stoneIndex: number
  ): void {

    this.getStones(
      variantIndex
    ).removeAt(
      stoneIndex
    );

  }


  // =====================================
  // GET PRODUCT BY ID
  // =====================================

  getProductById(): void {

    this.productService
      .getProductById(
        this.productId
      )
      .subscribe({

        next: (res: any) => {

          const product =
            res.data;

          // =========================
          // PATCH PRODUCT
          // =========================

          this.productForm.patchValue({

            name:
              product.name,

            slug:
              product.slug,

            shortDescription:
              product.shortDescription,

            description:
              product.description,

            category:
              product.category?._id,

            subCategory:
              product.subCategory?._id,

            subSubCategory:
              product.subSubCategory?._id,

            productType:
              product.productType,

            gender:
              product.gender,

            occasion:
              product.occasion,

            brand:
              product.brand,

            hallmarkNumber:
              product.hallmarkNumber,

            hallmarkCertified:
              product.hallmarkCertified,

            certificationIncluded:
              product.certificationIncluded,

            featured:
              product.featured,

            bestSeller:
              product.bestSeller,

            trending:
              product.trending,

            newArrival:
              product.newArrival,

            tags:
              product.tags?.join(', '),

            seoTitle:
              product.seoTitle,

            seoDescription:
              product.seoDescription,

            metaKeywords:
              product.metaKeywords?.join(', '),

            isActive:
              product.isActive

          });

          // =========================
          // PREVIEWS
          // =========================

          this.imagePreview =
            product.images || [];

          this.videoPreview =
            product.video || '';

          this.certificatePreview =
            product.certificateUrl || '';

          // =========================
          // LOAD DROPDOWNS
          // =========================

          this.onCategoryChange({

            target: {

              value:
                product.category?._id

            }

          });

          this.onSubCategoryChange({

            target: {

              value:
                product.subCategory?._id

            }

          });

          // =========================
          // CLEAR EXISTING VARIANTS
          // =========================

          this.variants.clear();

          // =========================
          // VARIANTS
          // =========================

          product.variants.forEach(
            (variant: any) => {

              const variantGroup =
                this.createVariant();

              variantGroup.patchValue({

                size:
                  variant.size,

                sku:
                  variant.sku,

                stock:
                  variant.stock,

                metalType:
                  variant.metalType,

                metalPurity:
                  variant.metalPurity,

                metalColor:
                  variant.metalColor,

                grossWeight:
                  variant.grossWeight,

                netWeight:
                  variant.netWeight,

                wastagePercentage:
                  variant.wastagePercentage,

                makingCharges:
                  variant.makingCharges,

                makingChargeType:
                  variant.makingChargeType,

                discountPercentage:
                  variant.discountPercentage

              });

              // =========================
              // STONES
              // =========================

              const stonesArray =
                variantGroup.get(
                  'stones'
                ) as FormArray;

              stonesArray.clear();

              variant.stones?.forEach(
                (stone: any) => {

                  const stoneGroup =
                    this.createStone();

                  stoneGroup.patchValue({

                    stoneType:
                      stone.stoneType,

                    stoneCategory:
                      stone.stoneCategory,

                    quality:
                      stone.quality,

                    totalWeight:
                      stone.totalWeight,

                    quantity:
                      stone.quantity

                  });

                  stonesArray.push(
                    stoneGroup
                  );

                }
              );

              this.variants.push(
                variantGroup
              );

            });

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // =====================================
  // GET CATEGORIES
  // =====================================

  getCategories(): void {

    this.categoryService
      .getAllCategories()
      .subscribe({

        next: (res: any) => {

          this.categories =
            res.data;

        }

      });

  }

  // =====================================
  // CATEGORY CHANGE
  // =====================================

  onCategoryChange(
    event: any
  ): void {

    const categoryId =
      event.target.value;

    this.subCategoryService
      .getSubCategoryByCategory(
        categoryId
      )
      .subscribe({

        next: (res: any) => {

          this.subCategories =
            res.data;

        }

      });

  }

  // =====================================
  // SUBCATEGORY CHANGE
  // =====================================

  onSubCategoryChange(
    event: any
  ): void {

    const subCategoryId =
      event.target.value;

    this.subSubCategoryService
      .getSubSubCategoryBySubCategory(
        subCategoryId
      )
      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.subSubCategories =
            res.data;

          // PATCH AFTER DATA LOAD

          setTimeout(() => {

            this.productForm
              .patchValue({

                subSubCategory:
                  this.productForm.value
                    .subSubCategory

              });

          });

        },

        error: (err: any) => {

          console.log(err);
          Swal.fire({

            icon: 'success',

            title: 'Success',

            text: 'Updated Successfully'

          });
        }

      });

  }

  // =====================================
  // IMAGE SELECT
  // =====================================

  onImageSelect(
    event: any
  ): void {

    const files =
      event.target.files;

    for (
      let i = 0;
      i < files.length;
      i++
    ) {

      this.selectedImages.push(
        files[i]
      );

      const reader =
        new FileReader();

      reader.onload = (e: any) => {

        this.imagePreview.push(
          e.target.result
        );

      };

      reader.readAsDataURL(
        files[i]
      );

    }

  }

  // =====================================
  // REMOVE IMAGE
  // =====================================

  removeImage(
    index: number
  ): void {

    this.imagePreview.splice(
      index,
      1
    );

    this.selectedImages.splice(
      index,
      1
    );

  }

  // =====================================
  // VIDEO SELECT
  // =====================================

  onVideoSelect(
    event: any
  ): void {

    const file =
      event.target.files[0];

    if (file) {

      this.selectedVideo =
        file;

      this.videoPreview =
        URL.createObjectURL(file);

    }

  }

  // =====================================
  // CERTIFICATE SELECT
  // =====================================

  onCertificateSelect(event: any): void {

    const file =
      event.target.files[0];

    if (file) {

      this.selectedCertificate =
        file;

      this.certificatePreview =
        URL.createObjectURL(file);

    }

  }

  // =====================================
  // UPDATE PRODUCT
  // =====================================

  onSubmit(): void {

    if (this.productForm.invalid) {

      this.productForm.markAllAsTouched();

      return;

    }

    const formValue = this.productForm.value;

    const formData = new FormData();

    // =========================
    // TAGS ARRAY
    // =========================

    formValue.tags = formValue.tags
      ? formValue.tags
        .split(',')
        .map((tag: string) => tag.trim())
      : [];

    // =========================
    // META KEYWORDS ARRAY
    // =========================

    formValue.metaKeywords = formValue.metaKeywords
      ? formValue.metaKeywords
        .split(',')
        .map((keyword: string) => keyword.trim())
      : [];

    // =========================
    // VARIANTS
    // =========================

    formData.append(
      'variants',
      JSON.stringify(formValue.variants)
    );

    // =========================
    // OTHER FIELDS
    // =========================

    Object.keys(formValue).forEach((key) => {

      if (
        key !== 'variants' &&
        key !== 'tags' &&
        key !== 'metaKeywords'
      ) {

        formData.append(
          key,
          formValue[key]
        );

      }

    });

    // =========================
    // TAGS
    // =========================

    formData.append(
      'tags',
      JSON.stringify(formValue.tags)
    );

    // =========================
    // META KEYWORDS
    // =========================

    formData.append(
      'metaKeywords',
      JSON.stringify(formValue.metaKeywords)
    );

    // =========================
    // IMAGES
    // =========================

    this.selectedImages.forEach((image) => {

      formData.append(
        'images',
        image
      );

    });

    // =========================
    // VIDEO
    // =========================

    if (this.selectedVideo) {

      formData.append(
        'video',
        this.selectedVideo
      );

    }

    // =========================
    // CERTIFICATE
    // =========================

    if (this.selectedCertificate) {

      formData.append(
        'certificate',
        this.selectedCertificate
      );

    }

    // =========================
    // UPDATE API
    // =========================

    this.productService
      .updateProduct(
        this.productId,
        formData
      )
      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.alert.success('Updated Successfully');

          this.router.navigate([
            '/admin/product'
          ]);

        },

        error: (err) => {

          console.log(err);

          Swal.fire({

            icon: 'error',

            title: 'Oops...',

            text: 'Update Failed'

          });

        }

      });

  }
  removeCertificate(): void {
    this.certificateFile = null;
    this.certificatePreview = null;
  }
  goBack() {
    this.router.navigate([
      '/admin/product'
    ]);
  }

}