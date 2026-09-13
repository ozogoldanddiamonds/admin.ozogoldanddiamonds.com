import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { CategoryService } from 'src/app/Services/category.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { SubsubcategoryService } from 'src/app/Services/subsubcategory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-sub-category-update',
  templateUrl: './sub-sub-category-update.component.html',
  styleUrls: ['./sub-sub-category-update.component.css']
})
export class SubSubCategoryUpdateComponent implements OnInit {

  subSubCategoryForm!: FormGroup;

  categories: any[] = [];
  subCategories: any[] = [];

  selectedFile:
    File | null = null;

  imagePreview:
    string | ArrayBuffer | null = null;

  subSubCategoryId!: string;

  constructor(
    private fb:
      FormBuilder,

    private route:
      ActivatedRoute,

    private router:
      Router,

    private categoryService:
      CategoryService,

    private subCategoryService:
      SubcategoryService,

    private subSubCategoryService:
      SubsubcategoryService,
       private alert: AlertService
  ) {}

  ngOnInit(): void {

    this.subSubCategoryId =
      this.route.snapshot.paramMap.get('id')!;

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
    this.getSubSubCategoryById();
  }
 onCategoryChange(
  event: any
): void {

  const categoryId =
    event.target.value;

  // GET SUBCATEGORY

  this.subCategoryService
    .getSubCategoryByCategory(
      categoryId
    )
    .subscribe({

      next: (res: any) => {

        this.subCategories =
          res.data;

      },

      error: (err: any) => {

        console.log(err);

      }

    });

}

  getCategories() {
    this.categoryService
      .getAllCategories()
      .subscribe((res: any) => {
        this.categories =
          res.data;
      });
  }

  getSubCategories() {
    this.subCategoryService
      .getAllSubCategories()
      .subscribe((res: any) => {
        this.subCategories =
          res.data;
      });
  }

getSubSubCategoryById(): void {

  this.subSubCategoryService
    .getSubSubCategoryById(
      this.subSubCategoryId
    )
    .subscribe({

      next: (res: any) => {

        const data =
          res.data;

        // FIRST PATCH CATEGORY

        this.subSubCategoryForm
          .patchValue({

            name:
              data.name,

            category:
              data.category._id,

            isActive:
              data.isActive

          });

        // IMAGE

        this.imagePreview =
          data.image;

        // LOAD SUBCATEGORY

        this.subCategoryService
          .getSubCategoryByCategory(
            data.category._id
          )
          .subscribe({

            next: (
              subRes: any
            ) => {

              // SET DROPDOWN DATA

              this.subCategories =
                subRes.data;

              // PATCH SUBCATEGORY
              // AFTER DATA LOAD

              setTimeout(() => {

                this.subSubCategoryForm
                  .patchValue({

                    subCategory:
                      data.subCategory._id

                  });

              });

            }

          });

      },

      error: (err: any) => {

        console.log(err);

      }

    });

}
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

      if (
        this.selectedFile
      ) {
        formData.append(
          'image',
          this.selectedFile
        );
      }

     this.subSubCategoryService
  .updateSubSubCategory(

    this.subSubCategoryId,

    formData

  )
  .subscribe({

  next: () => {

  this.alert.success('Updated Successfully');

  this.router.navigate([
    '/admin/subsubcategory'
  ]);

},

   error: (error) => {

  console.error(error);

  this.alert.error(
    error?.error?.message || 'Update Failed'
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