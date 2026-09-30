  import { Component, OnInit } from '@angular/core';
  import { FormGroup, FormBuilder, Validators } from '@angular/forms';
  import { MatSnackBar } from '@angular/material/snack-bar';
  import { Router } from '@angular/router';
  import { CategoryService } from 'src/app/Services/category.service';
  import Swal from 'sweetalert2';
  import { AlertService } from 'src/app/Services/alert.service';

  @Component({
    selector: 'app-create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.css'],
  })
  export class CreateCategoryComponent implements OnInit {

  categoryForm!: FormGroup;

  isSaving: boolean = false;

  selectedFile: File | null = null;

  imagePreview: string | ArrayBuffer | null = null;


  constructor(

    private fb: FormBuilder,

    public _categoryService: CategoryService,

    public router: Router,

    public snackBar: MatSnackBar,

    private alert: AlertService

  ) { }


  ngOnInit(): void {

    this.categoryForm = this.fb.group({

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      image: [
        '',
        Validators.required
      ],

      isActive: [true],

    });

  }


  onFileChange(event: any) {

    if (
      event.target.files &&
      event.target.files.length > 0
    ) {

      const file = event.target.files[0];

      this.selectedFile = file;


      const reader = new FileReader();

      reader.onload = () => {

        this.imagePreview = reader.result;

      };

      reader.readAsDataURL(file);


      this.categoryForm.patchValue({

        image: file,

      });

      // Remove image validation error after selecting file
      this.categoryForm
        .get('image')
        ?.markAsTouched();

      this.categoryForm
        .get('image')
        ?.updateValueAndValidity();

    }

  }


  onSubmit() {

    // Show all validation messages
    this.categoryForm.markAllAsTouched();


    // Validation failed
    // Loading must remain OFF
    if (this.categoryForm.invalid) {

      this.isSaving = false;

      return;

    }


    // All validations passed
    // Start loading before API call
    this.isSaving = true;


    const formData = new FormData();


    formData.append(
      'name',
      this.categoryForm.value.name
    );


    formData.append(
      'isActive',
      this.categoryForm.value.isActive
    );


    if (this.selectedFile) {

      formData.append(
        'image',
        this.selectedFile
      );

    }


    this._categoryService
      .createCategory(formData)
      .subscribe({

        next: (response) => {

          console.log(response);


          // Stop loading
          this.isSaving = false;


          this.alert.success(
            'Category Created Successfully'
          );


          this.router.navigate([

            '/admin/category'

          ]);


          this.categoryForm.reset();

        },


        error: (err: any) => {

          console.log(
            'Create Category Error:',
            err
          );


          // Stop loading when API error occurs
          this.isSaving = false;


          // Get actual backend error message
          const backendMessage =
            err?.error?.message ||
            err?.error?.error ||
            err?.message ||
            'Something went wrong while creating category';


          Swal.fire({

            icon: 'error',

            title: 'Unable to Create Category',

            text: backendMessage

          });

        }

      });

  }


  cancelUpdate() {

    this.router.navigate([
      '/dashboard/category'
    ]);

  }


  goBack() {

    this.router.navigate([
      '/admin/category'
    ]);

  }

}