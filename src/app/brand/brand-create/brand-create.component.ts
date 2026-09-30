import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/Services/brand.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand-create',
  templateUrl: './brand-create.component.html',
  styleUrls: ['./brand-create.component.css']
})
export class BrandCreateComponent implements OnInit {

  brandForm!: FormGroup;

  selectedLogo: File | null = null;

  logoPreview: string | null = null;

  logoError: string = '';

  isSaving: boolean = false;


  constructor(
    private fb: FormBuilder,
    private brandService: BrandService,
    private router: Router
  ) {}


  ngOnInit(): void {

    this.brandForm = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      code: [
        '',
        Validators.required
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
  // LOGO SELECT
  // ==========================================

  onLogoSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    this.logoError = '';

    if (!input.files || input.files.length === 0) {

      this.selectedLogo = null;
      this.logoPreview = null;

      return;
    }

    const file = input.files[0];


    // Allowed file types
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp'
    ];


    // File type validation
    if (!allowedTypes.includes(file.type)) {

      this.logoError =
        'Only JPG, JPEG, PNG and WEBP images are allowed.';

      this.selectedLogo = null;
      this.logoPreview = null;

      input.value = '';

      return;
    }


    // 5MB validation
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {

      this.logoError =
        'Logo size must be less than 5MB.';

      this.selectedLogo = null;
      this.logoPreview = null;

      input.value = '';

      return;
    }


    // Store file
    this.selectedLogo = file;


    // Preview
    const reader = new FileReader();

    reader.onload = () => {

      this.logoPreview = reader.result as string;

    };

    reader.readAsDataURL(file);

  }


  // ==========================================
  // SUBMIT
  // ==========================================

  onSubmit(): void {

    // Form validation
    if (this.brandForm.invalid) {

      this.brandForm.markAllAsTouched();

      return;
    }


    // Logo validation
    if (this.logoError) {
      return;
    }


    this.isSaving = true;


    // FormData for Cloudinary upload
    const formData = new FormData();


    formData.append(
      'name',
      this.brandForm.value.name.trim()
    );


    formData.append(
      'code',
      this.brandForm.value.code.trim().toUpperCase()
    );


    formData.append(
      'description',
      this.brandForm.value.description || ''
    );


    formData.append(
      'isActive',
      String(this.brandForm.value.isActive)
    );


    // Logo
    if (this.selectedLogo) {

      formData.append(
        'logo',
        this.selectedLogo
      );

    }


    // API call
    this.brandService.createBrand(formData).subscribe({

      next: (res) => {

        console.log('Create Brand Response:', res);

        this.isSaving = false;


        if (res && res.success) {

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Brand created successfully!',
            timer: 1500,
            showConfirmButton: false
          }).then(() => {

            this.router.navigate([
              '/admin/brand-list'
            ]);

          });

        } else {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: res?.message || 'Failed to create brand'
          });

        }

      },


      error: (err) => {

        console.error(
          'Create Brand Error:',
          err
        );

        this.isSaving = false;


        Swal.fire({
          icon: 'error',
          title: 'Error',
          text:
            err?.error?.message ||
            'Something went wrong while creating brand.'
        });

      }

    });

  }

}
