import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { StonesRateService } from 'src/app/Services/stones-rate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stones-update',
  templateUrl: './stones-update.component.html',
  styleUrls: ['./stones-update.component.css']
})
export class StonesUpdateComponent implements OnInit {

  stoneRateForm!: FormGroup;

  stoneId: any;

  constructor(
    private fb: FormBuilder,
    private stoneRateService: StonesRateService,
    private router: Router,
    private activeRoute: ActivatedRoute,
      private alert: AlertService
  ) {

    this.stoneRateForm = this.fb.group({

      id: [''],

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

  ngOnInit(): void {

    this.stoneId =
      this.activeRoute.snapshot
        .paramMap.get('id');

    console.log(
      this.stoneId,
      'stone id'
    );

    this.getStoneRateById();

  }

  // =========================
  // GET BY ID
  // =========================

  getStoneRateById(): void {

    this.stoneRateService
      .getStoneRateById(
        this.stoneId
      )
      .subscribe({

        next: (response: any) => {

          const stoneRate =
            response.data;

          this.stoneRateForm.patchValue({

            stoneType:
              stoneRate.stoneType,

            stoneCategory:
              stoneRate.stoneCategory,

            quality:
              stoneRate.quality,

            unit:
              stoneRate.unit,

            ratePerUnit:
              stoneRate.ratePerUnit

          });

        },

        error: (error) => {

          console.error(
            error
          );

        }

      });

  }

  // =========================
  // SUBMIT
  // =========================

  onSubmit(): void {

    console.log(
      this.stoneRateForm.value,
      'update values'
    );

    if (
      this.stoneRateForm.invalid
    ) {

      this.stoneRateForm
        .markAllAsTouched();

      return;

    }

    this.stoneRateService
      .updateStoneRate(

        this.stoneId,

        this.stoneRateForm.value

      )
      .subscribe({

        next: (response) => {

       this.alert.success('Updated Successfully');


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
              'Update Failed'

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
