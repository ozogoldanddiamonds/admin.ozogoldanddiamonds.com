import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { MakersService } from 'src/app/Services/makers.service';

@Component({
  selector: 'app-upadate-makers',
  templateUrl: './upadate-makers.component.html',
  styleUrls: ['./upadate-makers.component.css']
})
export class UpadateMakersComponent implements OnInit {


  // ==========================================
  // Form
  // ==========================================

  makerForm!: FormGroup;


  // ==========================================
  // Maker ID
  // ==========================================

  makerId: string = '';


  // ==========================================
  // Mode
  // ==========================================

  isViewMode = false;

  isEditMode = false;


  // ==========================================
  // Loading
  // ==========================================

  isLoading = false;

  isSubmitted = false;


  constructor(

    private fb:
      FormBuilder,

    private route:
      ActivatedRoute,

    private router:
      Router,

    private makerService:
      MakersService,

    private alertService:
      AlertService

  ) { }


  // ==========================================
  // ON INIT
  // ==========================================

  ngOnInit(): void {

    this.initializeForm();


    // ==========================================
    // Get Maker ID
    // ==========================================

    this.makerId =
      this.route.snapshot
        .paramMap
        .get('id') || '';


    // ==========================================
    // Get Mode From Query Params
    // ==========================================

    const mode =
      this.route.snapshot
        .queryParamMap
        .get('mode');


    this.isViewMode =
      mode === 'view';


    this.isEditMode =
      mode !== 'view';


    console.log(
      'Maker ID:',
      this.makerId
    );

    console.log(
      'Mode:',
      mode
    );

    console.log(
      'isViewMode:',
      this.isViewMode
    );

    console.log(
      'isEditMode:',
      this.isEditMode
    );


    // ==========================================
    // Validate ID
    // ==========================================

    if (!this.makerId) {

      this.alertService.error(
        'Maker ID not found'
      );

      this.goBack();

      return;

    }


    // ==========================================
    // Get Maker Details
    // ==========================================

    this.getMakerById();

  }


  // ==========================================
  // Initialize Form
  // ==========================================

  initializeForm(): void {

    this.makerForm =
      this.fb.group({

        // ====================================
        // Basic
        // ====================================

        name: [

          '',

          Validators.required

        ],

        phone: [

          '',

          [

            Validators.required,

            Validators.pattern(
              /^[0-9]{10}$/
            )

          ]

        ],

        email: [

          '',

          Validators.email

        ],

        specialization: [

          ''

        ],

        isActive: [

          true

        ],


        // ====================================
        // Address
        // ====================================

        addressLine1: [

          ''

        ],

        addressLine2: [

          ''

        ],

        city: [

          ''

        ],

        state: [

          ''

        ],

        pincode: [

          '',

          Validators.pattern(
            /^[0-9]{6}$/
          )

        ],

        country: [

          'India'

        ],


        // ====================================
        // Notes
        // ====================================

        notes: [

          ''

        ]

      });

  }


  // ==========================================
  // Get Maker By ID
  // ==========================================

  getMakerById(): void {

    this.isLoading = true;


    this.makerService
      .getMakerById(
        this.makerId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Maker Details Response:',
            response
          );


          const maker =
            response?.data;


          if (!maker) {

            this.isLoading = false;


            this.alertService.error(
              'Maker details not found'
            );

            return;

          }


          // ====================================
          // PATCH FORM
          // ====================================

          this.makerForm.patchValue({

            name:
              maker.name || '',

            phone:
              maker.phone || '',

            email:
              maker.email || '',

            specialization:
              maker.specialization || '',

            isActive:
              maker.isActive !== undefined
                ? maker.isActive
                : true,


            // ==================================
            // Address
            // ==================================

            addressLine1:
              maker.address?.addressLine1
              || '',

            addressLine2:
              maker.address?.addressLine2
              || '',

            city:
              maker.address?.city
              || '',

            state:
              maker.address?.state
              || '',

            pincode:
              maker.address?.pincode
              || '',

            country:
              maker.address?.country
              || 'India',


            // ==================================
            // Notes
            // ==================================

            notes:
              maker.notes || ''

          });


          // ====================================
          // VIEW MODE
          // ====================================

          if (
            this.isViewMode
          ) {

            this.makeFormReadonly();

          }


          console.log(
            'Patched Maker Form:',
            this.makerForm.value
          );


          this.isLoading = false;

        },


        error: (error: any) => {

          console.log(
            'Get Maker Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to load maker details'

          );

        }

      });

  }


  // ==========================================
  // Make Form Readonly
  // ==========================================

  makeFormReadonly(): void {

    this.makerForm.disable();

  }


  // ==========================================
  // Update Maker
  // ==========================================

  onSubmit(): void {

    // ========================================
    // View mode lo submit prevent
    // ========================================

    if (
      this.isViewMode
    ) {

      return;

    }


    this.isSubmitted = true;


    // ========================================
    // Validate
    // ========================================

    if (
      this.makerForm.invalid
    ) {

      this.makerForm
        .markAllAsTouched();


      this.alertService.error(

        'Please fill all required fields'

      );

      return;

    }


    const value =
      this.makerForm.value;


    // ========================================
    // Basic Validation
    // ========================================

    if (
      !value.name?.trim()
    ) {

      this.alertService.error(
        'Maker Name is required'
      );

      return;

    }


    if (
      !value.phone?.trim()
    ) {

      this.alertService.error(
        'Maker Phone Number is required'
      );

      return;

    }


    // ========================================
    // Prepare Update Payload
    // ========================================

    const makerData = {

      name:
        value.name
          .trim(),

      phone:
        value.phone
          .trim(),

      email:
        value.email
          ?.trim() || '',


      // ======================================
      // Address
      // ======================================

      address: {

        addressLine1:
          value.addressLine1
            ?.trim() || '',

        addressLine2:
          value.addressLine2
            ?.trim() || '',

        city:
          value.city
            ?.trim() || '',

        state:
          value.state
            ?.trim() || '',

        pincode:
          value.pincode
            ?.trim() || '',

        country:
          value.country
            ?.trim() || 'India'

      },


      // ======================================
      // Other
      // ======================================

      specialization:
        value.specialization
          ?.trim() || '',

      notes:
        value.notes
          ?.trim() || '',

      isActive:
        value.isActive

    };


    console.log(
      'Update Maker Payload:',
      makerData
    );


    // ========================================
    // Loading
    // ========================================

    this.isLoading = true;


    // ========================================
    // UPDATE API
    // ========================================

    this.makerService
      .updateMaker(

        this.makerId,

        makerData

      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Update Maker Response:',
            response
          );


          this.isLoading = false;


          this.alertService
            .success(

              response?.message ||

              'Maker updated successfully'

            )
          this.router.navigate([

            '/admin/gold-smith-list'

          ]);

        },


        error: (error: any) => {

          console.log(
            'Update Maker Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to update maker'

          );

        }

      });

  }


  // ==========================================
  // Back
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/admin/gold-smith-list'

    ]);

  }

}
