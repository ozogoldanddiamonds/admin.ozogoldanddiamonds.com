import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { MetalRateService } from 'src/app/Services/metal-rate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-metal-update',
  templateUrl: './metal-update.component.html',
  styleUrls: ['./metal-update.component.css']
})
export class MetalUpdateComponent implements OnInit {

  metalRateForm!: FormGroup;

  purityOptions: string[] = [];
  metalId: any;
  constructor(
    private fb: FormBuilder,
    private metalRateService: MetalRateService,
    private router: Router, private activeRoute: ActivatedRoute,  private alert: AlertService
  ) {

    this.metalRateForm = this.fb.group({
      id: [''],
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
  ngOnInit(): void {
    this.metalId =
      this.activeRoute.snapshot
        .paramMap.get(
          'id'
        )!;
    console.log(this.metalId, 'metal id')
    this.getMetalRateById();
  }

  // =========================
  // METAL TYPE CHANGE
  // =========================

  onMetalTypeChange(
    resetPurity: boolean = true
  ): void {

    const metalType =
      this.metalRateForm.get('metalType')?.value;

    this.purityOptions = [];

    if (resetPurity) {

      this.metalRateForm
        .get('purity')
        ?.setValue('');

    }

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
  getMetalRateById(): void {

    this.metalRateService
      .getMetalRateById(this.metalId)
      .subscribe({

        next: (response: any) => {

          const metalRate =
            response.data;

          this.metalRateForm.patchValue({

            metalType:
              metalRate.metalType

          });

          // Load purity options only

          this.onMetalTypeChange(false);

          // Patch all fields

          this.metalRateForm.patchValue({

            purity:
              metalRate.purity,

            unit:
              metalRate.unit,

            ratePerGram:
              metalRate.ratePerGram,

            effectiveDate:
              metalRate.effectiveDate?.split('T')[0]

          });

        },

        error: (error) => {

          console.error(error);

        }

      });

  }
  // =========================
  // SUBMIT
  // =========================

  onSubmit(): void {
    console.log(this.metalRateForm.value, 'update values');
    if (this.metalRateForm.invalid) {

      this.metalRateForm.markAllAsTouched();

      return;

    }

    this.metalRateService
      .updateMetalRate(this.metalId, this.metalRateForm.value,)
      .subscribe({

        next: (response) => {
         this.alert.success('Updated Successfully');

          this.router.navigate([
            '/admin/metal-list'
          ]);

        },

        error: (error) => {

          console.error(error);

          Swal.fire({

            icon: 'error',

            title: 'Oops...',

            text:
              'Updated Failed'

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
