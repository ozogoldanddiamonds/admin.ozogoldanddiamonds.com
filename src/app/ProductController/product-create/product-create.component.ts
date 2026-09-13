import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { SubsubcategoryService } from 'src/app/Services/subsubcategory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {


  productForm!: FormGroup;

  // =========================
  // FILES
  // =========================
  categories: any[] = [];

  subCategories: any[] = [];

  subSubCategories: any[] = [];

  selectedImages: File[] = [];

  selectedVideo!: File;

  selectedCertificate!: File;

  imagePreview: string[] = [];

  videoPreview: string = '';
  certificateFile: File | null = null;
  certificatePreview: string | ArrayBuffer | null = null;
 imageCards: any[] = [
  {
    file: null,
    preview: ''
  }
];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,

    private subCategoryService: SubcategoryService,

    private subSubCategoryService:

      SubsubcategoryService,
    public router:
      Router,
      private alert: AlertService

  ) {

    this.productForm = this.fb.group({

      name: ['', Validators.required],

      slug: [''],

      shortDescription: [''],

      description: ['', Validators.required],

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

    this.addVariant();

  }
  ngOnInit(): void {

    this.getCategories();
  }

  // =========================================================
  // VARIANTS
  // =========================================================
  getCategories(): void {

    this.categoryService
      .getAllCategories()
      .subscribe({

        next: (res: any) => {

          this.categories =
            res.data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }
  onCategoryChange(event: any): void {

    const categoryId =
      event.target.value;

    this.productForm.patchValue({

      subCategory: '',

      subSubCategory: ''

    });

    this.subSubCategories = [];

    this.subCategoryService
      .getSubCategoryByCategory(
        categoryId
      )
      .subscribe({

        next: (res: any) => {

          this.subCategories =
            res.data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }
  onSubCategoryChange(
    event: any
  ): void {

    const subCategoryId =
      event.target.value;

    console.log(subCategoryId);

    this.productForm.patchValue({

      subSubCategory: ''

    });

    this.subSubCategoryService
      .getSubSubCategoryBySubCategory(
        subCategoryId
      )
      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.subSubCategories =
            res.data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }
  get variants(): FormArray {

    return this.productForm.get(
      'variants'
    ) as FormArray;

  }

  createVariant(): FormGroup {

    return this.fb.group({

      size: ['', Validators.required],

      sku: ['', Validators.required],

      stock:  [null, Validators.required],


      metalType:  [''],

      metalPurity: ['', Validators.required],

      metalColor: ['yellow'],

      grossWeight: [null, Validators.required],

      netWeight: [null, Validators.required],

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

  // =========================================================
  // DIAMONDS
  // =========================================================
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

  // =========================================================>
  // MULTIPLE IMAGES
  // =========================================================

  onImageSelect(
  event: any,
  index: number
): void {

  const file =
    event.target.files[0];

  if (file) {

    this.imageCards[index].file =
      file;

    const reader =
      new FileReader();

    reader.onload =
      (e: any) => {

        this.imageCards[index].preview =
          e.target.result;

      };

    reader.readAsDataURL(file);

  }

}

addImageCard(): void {

  this.imageCards.push({

    file: null,

    preview: ''

  });

}

removeImage(
  index: number
): void {

  this.imageCards.splice(
    index,
    1
  );

}

  

  // =========================================================
  // VIDEO
  // =========================================================

  onVideoSelect(event: any): void {

    const file = event.target.files[0];

    if (file) {

      this.selectedVideo = file;

      this.videoPreview =
        URL.createObjectURL(file);

    }

  }

  // =========================================================
  // CERTIFICATE
  // =========================================================

  // onCertificateSelect(
  //   event: any
  // ): void {

  //   const file = event.target.files[0];

  //   if (file) {

  //     this.selectedCertificate = file;

  //   }

  // }
  onCertificateSelect(event: any): void {

    const file = event.target.files[0];

    if (file) {

      this.certificateFile = file;

      const reader = new FileReader();

      reader.onload = () => {
        this.certificatePreview = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  removeCertificate(): void {
    this.certificateFile = null;
    this.certificatePreview = null;
  }

  // =========================================================
  // SUBMIT
  // =========================================================
  onSubmit(): void {
    

   if (!this.productForm.get('name')?.value) {
  Swal.fire('Error', 'Product Name is required', 'error');
  return;
}

if (!this.productForm.get('category')?.value) {
  Swal.fire('Error', 'Category is required', 'error');
  return;
}

if (!this.productForm.get('subCategory')?.value) {
  Swal.fire('Error', 'Sub Category is required', 'error');
  return;
}

if (!this.productForm.get('productType')?.value) {
  Swal.fire('Error', 'Product Type is required', 'error');
  return;
}
const hasImage =
  this.imageCards.some(
    img => img.file
  );

if (!hasImage) {

  Swal.fire(
    'Error',
    'At least one Product Image is required',
    'error'
  );

  return;

}

// if (this.selectedImages.length === 0) {
//   Swal.fire('Error', 'At least one Product Image is required', 'error');
//   return;
// }

    const formValue =
      this.productForm.value;
      

    const formData =
      new FormData();

    // =========================
    // TAGS ARRAY
    // =========================

    formValue.tags =
      formValue.tags
        ? formValue.tags
          .split(',')
          .map((tag: string) =>
            tag.trim()
          )
        : [];

    // =========================
    // META KEYWORDS ARRAY
    // =========================

    formValue.metaKeywords =
      formValue.metaKeywords
        ? formValue.metaKeywords
          .split(',')
          .map((keyword: string) =>
            keyword.trim()
          )
        : [];

    // =========================
    // VARIANTS
    // =========================

   for (let i = 0; i < formValue.variants.length; i++) {

  const variant =
    formValue.variants[i];

  if (!variant.sku) {

    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: `Variant ${i + 1} - SKU is required`
    });

    return;
  }

  if (
    variant.stock === null ||
    variant.stock === undefined
  ) {

    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: `Variant ${i + 1} - Stock is required`
    });

    return;
  }

  if (!variant.metalType) {

    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: `Variant ${i + 1} - Metal Type is required`
    });

    return;
  }

  if (!variant.metalPurity) {

    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: `Variant ${i + 1} - Metal Purity is required`
    });

    return;
  }

  if (!variant.grossWeight) {

    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: `Variant ${i + 1} - Gross Weight is required`
    });

    return;
  }

  if (!variant.netWeight) {

    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: `Variant ${i + 1} - Net Weight is required`
    });

    return;
  }

}

    // =========================
    // OTHER FIELDS
    // =========================

    Object.keys(formValue)
      .forEach((key) => {

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

      JSON.stringify(
        formValue.tags
      )

    );

    console.log(formValue.variants);

formData.append(
  'variants',
  JSON.stringify(
    formValue.variants
  )
);

    // =========================
    // META KEYWORDS
    // =========================

    formData.append(

      'metaKeywords',

      JSON.stringify(
        formValue.metaKeywords
      )

    );

    // =========================
    // IMAGES
    // =========================

    // this.selectedImages
    //   .forEach((file) => {

    //     formData.append(

    //       'images',


    //       file

    //     );

    //   });
    this.imageCards.forEach(
  (img) => {

    if (img.file) {

      formData.append(
        'images',
        img.file
      );

    }

  }
);

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

    if (
      this.selectedCertificate
    ) {

      formData.append(

        'certificate',

        this.selectedCertificate

      );

    }

    // =========================
    // API CALL
    // =========================

    this.productService
      .createProduct(
        formData
      )
      .subscribe({

        next: (res) => {

          console.log(res);

         this.alert.success('Created Successfully');

          this.router.navigate([

            '/admin/product'

          ]);

        },

        error: (err) => {

      console.log(err);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text:
          err?.error?.message ||
          'Something went wrong'
      });

    }

  });

  }
  goBack() {
    this.router.navigate([
      '/admin/product'
    ]);
  }
}