import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoldRateService } from 'src/app/Services/gold-rate.service';

@Component({
  selector: 'app-gold-update',
  templateUrl: './gold-update.component.html',
  styleUrls: ['./gold-update.component.css']
})
export class GoldUpdateComponent 
implements OnInit {

  goldRateForm!:
    FormGroup;

  goldRateId!:
    string;

  constructor(
    private fb:
      FormBuilder,

    private route:
      ActivatedRoute,

    private router:
      Router,

    private goldRateService:
      GoldRateService
  ) {

    this.goldRateForm =
      this.fb.group({

        ratePerGram: [
          '',
          Validators.required
        ],

        updatedBy: [
          '',
          Validators.required
        ]

      });
  }

  ngOnInit(): void {

    this.goldRateId =
      this.route.snapshot
        .paramMap.get(
          'id'
        )!;

    this.getGoldRateById();
  }

  /*
  GET BY ID
  */
  getGoldRateById(): void {

    this.goldRateService
      .getGoldRateById(
        this.goldRateId
      )
      .subscribe({

        next: (
          response: any
        ) => {

          this.goldRateForm
            .patchValue({

            ratePerGram:
              response.data.ratePerGram,

            updatedBy:
              response.data.updatedBy?._id

          });
        },

        error: (
          error
        ) => {
          console.error(
            error
          );
        }

      });
  }

  /*
  UPDATE
  */
  onSubmit(): void {

    if (
      this.goldRateForm.valid
    ) {

      this.goldRateService
        .updateGoldRate(
          this.goldRateId,
          this.goldRateForm.value
        )
        .subscribe({

          next: (
            response
          ) => {

            alert(
              "Gold Rate Updated Successfully"
            );

            this.router.navigate([
              '/admin/Gold-list'
            ]);
          },

          error: (
            error
          ) => {
            console.error(
              error
            );
          }

        });
    }
  }

  /*
  BACK
  */
  goBack(): void {
    this.router.navigate([
      '/admin/gold-rate'
    ]);
  }
}
