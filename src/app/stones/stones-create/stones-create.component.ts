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

    if (this.stoneRateForm.invalid) {

      this.stoneRateForm.markAllAsTouched();

      return;

    }

    this.stoneRateService
      .createStoneRate(
        this.stoneRateForm.value
      )
      .subscribe({

        next: (response) => {

          Swal.fire({

            icon: 'success',

            title: 'Success',

            text:
              'Stone Rate Created Successfully',

            timer: 2000,

            showConfirmButton:
              false

          });

          this.router.navigate([
            '/admin/stones-list'
          ]);

        },

        error: (error) => {

          console.error(error);

          Swal.fire({

            icon: 'error',

            title: 'Oops...',

            text:
              error?.error?.message ||
              'Create Failed'

          });

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
