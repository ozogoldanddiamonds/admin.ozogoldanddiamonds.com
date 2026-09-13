import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { CategoryService } from 'src/app/Services/category.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { SubsubcategoryService } from 'src/app/Services/subsubcategory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-sub-category-create',
  templateUrl: './sub-sub-category-create.component.html',
  styleUrls: ['./sub-sub-category-create.component.css']
})
export class SubSubCategoryCreateComponent implements OnInit {

  subSubCategoryForm!: FormGroup;

  categories: any[] = [];
  subCategories: any[] = [];

  selectedFile:
    File | null = null;

  imagePreview:
    string | ArrayBuffer | null = null;

  constructor(
    private fb:
      FormBuilder,

    private categoryService:
      CategoryService,

    private subCategoryService:
      SubcategoryService,

    private subSubCategoryService:
      SubsubcategoryService,

    private router:
      Router,
      private alert: AlertService

  ) {}

  ngOnInit(): void {

    this.subSubCategoryForm =
      this.fb.group({

        name: [
          '',
          Validators.required
        ],

        category: [
          '',
          Validators.required
        ],

        subCategory: [
          '',
          Validators.required
        ],

        isActive: [true]

      });

    this.getCategories();
    this.getSubCategories();
  }
  onCategoryChange(
  event: any
): void {

  const categoryId =
    event.target.value;

  // RESET SUBCATEGORY

  this.subSubCategoryForm
    .patchValue({

      subCategory: ''

    });

  // API CALL

  this.subCategoryService
    .getSubCategoryByCategory(
      categoryId
    )
    .subscribe({

      next: (res: any) => {

        console.log(res);

        this.subCategories =
          res.data;

      },

      error: (err: any) => {

        console.log(err);

      }

    });

}

  /*
  GET CATEGORY
  */
  getCategories() {
    this.categoryService
      .getAllCategories()
      .subscribe((res: any) => {
        this.categories =
          res.data;
      });
  }

  /*
  GET SUBCATEGORY
  */
  getSubCategories() {
    this.subCategoryService
      .getAllSubCategories()
      .subscribe((res: any) => {
        this.subCategories =
          res.data;
      });
  }

  /*
  IMAGE CHANGE
  */
  onFileChange(
    event: any
  ) {
    if (
      event.target.files &&
      event.target.files.length > 0
    ) {
      const file =
        event.target.files[0];

      this.selectedFile =
        file;

      const reader =
        new FileReader();

      reader.onload = () => {
        this.imagePreview =
          reader.result;
      };

      reader.readAsDataURL(
        file
      );
    }
  }

 /*
SUBMIT
*/

onSubmit() {

  if (
    this.subSubCategoryForm.valid
  ) {

    const formData =
      new FormData();

    formData.append(

      'name',

      this.subSubCategoryForm.value.name

    );

    formData.append(

      'category',

      this.subSubCategoryForm.value.category

    );

    formData.append(

      'subCategory',

      this.subSubCategoryForm.value.subCategory

    );

    formData.append(

      'isActive',

      this.subSubCategoryForm.value.isActive

    );

    if (this.selectedFile) {

      formData.append(

        'image',

        this.selectedFile

      );

    }

    this.subSubCategoryService
      .createSubSubCategory(
        formData
      )
    .subscribe({

  // SUCCESS

  next: (response) => {

    console.log(response);

    this.alert.success(
      'SubSubCategory Created Successfully'
    );

    this.router.navigate([
      '/admin/subsubcategory'
    ]);

  },

  // ERROR

  error: (err: any) => {

    console.log(err);

    this.alert.error(
      err?.error?.message ||
      'Failed To Create SubSubCategory'
    );

  }

});

  }

}

  goBack() {
    this.router.navigate([
      '/admin/subsubcategory'
    ]);
  }

}
