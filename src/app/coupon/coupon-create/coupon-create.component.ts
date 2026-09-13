import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CouponService } from 'src/app/Services/coupon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coupon-create',
  templateUrl: './coupon-create.component.html',
  styleUrls: ['./coupon-create.component.css']
})
export class CouponCreateComponent {

 couponForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private couponService: CouponService,
    private router: Router
  ) {

    this.couponForm =
      this.fb.group({

        code: [
          '',
          Validators.required
        ],

        discountType: [
          '',
          Validators.required
        ],

        value: [
          '',
          Validators.required
        ],

        minOrderAmount: [
          0
        ],

        expiryDate: [
          '',
          Validators.required
        ],

        isActive: [
          true
        ]

      });

  }

  onSubmit(): void {

  if (
    this.couponForm.valid
  ) {

    this.couponService
      .createCoupon(
        this.couponForm.value
      )
      .subscribe({

        next: (
          response
        ) => {

          Swal.fire({

            icon: 'success',

            title: 'Success',

            text: 'Coupon Created Successfully',

            confirmButtonColor: '#680404'

          }).then(() => {

            this.router.navigate([
              '/admin/coupon-list'
            ]);

          });

        },

        error: (
          error
        ) => {

          console.error(
            error
          );

          Swal.fire({

            icon: 'error',

            title: 'Failed',

            text:
              error?.error?.message ||
              'Coupon Creation Failed',

            confirmButtonColor: '#d33'

          });

        }

      });

  }

  else {

    Swal.fire({

      icon: 'warning',

      title: 'Validation Error',

      text:
        'Please fill all required fields'

    });

  }

}

  goBack(): void {

    this.router.navigate([
      '/admin/coupon-list'
    ]);

  }

}
