import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdsService } from 'src/app/Services/ads.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-ads',
  templateUrl: './create-ads.component.html',
  styleUrls: ['./create-ads.component.css']
})
export class CreateAdsComponent implements OnInit {

  adsForm!: FormGroup;

  isSaving = false;


  // ==============================
  // FILES
  // ==============================

  section1File: File | null = null;

  section2File: File | null = null;

  section3File: File | null = null;


  // ==============================
  // IMAGE PREVIEW
  // ==============================

  imagePreview = {
    section1: '',
    section2: '',
    section3: ''
  };


  // ==============================
  // IMAGE ERRORS
  // ==============================

  imageErrors = {
    section1: '',
    section2: '',
    section3: ''
  };


  constructor(
    private fb: FormBuilder,
    private adsService: AdsService,
    private router: Router
  ) { }


  // ==============================
  // INIT
  // ==============================

  ngOnInit(): void {

    this.adsForm = this.fb.group({

      // ==============================
      // SECTION 1
      // ==============================

      section1Title: [
        '',
        Validators.required
      ],

      section1Description: [
        '',
        Validators.required
      ],


      // ==============================
      // SECTION 2
      // ==============================

      section2Title: [
        '',
        Validators.required
      ],

      section2Description: [
        '',
        Validators.required
      ],


      // ==============================
      // SECTION 3
      // ==============================

      section3Title: [
        '',
        Validators.required
      ],

      section3Description: [
        '',
        Validators.required
      ]

    });

  }


  // ==============================
  // IMAGE SELECT
  // ==============================

  onImageSelected(
    event: Event,
    section: 'section1' | 'section2' | 'section3'
  ): void {

    const input =
      event.target as HTMLInputElement;


    if (
      !input.files ||
      input.files.length === 0
    ) {

      return;

    }


    const file =
      input.files[0];


    // ==============================
    // CLEAR PREVIOUS ERROR
    // ==============================

    this.imageErrors[section] = '';


    // ==============================
    // FILE TYPE
    // ==============================

    if (!file.type.startsWith('image/')) {

      this.imageErrors[section] =
        'Please select a valid image file.';

      input.value = '';

      return;

    }


    // ==============================
    // FILE SIZE
    // MAXIMUM 5MB
    // ==============================

    if (
      file.size >
      5 * 1024 * 1024
    ) {

      this.imageErrors[section] =
        'Image size should not exceed 5MB.';

      input.value = '';

      return;

    }


    // ==============================
    // STORE FILE
    // ==============================

    if (section === 'section1') {

      this.section1File = file;

    }


    if (section === 'section2') {

      this.section2File = file;

    }


    if (section === 'section3') {

      this.section3File = file;

    }


    // ==============================
    // IMAGE PREVIEW
    // ==============================

    const reader =
      new FileReader();


    reader.onload = () => {

      this.imagePreview[section] =
        reader.result as string;

    };


    reader.readAsDataURL(file);

  }


  // ==============================
  // SUBMIT
  // ==============================

  submitAds(): void {

    // ==============================
    // MARK ALL FIELDS TOUCHED
    // ==============================

    this.adsForm.markAllAsTouched();


    // ==============================
    // FORM VALIDATION
    // ==============================

    if (this.adsForm.invalid) {

      // Spinner OFF
      this.isSaving = false;

      // Do not call API
      return;

    }


    // ==============================
    // IMAGE VALIDATION
    // ==============================

    if (!this.section1File) {

      this.imageErrors.section1 =
        'Section 1 image is required.';

      this.isSaving = false;

      return;

    }


    if (!this.section2File) {

      this.imageErrors.section2 =
        'Section 2 image is required.';

      this.isSaving = false;

      return;

    }


    if (!this.section3File) {

      this.imageErrors.section3 =
        'Section 3 image is required.';

      this.isSaving = false;

      return;

    }


    // ==============================
    // START LOADING
    // ==============================

    this.isSaving = true;


    // ==============================
    // FORM DATA
    // ==============================

    const formData =
      new FormData();


    // ==============================
    // SECTION 1
    // ==============================

    formData.append(
      'section1Title',
      this.adsForm.value.section1Title
    );


    formData.append(
      'section1Description',
      this.adsForm.value.section1Description
    );


    // ==============================
    // SECTION 2
    // ==============================

    formData.append(
      'section2Title',
      this.adsForm.value.section2Title
    );


    formData.append(
      'section2Description',
      this.adsForm.value.section2Description
    );


    // ==============================
    // SECTION 3
    // ==============================

    formData.append(
      'section3Title',
      this.adsForm.value.section3Title
    );


    formData.append(
      'section3Description',
      this.adsForm.value.section3Description
    );


    // ==============================
    // IMAGES
    // ==============================

    formData.append(
      'section1Images',
      this.section1File
    );


    formData.append(
      'section2Images',
      this.section2File
    );


    formData.append(
      'section3Images',
      this.section3File
    );


    // ==============================
    // API
    // ==============================

    this.adsService
      .createAds(formData)
      .subscribe({

        // ==============================
        // SUCCESS
        // ==============================

        next: (response: any) => {

          console.log(
            'Create Ads Response:',
            response
          );


          // Stop spinner
          this.isSaving = false;


          if (response?.success) {

            Swal.fire({

              icon: 'success',

              title: 'Success!',

              text:
                response.message ||
                'Ads created successfully.',

              confirmButtonText: 'OK'

            }).then(() => {

              this.resetForm();
               this.router.navigate([
      '/admin/Ads'
    ]);

            });

          }

          else {

            Swal.fire({

              icon: 'error',

              title: 'Error!',

              text:
                response?.message ||
                'Something went wrong.'

            });

          }

        },


        // ==============================
        // ERROR
        // ==============================

        error: (error: any) => {

          console.error(
            'Create Ads Error:',
            error
          );


          // Stop spinner
          this.isSaving = false;


          const backendMessage =
            error?.error?.message ||
            error?.error?.error ||
            error?.message ||
            'Failed to create ads.';


          Swal.fire({

            icon: 'error',

            title: 'Unable to Create Ads',

            text: backendMessage

          });

        }

      });

  }


  // ==============================
  // RESET FORM
  // ==============================

  resetForm(): void {

    this.adsForm.reset();


    this.section1File = null;

    this.section2File = null;

    this.section3File = null;


    this.imagePreview = {

      section1: '',

      section2: '',

      section3: ''

    };


    this.imageErrors = {

      section1: '',

      section2: '',

      section3: ''

    };

  }


  // ==============================
  // BACK
  // ==============================

  goBack(): void {

    this.router.navigate([
      '/admin/Ads'
    ]);

  }

}