import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { BannerService } from 'src/app/Services/banner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-banner',
  templateUrl: './create-banner.component.html',
  styleUrls: ['./create-banner.component.css']
})
export class CreateBannerComponent implements OnInit {

  bannerForm!: FormGroup;

  selectedFile: File | null = null;

  imagePreview: string | ArrayBuffer | null = null;

  errorMessage: string = '';

  isSaving: boolean = false;


  constructor(
    private fb: FormBuilder,

    private bannerService: BannerService,

    private router: Router,

    private alert: AlertService
  ) { }


  ngOnInit(): void {

    this.bannerForm =
      this.fb.group({

        title: [
          '',
          Validators.required
        ],

        description: [
          '',
          Validators.required
        ]

      });

  }


  /*
  =================================
  FILE CHANGE
  =================================
  */

  onFileChange(
    event: any
  ): void {

    const file =
      event.target.files[0];

    if (file) {

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
  =================================
  CREATE BANNER
  =================================
  */

  onSubmit(): void {

    // Show validation messages
    this.bannerForm.markAllAsTouched();


    // =================================
    // VALIDATION
    // =================================

    if (this.bannerForm.invalid) {

      // IMPORTANT:
      // Spinner should NOT show
      this.isSaving = false;

      // API should NOT be called
      return;

    }


    // =================================
    // START LOADING
    // =================================

    this.isSaving = true;


    // =================================
    // PREPARE FORM DATA
    // =================================

    const formData = new FormData();


    formData.append(
      'title',
      this.bannerForm.value.title
    );


    formData.append(
      'description',
      this.bannerForm.value.description
    );


    // Image is optional
    if (this.selectedFile) {

      formData.append(
        'image',
        this.selectedFile
      );

    }


    // =================================
    // CREATE BANNER API
    // =================================

    this.bannerService
      .createBanner(formData)
      .subscribe({

        // =================================
        // SUCCESS
        // =================================

        next: (response) => {

          console.log(
            'Create Banner Response:',
            response
          );


          // Stop spinner
          this.isSaving = false;


          this.alert.success(
            'Banner Created Successfully'
          );


          this.router.navigate([
            '/admin/banners'
          ]);

        },


        // =================================
        // ERROR
        // =================================

        error: (error) => {

          console.error(
            'Create Banner Error:',
            error
          );


          // Stop spinner
          this.isSaving = false;


          // Get actual backend message
          const backendMessage =
            error?.error?.message ||
            error?.error?.error ||
            error?.message ||
            'Something went wrong while creating banner';


          Swal.fire({

            icon: 'error',

            title: 'Unable to Create Banner',

            text: backendMessage

          });

        }

      });

  }


  /*
  =================================
  BACK
  =================================
  */

  goBack(): void {

    this.router.navigate([
      '/admin/banners'
    ]);

  }

}