import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdsService } from 'src/app/Services/ads.service';
import { AlertService } from 'src/app/Services/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ads-update',
  templateUrl: './ads-update.component.html',
  styleUrls: ['./ads-update.component.css']
})
export class AdsUpdateComponent implements OnInit {

adsId!: string;
section!: string;

  updateForm!: FormGroup;

  imagePreview: any;

  selectedImage!: File;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adsService: AdsService,
    
  private alert: AlertService
  ) {}

 ngOnInit(): void {

  this.updateForm = this.fb.group({

    title: [''],

    description: ['']

  });

  this.adsId =
    this.route.snapshot.paramMap.get('id')!;

  this.section =
    this.route.snapshot.paramMap.get('section')!;

  this.getAdsById();

}

getAdsById() {

  this.adsService
    .getAdsById(this.adsId)
    .subscribe((res: any) => {

      const data =
        res.data[this.section];

      this.updateForm.patchValue({

        title: data.title,

        description: data.description

      });

      this.imagePreview =
        data.image;

    });

}

  onImageSelect(
    event: any
  ) {

    const file =
      event.target.files[0];

    if (file) {

      this.selectedImage =
        file;

      const reader =
        new FileReader();

      reader.onload =
        () => {

          this.imagePreview =
            reader.result;

        };

      reader.readAsDataURL(
        file
      );

    }

  }

 updateAds() {

  const formData =
    new FormData();

  formData.append(
    'section',
    this.section
  );

  formData.append(
    'title',
    this.updateForm.value.title
  );

  formData.append(
    'description',
    this.updateForm.value.description
  );

  if (this.selectedImage) {

    formData.append(
      'image',
      this.selectedImage
    );

  }

  this.adsService
  .updateSection(
    this.adsId,
    formData
  )
  .subscribe({

    next: (res: any) => {

     this.alert.success('Updated Successfully');


      this.router.navigate([
        '/admin/Ads'
      ]);

    },

    error: (err: any) => {

      console.log(err);

      Swal.fire({

        icon: 'error',

        title: 'Error',

        text:
          err?.error?.message ||
          'Update Failed'

      });

    }

  });

}
 goBack() {
    this.router.navigate([
      '/admin/Ads'
    ]);
  }

}