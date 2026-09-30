import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { CouponService } from 'src/app/Services/coupon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coupon-create',
  templateUrl: './coupon-create.component.html',
  styleUrls: ['./coupon-create.component.css']
})
export class CouponCreateComponent {
 couponForm!: FormGroup;

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private couponService: CouponService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.initializeForm();

  }


  // ==========================================
  // INITIALIZE FORM
  // ==========================================

  initializeForm(): void {

    this.couponForm = this.fb.group({

      // Coupon Code
      code: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[A-Za-z0-9]+$/)
        ]
      ],


      // Discount Type
      discountType: [
        '',
        Validators.required
      ],


      // Discount Value
      value: [
        '',
        [
          Validators.required,
          Validators.min(0.01)
        ]
      ],


      // Minimum Order Amount
      minOrderAmount: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ],


      // Expiry Date
      expiryDate: [
        '',
        Validators.required
      ],


      // Active / Inactive
      isActive: [
        true,
        Validators.required
      ]

    });

  }


  // ==========================================
  // SUBMIT
  // ==========================================

  onSubmit(): void {

    if (this.couponForm.invalid) {

      this.couponForm.markAllAsTouched();

      this.alertService.error(
        'Please fill all required fields correctly'
      );

      return;

    }


    if (this.isLoading) {

      return;

    }


    const value =
      this.couponForm.value;


    // ========================================
    // PERCENTAGE VALIDATION
    // ========================================

    if (
      value.discountType === 'PERCENTAGE' &&
      Number(value.value) > 100
    ) {

      this.alertService.error(
        'Percentage discount cannot be greater than 100'
      );

      return;

    }


    // ========================================
    // EXPIRY DATE VALIDATION
    // ========================================

    const expiryDate =
      new Date(value.expiryDate);


    const today =
      new Date();

    today.setHours(0, 0, 0, 0);


    if (expiryDate < today) {

      this.alertService.error(
        'Expiry date cannot be in the past'
      );

      return;

    }


    // ========================================
    // PREPARE DATA
    // ========================================

    const couponData = {

      code:
        value.code
          .trim()
          .toUpperCase(),

      discountType:
        value.discountType,

      value:
        Number(value.value),

      minOrderAmount:
        Number(value.minOrderAmount),

      expiryDate:
        value.expiryDate,

      isActive:
        value.isActive

    };


    console.log(
      'Coupon Data:',
      couponData
    );


    this.isLoading = true;


    // ========================================
    // CREATE API
    // ========================================

    this.couponService
      .createCoupon(couponData)
      .subscribe({

        next: (response: any) => {

          console.log(
            'Create Coupon Response:',
            response
          );


          this.isLoading = false;


          this.alertService.success(

            response?.message ||
            'Coupon created successfully'

          );


          this.goBack();

        },


        error: (error: any) => {

          console.log(
            'Create Coupon Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||
            'Failed to create coupon'

          );
          this.router.navigate([

              '/admin/Coupon-lists'

            ]);

        }

      });

  }


  // ==========================================
  // BACK
  // ==========================================

  goBack(): void {

    this.router.navigate([
      '/admin/Coupon-lists'
    ]);

  }
}