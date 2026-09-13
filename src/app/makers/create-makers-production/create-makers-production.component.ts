import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { MakersProductionService } from 'src/app/Services/makers-production.service';
import { MakersService } from 'src/app/Services/makers.service';

@Component({
  selector: 'app-create-makers-production',
  templateUrl: './create-makers-production.component.html',
  styleUrls: ['./create-makers-production.component.css']
})
export class CreateMakersProductionComponent implements OnInit {


  // ==========================================
  // FORM
  // ==========================================

  makerProductionForm!: FormGroup;


  // ==========================================
  // MAKER LIST
  // ==========================================

  makerList: any[] = [];


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

    private makerProductionService:
      MakersProductionService,

    private router:
      Router,

    private alertService:
      AlertService

  ) { }


  // ==========================================
  // ON INIT
  // ==========================================

  ngOnInit(): void {

    this.initializeForm();

    this.getActiveMakers();

  }


  // ==========================================
  // INITIALIZE FORM
  // ==========================================

  initializeForm(): void {

    this.makerProductionForm =
      this.fb.group({

        // ====================================
        // Maker
        // ====================================

        maker: [

          '',

          Validators.required

        ],


        // ====================================
        // Production Number
        // ====================================

        productionNumber: [

          '',

          Validators.required

        ],


        // ====================================
        // Issue Date
        // ====================================

        issueDate: [

          this.getTodayDate()

        ],


        // ====================================
        // Expected Date
        // ====================================

        expectedDate: [

          ''

        ],


        // ====================================
        // Received Date
        // ====================================

        receivedDate: [

          ''

        ],


        // ====================================
        // Status
        // ====================================

        status: [

          'DRAFT',

          Validators.required

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
  // GET ACTIVE MAKERS
  // ==========================================

  getActiveMakers(): void {

    this.makerService
      .getActiveMakers()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Active Makers Response:',
            response
          );


          this.makerList =
            response?.data || [];

        },


        error: (error: any) => {

          console.log(
            'Get Active Makers Error:',
            error
          );


          this.makerList = [];


          this.alertService.error(

            error?.error?.message ||

            'Failed to load active makers'

          );

        }

      });

  }


  // ==========================================
  // TODAY DATE
  // ==========================================

  getTodayDate(): string {

    const today =
      new Date();


    const year =
      today.getFullYear();


    const month =
      String(
        today.getMonth() + 1
      ).padStart(
        2,
        '0'
      );


    const day =
      String(
        today.getDate()
      ).padStart(
        2,
        '0'
      );


    return `${year}-${month}-${day}`;

  }


  // ==========================================
  // GET SELECTED MAKER NAME
  // ==========================================

  getSelectedMakerName(): string {

    const makerId =
      this.makerProductionForm
        ?.get('maker')
        ?.value;


    if (!makerId) {

      return '';

    }


    const selectedMaker =
      this.makerList.find(

        maker =>
          maker._id === makerId

      );


    if (!selectedMaker) {

      return '';

    }


    return (

      `${selectedMaker.name || ''}` +

      (
        selectedMaker.phone
          ? ` - ${selectedMaker.phone}`
          : ''
      )

    );

  }


  // ==========================================
  // SUBMIT
  // ==========================================

  onSubmit(): void {

    this.isSubmitted = true;


    // ========================================
    // Validate Form
    // ========================================

    if (
      this.makerProductionForm.invalid
    ) {

      this.makerProductionForm
        .markAllAsTouched();


      this.alertService.error(
        'Please fill all required fields'
      );

      return;

    }


    // ========================================
    // FORM VALUE
    // ========================================

    const value =
      this.makerProductionForm.value;


    // ========================================
    // Trim Production Number
    // ========================================

    const productionNumber =
      value.productionNumber
        ?.trim();


    if (!productionNumber) {

      this.alertService.error(
        'Production Number is required'
      );

      return;

    }


    // ========================================
    // DATE VALIDATION
    // ========================================

    if (
      value.issueDate &&
      value.expectedDate
    ) {

      const issueDate =
        new Date(
          value.issueDate
        );

      const expectedDate =
        new Date(
          value.expectedDate
        );


      if (
        expectedDate < issueDate
      ) {

        this.alertService.error(

          'Expected Date cannot be before Issue Date'

        );

        return;

      }

    }


    if (
      value.issueDate &&
      value.receivedDate
    ) {

      const issueDate =
        new Date(
          value.issueDate
        );

      const receivedDate =
        new Date(
          value.receivedDate
        );


      if (
        receivedDate < issueDate
      ) {

        this.alertService.error(

          'Received Date cannot be before Issue Date'

        );

        return;

      }

    }


    // ========================================
    // EXPECTED / RECEIVED LOGIC
    // ========================================

    if (
      value.expectedDate &&
      value.receivedDate
    ) {

      const expectedDate =
        new Date(
          value.expectedDate
        );

      const receivedDate =
        new Date(
          value.receivedDate
        );


      if (
        receivedDate < expectedDate
      ) {

        this.alertService.error(

          'Received Date cannot be before Expected Date'

        );

        return;

      }

    }


    // ========================================
    // STATUS
    // ========================================

    const allowedStatus = [

      'DRAFT',

      'ISSUED',

      'IN_PROGRESS',

      'COMPLETED',

      'CANCELLED'

    ];


    if (
      !allowedStatus.includes(
        value.status
      )
    ) {

      this.alertService.error(
        'Invalid production status'
      );

      return;

    }


    // ========================================
    // PREPARE PAYLOAD
    // ========================================

    const productionData = {

      maker:
        value.maker,

      productionNumber:
        productionNumber,

      issueDate:
        value.issueDate || null,

      expectedDate:
        value.expectedDate || null,

      receivedDate:
        value.receivedDate || null,

      status:
        value.status || 'DRAFT',

      notes:
        value.notes
          ?.trim() || ''

    };


    // ========================================
    // DEBUG
    // ========================================

    console.log(
      'Maker Production Payload:',
      productionData
    );


    // ========================================
    // LOADING
    // ========================================

    this.isLoading = true;


    // ========================================
    // CREATE API
    // ========================================

    this.makerProductionService
      .createMakerProduction(
        productionData
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Create Maker Production Response:',
            response
          );


          this.isLoading = false;


          this.alertService.success(

            response?.message ||

            'Maker production created successfully'

          );


          // ==================================
          // NAVIGATE
          // ==================================

          this.router.navigate([

            '/admin/gold-smiths-production-list'

          ]);

        },


        error: (error: any) => {

          console.log(
            'Create Maker Production Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to create maker production'

          );

        }

      });

  }


  // ==========================================
  // BACK
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/admin/gold-smiths-production-list'

    ]);

  }

}
