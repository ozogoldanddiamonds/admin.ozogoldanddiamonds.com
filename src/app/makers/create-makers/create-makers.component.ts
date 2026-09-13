import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { MakersService } from 'src/app/Services/makers.service';

@Component({
  selector: 'app-create-makers',
  templateUrl: './create-makers.component.html',
  styleUrls: ['./create-makers.component.css']
})
export class CreateMakersComponent implements OnInit {


  // ==========================================
  // Form
  // ==========================================

  makerForm!: FormGroup;


  // ==========================================
  // UI
  // ==========================================

  isSubmitted = false;

  isLoading = false;


  constructor(

    private fb:
      FormBuilder,

    private makerService:
      MakersService,

    private router:
      Router,

    private alertService:
      AlertService

  ) { }


  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.initializeForm();

  }


  // ==========================================
  // Initialize Form
  // ==========================================

  initializeForm(): void {

    this.makerForm =
      this.fb.group({

        // ====================================
        // Maker Information
        // ====================================

        name: [

          '',

          [
            Validators.required
          ]

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
  // Submit
  // ==========================================

  onSubmit(): void {

    this.isSubmitted = true;


    // ========================================
    // Validate Form
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


    // ========================================
    // Get Form Value
    // ========================================

    const value =
      this.makerForm.value;


    // ========================================
    // Prepare Payload
    // ========================================

    const makerData = {

      // ======================================
      // Basic
      // ======================================

      name:
        value.name
          ?.trim() || '',


      phone:
        value.phone
          ?.trim() || '',


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


    // ========================================
    // Debug
    // ========================================

    console.log(
      'Create Maker Payload:',
      makerData
    );


    // ========================================
    // Loading
    // ========================================

    this.isLoading = true;


    // ========================================
    // Create Maker API
    // ========================================

    this.makerService
      .createMaker(
        makerData
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Create Maker Response:',
            response
          );


          this.isLoading = false;

          this.alertService.success(
            'Maker created successfully'
          );

          this.router.navigate([

            '/admin/gold-smith-list'

          ]);


        },


        error: (error: any) => {

          console.log(
            'Create Maker Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to create maker'

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
