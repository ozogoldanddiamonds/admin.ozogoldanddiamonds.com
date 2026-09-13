import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { MakersProductionService } from 'src/app/Services/makers-production.service';
import { MakersService } from 'src/app/Services/makers.service';

@Component({
  selector: 'app-update-makers-production',
  templateUrl: './update-makers-production.component.html',
  styleUrls: ['./update-makers-production.component.css']
})
export class UpdateMakersProductionComponent implements OnInit {


  // ==========================================
  // FORM
  // ==========================================

  makerProductionForm!: FormGroup;


  // ==========================================
  // MAKER LIST
  // ==========================================

  makerList: any[] = [];


  // ==========================================
  // PRODUCTION ID
  // ==========================================

  productionId: string = '';


  // ==========================================
  // MODE
  // ==========================================

  isViewMode = false;

  isEditMode = false;


  // ==========================================
  // UI
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

    private makerProductionService:
      MakersProductionService,

    private alertService:
      AlertService

  ) { }


  // ==========================================
  // ON INIT
  // ==========================================

  ngOnInit(): void {

    this.initializeForm();


    // ========================================
    // GET PRODUCTION ID
    // ========================================

    this.productionId =
      this.route.snapshot
        .paramMap
        .get('id') || '';


    // ========================================
    // GET MODE
    // ========================================

    const mode =
      this.route.snapshot
        .queryParamMap
        .get('mode');


    this.isViewMode =
      mode === 'view';


    this.isEditMode =
      mode !== 'view';


    console.log(
      'Production ID:',
      this.productionId
    );

    console.log(
      'Mode:',
      mode
    );

    console.log(
      'View Mode:',
      this.isViewMode
    );

    console.log(
      'Edit Mode:',
      this.isEditMode
    );


    // ========================================
    // VALIDATE ID
    // ========================================

    if (!this.productionId) {

      this.alertService.error(
        'Maker Production ID not found'
      );

      this.goBack();

      return;

    }


    // ========================================
    // LOAD MAKERS
    // ========================================

    this.getActiveMakers();


    // ========================================
    // LOAD PRODUCTION
    // ========================================

    this.getMakerProductionById();

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

          ''

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
            'Active Makers:',
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

            'Failed to load makers'

          );

        }

      });

  }


  // ==========================================
  // GET PRODUCTION BY ID
  // ==========================================

  getMakerProductionById(): void {

    this.isLoading = true;


    this.makerProductionService
      .getMakerProductionById(
        this.productionId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Maker Production Details:',
            response
          );


          const production =
            response?.data;


          if (!production) {

            this.isLoading = false;


            this.alertService.error(
              'Maker production details not found'
            );

            return;

          }


          // ====================================
          // PATCH FORM
          // ====================================

          this.makerProductionForm.patchValue({

            // ==================================
            // Maker
            // ==================================

            maker:
              production.maker?._id ||
              production.maker ||
              '',


            // ==================================
            // Production Number
            // ==================================

            productionNumber:
              production.productionNumber ||
              '',


            // ==================================
            // Dates
            // ==================================

            issueDate:
              this.formatDateForInput(
                production.issueDate
              ),

            expectedDate:
              this.formatDateForInput(
                production.expectedDate
              ),

            receivedDate:
              this.formatDateForInput(
                production.receivedDate
              ),


            // ==================================
            // Status
            // ==================================

            status:
              production.status ||
              'DRAFT',


            // ==================================
            // Notes
            // ==================================

            notes:
              production.notes ||
              ''

          });


          console.log(
            'Patched Production Form:',
            this.makerProductionForm.value
          );


          // ====================================
          // VIEW MODE
          // ====================================

          if (
            this.isViewMode
          ) {

            this.makerProductionForm
              .disable();

          }


          this.isLoading = false;

        },


        error: (error: any) => {

          console.log(
            'Get Maker Production Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to load maker production details'

          );

        }

      });

  }


  // ==========================================
  // FORMAT DATE
  // ==========================================

  formatDateForInput(
    date: any
  ): string {

    if (!date) {

      return '';

    }


    const parsedDate =
      new Date(date);


    if (
      isNaN(
        parsedDate.getTime()
      )
    ) {

      return '';

    }


    const year =
      parsedDate.getFullYear();


    const month =
      String(
        parsedDate.getMonth() + 1
      ).padStart(
        2,
        '0'
      );


    const day =
      String(
        parsedDate.getDate()
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


    const maker =
      this.makerList.find(

        item =>
          String(item._id) ===
          String(makerId)

      );


    if (!maker) {

      return '';

    }


    return (

      `${maker.name || ''}` +

      (
        maker.phone
          ? ` - ${maker.phone}`
          : ''
      )

    );

  }


  // ==========================================
  // SUBMIT / UPDATE
  // ==========================================

  onSubmit(): void {

    // ========================================
    // VIEW MODE PROTECTION
    // ========================================

    if (this.isViewMode) {

      return;

    }


    this.isSubmitted = true;


    // ========================================
    // VALIDATION
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


    const value =
      this.makerProductionForm.value;


    // ========================================
    // PRODUCTION NUMBER
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

    const issueDate =
      value.issueDate
        ? new Date(
          value.issueDate
        )
        : null;


    const expectedDate =
      value.expectedDate
        ? new Date(
          value.expectedDate
        )
        : null;


    const receivedDate =
      value.receivedDate
        ? new Date(
          value.receivedDate
        )
        : null;


    // ========================================
    // Expected >= Issue
    // ========================================

    if (
      issueDate &&
      expectedDate &&
      expectedDate < issueDate
    ) {

      this.alertService.error(

        'Expected Date cannot be before Issue Date'

      );

      return;

    }


    // ========================================
    // Received >= Issue
    // ========================================

    if (
      issueDate &&
      receivedDate &&
      receivedDate < issueDate
    ) {

      this.alertService.error(

        'Received Date cannot be before Issue Date'

      );

      return;

    }


    // ========================================
    // Received >= Expected
    // ========================================

    if (
      expectedDate &&
      receivedDate &&
      receivedDate < expectedDate
    ) {

      this.alertService.error(

        'Received Date cannot be before Expected Date'

      );

      return;

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
    // UPDATE PAYLOAD
    // ========================================

    const updateData = {

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
        value.status,

      notes:
        value.notes
          ?.trim() || ''

    };


    console.log(
      'Update Maker Production Payload:',
      updateData
    );


    // ========================================
    // LOADING
    // ========================================

    this.isLoading = true;


    // ========================================
    // UPDATE API
    // ========================================

    this.makerProductionService
      .updateMakerProduction(

        this.productionId,

        updateData

      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Update Maker Production Response:',
            response
          );


          this.isLoading = false;


          this.alertService.success(

            response?.message ||

            'Maker production updated successfully'

          );


          // ==================================
          // BACK TO LIST
          // ==================================

          this.router.navigate([

            '/admin/gold-smiths-production-list'

          ]);

        },


        error: (error: any) => {

          console.log(
            'Update Maker Production Error:',
            error
          );


          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to update maker production'

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
