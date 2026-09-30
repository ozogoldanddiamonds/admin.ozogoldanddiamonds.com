import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { AlertService } from 'src/app/Services/alert.service';
import { BrandService } from 'src/app/Services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {


  // ==========================================
  // FORM
  // ==========================================

  brandForm!: FormGroup;


  // ==========================================
  // BRAND ID
  // ==========================================

  brandId: string = '';


  // ==========================================
  // BRAND DATA
  // ==========================================

  brandData!: Brand;


  // ==========================================
  // LOGO
  // ==========================================

  selectedLogo: File | null = null;

  logoPreview: string | null = null;

  logoError: string = '';


  // ==========================================
  // LOADING
  // ==========================================

  isSaving: boolean = false;


  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private route: ActivatedRoute,
    private router: Router,
    private alert: AlertService
  ) { }


  // ==========================================
  // INIT
  // ==========================================

  ngOnInit(): void {

    this.createForm();

    this.brandId =
      this.route.snapshot.paramMap.get('id') || '';


    if (!this.brandId) {

      this.alert.error(
        'Brand ID not found'
      );

      this.router.navigate([
        '/admin/brand'
      ]);

      return;
    }


    this.getBrandById();

  }


  // ==========================================
  // CREATE FORM
  // ==========================================

  createForm(): void {

    this.brandForm = this.fb.group({

      name: [
        '',
        [
          Validators.required
        ]
      ],

      code: [
        '',
        [
          Validators.required
        ]
      ],

      description: [
        ''
      ],

      isActive: [
        true
      ]

    });

  }


  // ==========================================
  // GET BRAND BY ID
  // ==========================================

  getBrandById(): void {

    this.brandService
      .getBrandById(this.brandId)
      .subscribe({

        next: (res) => {

          console.log(
            'Brand Details:',
            res
          );


          if (res && res.success) {

            this.brandData = res.data;


            // ================================
            // PATCH FORM
            // ================================

            this.brandForm.patchValue({

              name:
                this.brandData.name || '',

              code:
                this.brandData.code || '',

              description:
                this.brandData.description || '',

              isActive:
                this.brandData.isActive ?? true

            });


            // ================================
            // EXISTING LOGO
            // ================================

            if (this.brandData.logo) {

              this.logoPreview =
                this.brandData.logo;

            }

          } else {

            this.alert.error(
              res?.message ||
              'Brand not found'
            );

            this.router.navigate([
              '/admin/brand'
            ]);

          }

        },

        error: (err) => {

          console.error(
            'Get brand error:',
            err
          );


          this.alert.error(
            err?.error?.message ||
            'Failed to load brand'
          );


          this.router.navigate([
            '/admin/brand-list'
          ]);

        }

      });

  }


  // ==========================================
  // LOGO SELECT
  // ==========================================

  onLogoSelected(event: Event): void {

    const input =
      event.target as HTMLInputElement;


    this.logoError = '';


    // ================================
    // NO FILE
    // ================================

    if (
      !input.files ||
      input.files.length === 0
    ) {

      this.selectedLogo = null;


      // Keep existing logo
      if (this.brandData?.logo) {

        this.logoPreview =
          this.brandData.logo;

      } else {

        this.logoPreview = null;

      }

      return;

    }


    const file =
      input.files[0];


    // ================================
    // ALLOWED FILE TYPES
    // ================================

    const allowedTypes = [

      'image/jpeg',

      'image/jpg',

      'image/png',

      'image/webp'

    ];


    if (!allowedTypes.includes(file.type)) {

      this.logoError =
        'Only JPG, JPEG, PNG and WEBP images are allowed.';


      this.selectedLogo = null;


      // Restore old logo
      if (this.brandData?.logo) {

        this.logoPreview =
          this.brandData.logo;

      } else {

        this.logoPreview = null;

      }


      input.value = '';

      return;

    }


    // ================================
    // FILE SIZE
    // ================================

    const maxSize =
      5 * 1024 * 1024;


    if (file.size > maxSize) {

      this.logoError =
        'Logo size must be less than 5MB.';


      this.selectedLogo = null;


      // Restore old logo
      if (this.brandData?.logo) {

        this.logoPreview =
          this.brandData.logo;

      } else {

        this.logoPreview = null;

      }


      input.value = '';

      return;

    }


    // ================================
    // STORE FILE
    // ================================

    this.selectedLogo = file;


    // ================================
    // PREVIEW
    // ================================

    const reader =
      new FileReader();


    reader.onload = () => {

      this.logoPreview =
        reader.result as string;

    };


    reader.readAsDataURL(file);

  }


  // ==========================================
  // UPDATE BRAND
  // ==========================================

  onSubmit(): void {


    // ================================
    // FORM VALIDATION
    // ================================

    if (this.brandForm.invalid) {

      this.brandForm.markAllAsTouched();


      this.alert.error(
        'Please fill all required fields'
      );


      return;

    }


    // ================================
    // LOGO VALIDATION
    // ================================

    if (this.logoError) {

      this.alert.error(
        this.logoError
      );


      return;

    }


    // ================================
    // ID VALIDATION
    // ================================

    if (!this.brandId) {

      this.alert.error(
        'Brand ID not found'
      );


      return;

    }


    // ================================
    // START LOADING
    // ================================

    this.isSaving = true;


    // ================================
    // FORM DATA
    // ================================

    const formData =
      new FormData();


    // ================================
    // NAME
    // ================================

    formData.append(

      'name',

      this.brandForm.value.name
        .trim()

    );


    // ================================
    // CODE
    // ================================

    formData.append(

      'code',

      this.brandForm.value.code
        .trim()
        .toUpperCase()

    );


    // ================================
    // DESCRIPTION
    // ================================

    formData.append(

      'description',

      this.brandForm.value.description || ''

    );


    // ================================
    // STATUS
    // ================================

    formData.append(

      'isActive',

      String(
        this.brandForm.value.isActive
      )

    );


    // ================================
    // NEW LOGO
    // ================================

    if (this.selectedLogo) {

      formData.append(

        'logo',

        this.selectedLogo

      );

    }


    // ================================
    // API CALL
    // ================================

    this.brandService
      .updateBrand(
        this.brandId,
        formData
      )
      .subscribe({

        next: (res) => {

          console.log(
            'Update Brand Response:',
            res
          );


          this.isSaving = false;


          // ================================
          // SUCCESS
          // ================================

          if (
            res &&
            res.success
          ) {

            this.alert.success(
              'Brand updated successfully!'
            );


            this.router.navigate([
              '/admin/brand-list'
            ]);


          } else {

            // ================================
            // API ERROR
            // ================================

            this.alert.error(

              res?.message ||
              'Failed to update brand'

            );

          }

        },


        // ================================
        // ERROR
        // ================================

        error: (err) => {

          console.error(
            'Update Brand Error:',
            err
          );


          this.isSaving = false;


          this.alert.error(

            err?.error?.message ||

            'Something went wrong while updating brand'

          );

        }

      });

  }


  // ==========================================
  // CANCEL
  // ==========================================

  cancel(): void {

    this.router.navigate([
      '/admin/brand'
    ]);

  }
}