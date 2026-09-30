import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { MetalRateService } from 'src/app/Services/metal-rate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-metal-create',
  templateUrl: './metal-create.component.html',
  styleUrls: ['./metal-create.component.css']
})
export class MetalCreateComponent {
  isSaving: boolean = false;
  metalRateForm!: FormGroup;

  purityOptions: string[] = [];

  constructor(
    private fb: FormBuilder,
    private metalRateService: MetalRateService,
    private router: Router,
    private alert: AlertService
  ) {

    this.metalRateForm = this.fb.group({

      metalType: [
        '',
        Validators.required
      ],

      purity: [
        '',
        Validators.required
      ],

      unit: [
        '',
        Validators.required
      ],

      ratePerGram: [
        '',
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      effectiveDate: [
        new Date()
          .toISOString()
          .split('T')[0]
      ]

    });

  }

  // =========================
  // METAL TYPE CHANGE
  // =========================

  onMetalTypeChange(): void {

    const metalType =
      this.metalRateForm.get('metalType')?.value;

    this.purityOptions = [];

    this.metalRateForm
      .get('purity')
      ?.setValue('');

    if (metalType === 'gold') {

      this.purityOptions = [
        '24K',
        '22K',
        '18K',
        '14K'
      ];

    }

    else if (metalType === 'silver') {

      this.purityOptions = [
        '999',
        '925'
      ];

    }

    else if (metalType === 'platinum') {

      this.purityOptions = [
        '999',
        '950'
      ];

    }

  }

  // =========================
  // SUBMIT
  // =========================

// =========================
// SUBMIT
// =========================

onSubmit(): void {

  // Show validation errors
  this.metalRateForm.markAllAsTouched();


  // Validation error unte loading OFF
  if (this.metalRateForm.invalid) {

    this.isSaving = false;

    return;

  }


  // All fields valid ayyaka matrame loading ON
  this.isSaving = true;


  this.metalRateService
    .createMetalRate(
      this.metalRateForm.value
    )
    .subscribe({

      next: (response) => {

        // Success ayyaka loading OFF
        this.isSaving = false;

        this.alert.success(
          'Created Successfully'
        );

        this.router.navigate([
          '/admin/metal-rate'
        ]);

      },


      error: (error) => {

        console.error(
          'Create Metal Rate Error:',
          error
        );


        // Backend error vachina loading OFF
        this.isSaving = false;


        // Backend actual message
        const backendMessage =
          error?.error?.message ||
          error?.error?.error ||
          error?.message ||
          'Something went wrong while creating metal rate';


        Swal.fire({

          icon: 'error',

          title: 'Unable to Create Metal Rate',

          text: backendMessage

        });

      }

    });

}

  // =========================
  // BACK
  // =========================

  goBack(): void {

    this.router.navigate([
      '/admin/metal-list'
    ]);

  }
}
