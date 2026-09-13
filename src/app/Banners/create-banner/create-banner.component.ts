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

  selectedFile:
    File | null = null;

  imagePreview:
    string | ArrayBuffer | null = null;
 errorMessage: string = '';

  constructor(
    private fb:
      FormBuilder,

    private bannerService:
      BannerService,

    private router:
      Router,
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
  FILE CHANGE
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
  CREATE BANNER
  */
 onSubmit(): void {

  if (this.bannerForm.invalid) {
    return;
  }

  const formData = new FormData();

  formData.append(
    'title',
    this.bannerForm.value.title
  );

  formData.append(
    'description',
    this.bannerForm.value.description
  );

  if (this.selectedFile) {
    formData.append(
      'image',
      this.selectedFile
    );
  }

  this.bannerService
    .createBanner(formData)
    .subscribe({

      next: () => {

       this.alert.success('Banner Created Successfully');

        this.router.navigate([
          '/admin/banners'
        ]);
      },

      error: (error) => {

  let message = 'Something went wrong';

  if (error.error?.message) {
    message = error.error.message;
  }
  else if (typeof error.error === 'string') {
    message = error.error;
  }

  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message
  });

}

    });
}

  /*
  BACK
  */
  goBack(): void {
    this.router.navigate([
      '/admin/banners'
    ]);
  }
}
