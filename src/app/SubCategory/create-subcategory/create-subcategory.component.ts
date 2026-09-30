import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import { AlertService } from 'src/app/Services/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-subcategory',
  templateUrl: './create-subcategory.component.html',
  styleUrls: ['./create-subcategory.component.css']
})
export class CreateSubcategoryComponent implements OnInit {

  isSaving: boolean = false;

  subCategoryForm!: FormGroup;

  categories: any[] = [];

  selectedFile: File | null = null;

  imagePreview: any = null;


  constructor(

    private fb: FormBuilder,

    private subService: SubcategoryService,

    private categoryService: CategoryService,

    private router: Router,

    private alert: AlertService,

  ) { }


  ngOnInit(): void {

    this.subCategoryForm =
      this.fb.group({

        name: [
          '',
          Validators.required
        ],

        category: [
          '',
          Validators.required
        ],

        isActive: [true]

      });


    this.getCategories();

  }


  getCategories() {

    this.categoryService
      .getAllCategories()
      .subscribe((res: any) => {

        console.log(
          res,
          "this is category data"
        );

        this.categories = res.data;

      });

  }


  onFileChange(event: any) {

    const file =
      event.target.files[0];


    if (file) {

      this.selectedFile = file;


      const reader =
        new FileReader();


      reader.onload = () => {

        this.imagePreview =
          reader.result;

      };


      reader.readAsDataURL(file);

    }

  }


  onSubmit() {

    // Show all validation messages
    this.subCategoryForm.markAllAsTouched();


    // Validation failed
    // Loading must remain OFF
    if (this.subCategoryForm.invalid) {

      this.isSaving = false;

      return;

    }


    // All required fields are valid
    // Start loading only before API call
    this.isSaving = true;


    const formData =
      new FormData();


    formData.append(
      'name',
      this.subCategoryForm.value.name
    );


    formData.append(
      'category',
      this.subCategoryForm.value.category
    );


    formData.append(
      'isActive',
      this.subCategoryForm.value.isActive
    );


    if (this.selectedFile) {

      formData.append(
        'image',
        this.selectedFile
      );

    }


    this.subService
      .createSubCategory(
        formData
      )
      .subscribe({

        next: () => {

          // Stop loading
          this.isSaving = false;


          this.alert.success(
            'SubCategory Created Successfully'
          );


          this.router.navigate([
            '/admin/list_subcategory'
          ]);

        },


        error: (err: any) => {

          console.log(
            'Create SubCategory Error:',
            err
          );


          // Stop loading on error
          this.isSaving = false;


          // Actual backend message
          const backendMessage =
            err?.error?.message ||
            err?.error?.error ||
            err?.message ||
            'Something went wrong while creating SubCategory';


          this.alert.error(
            backendMessage
          );

        }

      });

  }


  goBack() {

    this.router.navigate([
      '/admin/list_subcategory'
    ]);

  }

}