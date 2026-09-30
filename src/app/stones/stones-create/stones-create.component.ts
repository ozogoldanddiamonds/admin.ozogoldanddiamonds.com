import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StonesRateService } from 'src/app/Services/stones-rate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stones-create',
  templateUrl: './stones-create.component.html',
  styleUrls: ['./stones-create.component.css']
})
export class StonesCreateComponent {
  stoneRateForm!: FormGroup;
  isSaving: boolean = false;
  constructor(
    private fb: FormBuilder,
    private stoneRateService: StonesRateService,
    private router: Router
  ) {

    this.stoneRateForm = this.fb.group({

      stoneType: [
        '',
        Validators.required
      ],

      stoneCategory: [
        '',
        Validators.required
      ],

      quality: [
        '',
        Validators.required
      ],

      unit: [
        '',
        Validators.required
      ],

      ratePerUnit: [
        '',
        [
          Validators.required,
          Validators.min(1)
        ]
      ]

    });

  }

  // =========================
  // SUBMIT
  // =========================

 onSubmit(): void {

  this.stoneRateForm.markAllAsTouched();

  if (this.stoneRateForm.invalid) {

    this.isSaving = false;

    return;
  }

  this.isSaving = true;

  console.log('Request Data:', this.stoneRateForm.value);

  this.stoneRateService
    .createStoneRate(this.stoneRateForm.value)
    .subscribe({

      next: (response) => {

        console.log('SUCCESS RESPONSE:', response);

        this.isSaving = false;

        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Stone Rate Created Successfully',
          timer: 2000,
          showConfirmButton: false
        });

        this.router.navigate([
          '/admin/stones-list'
        ]);

      },

      error: (error) => {

        console.error('ERROR RESPONSE:', error);

        this.isSaving = false;

        const backendMessage =
          error?.error?.message ||
          error?.error?.error ||
          error?.message ||
          'Something went wrong while creating stone rate';

        Swal.fire({
          icon: 'error',
          title: 'Unable to Create Stone Rate',
          text: backendMessage
        });

      },

      complete: () => {

        console.log('REQUEST COMPLETED');

      }

    });

}

  // =========================
  // BACK
  // =========================

  goBack(): void {

    this.router.navigate([
      '/admin/stones-list'
    ]);

  }
}
