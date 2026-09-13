import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { CouponService } from 'src/app/Services/coupon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coupon-update',
  templateUrl: './coupon-update.component.html',
  styleUrls: ['./coupon-update.component.css']
})
export class CouponUpdateComponent implements OnInit {

  couponForm!: FormGroup;

  couponId!: string;

  constructor(

    private fb: FormBuilder,

    private route: ActivatedRoute,

    private router: Router,

    private couponService: CouponService,
      private alert: AlertService

  ) { }

  ngOnInit(): void {

    this.couponId =
      this.route.snapshot.paramMap.get('id') || '';

    this.initializeForm();

    this.getCouponById();

  }

  // =====================
  // FORM
  // =====================

  initializeForm(): void {

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

  // =====================
  // GET BY ID
  // =====================

  getCouponById(): void {

    this.couponService
      .getCouponById(
        this.couponId
      )
      .subscribe({

        next: (
          response: any
        ) => {

          const coupon =
            response.data;

          this.couponForm.patchValue({

            code:
              coupon.code,

            discountType:
              coupon.discountType,

            value:
              coupon.value,

            minOrderAmount:
              coupon.minOrderAmount,

            expiryDate:
              coupon.expiryDate
                ?.split('T')[0],

            isActive:
              coupon.isActive

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

  // =====================
  // UPDATE
  // =====================

 onSubmit(): void {

  if (
    this.couponForm.invalid
  ) {

    Swal.fire({

      icon: 'warning',

      title: 'Validation Error',

      text: 'Please fill all required fields'

    });

    return;

  }

  this.couponService
    .updateCoupon(

      this.couponId,

      this.couponForm.value

    )
   .subscribe({

  next: (response) => {

    this.alert.success('Coupon Updated Successfully');

    setTimeout(() => {

      this.router.navigate([
        '/admin/coupon-list'
      ]);

    }, 2000);

  },

  error: (error: any) => {

    console.error(error);

    this.alert.error(
      error?.error?.message ||
      'Something went wrong'
    );

  }

});

}

  // =====================
  // BACK
  // =====================

  goBack(): void {

    this.router.navigate([
      '/admin/coupon-list'
    ]);

  }

}
