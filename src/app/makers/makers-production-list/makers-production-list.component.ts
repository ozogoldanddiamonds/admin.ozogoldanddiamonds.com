import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { AlertService } from 'src/app/Services/alert.service';
import { MakersProductionService } from 'src/app/Services/makers-production.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-makers-production-list',
  templateUrl: './makers-production-list.component.html',
  styleUrls: ['./makers-production-list.component.css']
})
export class MakersProductionListComponent implements OnInit, AfterViewInit {



  // ==========================================
  // DISPLAYED COLUMNS
  // ==========================================

  displayedColumns: string[] = [

    'sno',

    'maker',

    'productionNumber',

    'issueDate',

    'expectedDate',

    'receivedDate',

    'status',

    'notes',

    'actions'

  ];


  // ==========================================
  // PRODUCTION LIST
  // ==========================================

  makerProductionList: any[] = [];


  // ==========================================
  // DATA SOURCE
  // ==========================================

  dataSource =
    new MatTableDataSource<any>();


  // ==========================================
  // PAGINATOR
  // ==========================================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  // ==========================================
  // SORT
  // ==========================================

  @ViewChild(MatSort)
  sort!: MatSort;


  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(

    private makerProductionService:
      MakersProductionService,

    private router:
      Router,

    private alertService:
      AlertService,
          private alert: AlertService,


    private dialog:
      MatDialog

  ) { }


  // ==========================================
  // ON INIT
  // ==========================================

  ngOnInit(): void {

    this.getAllMakerProductions();


    // ========================================
    // CUSTOM SEARCH
    // ========================================

    this.dataSource.filterPredicate = (

      data: any,

      filter: string

    ) => {


      // ======================================
      // MAKER
      // ======================================

      const makerName =
        data.maker?.name || '';

      const makerPhone =
        data.maker?.phone || '';

      const specialization =
        data.maker?.specialization || '';


      // ======================================
      // SEARCH TEXT
      // ======================================

      const searchText = (

        makerName +

        ' ' +

        makerPhone +

        ' ' +

        specialization +

        ' ' +

        (data.productionNumber || '') +

        ' ' +

        (data.status || '') +

        ' ' +

        (data.notes || '')

      )
        .toLowerCase()
        .trim();


      return searchText.includes(
        filter
      );

    };

  }


  // ==========================================
  // AFTER VIEW INIT
  // ==========================================

  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;


    this.dataSource.sort =
      this.sort;

  }


  // ==========================================
  // GET ALL MAKER PRODUCTIONS
  // ==========================================

  getAllMakerProductions(): void {

    this.makerProductionService
      .getAllMakerProductions()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Maker Productions Response:',
            response
          );


          // ====================================
          // API DATA
          // ====================================

          this.makerProductionList =
            response?.data || [];


          // ====================================
          // BIND TABLE
          // ====================================

          this.dataSource.data =
            this.makerProductionList;


          // ====================================
          // REASSIGN PAGINATOR
          // ====================================

          this.dataSource.paginator =
            this.paginator;


          // ====================================
          // REASSIGN SORT
          // ====================================

          this.dataSource.sort =
            this.sort;

        },


        error: (error: any) => {

          console.log(
            'Get Maker Productions Error:',
            error
          );


          this.makerProductionList = [];

          this.dataSource.data = [];


          this.alertService.error(

            error?.error?.message ||

            'Failed to load maker productions'

          );

        }

      });

  }


  // ==========================================
  // SEARCH FILTER
  // ==========================================

  applyFilter(
    event: Event
  ): void {

    const filterValue =

      (
        event.target as
        HTMLInputElement
      ).value;


    this.dataSource.filter =

      filterValue
        .trim()
        .toLowerCase();


    // ========================================
    // FIRST PAGE
    // ========================================

    if (
      this.dataSource.paginator
    ) {

      this.dataSource
        .paginator
        .firstPage();

    }

  }


  // ==========================================
  // VIEW MAKER PRODUCTION
  // ==========================================

  viewMakerProduction(
    element: any
  ): void {

    console.log(
      'View Maker Production:',
      element
    );


    if (!element?._id) {

      this.alertService.error(
        'Maker Production ID not found'
      );

      return;

    }


    this.router.navigate(

      [
        '/admin/update-gold-smiths-production',
        element._id
      ],

      {
        queryParams: {
          mode: 'view'
        }
      }

    );

  }


  // ==========================================
  // EDIT MAKER PRODUCTION
  // ==========================================

  editMakerProduction(
    element: any
  ): void {

    console.log(
      'Edit Maker Production:',
      element
    );


    if (!element?._id) {

      this.alertService.error(
        'Maker Production ID not found'
      );

      return;

    }


    this.router.navigate([

      '/admin/update-gold-smiths-production',
      element._id

    ]);

  }


  // ==========================================
  // DELETE MAKER PRODUCTION
  // ==========================================

  deleteMakerProduction(
    production: any
  ): void {


    // ========================================
    // ID VALIDATION
    // ========================================

    if (!production?._id) {

      this.alertService.error(
        'Maker Production ID not found'
      );

      return;

    }


    // ========================================
    // COMPLETED CHECK
    // ========================================

    if (
      production.status ===
      'COMPLETED'
    ) {

      this.alertService.error(

        'Completed maker production cannot be deleted'

      );

      return;

    }


    // ========================================
    // DELETE CONFIRMATION DIALOG
    // ========================================

    const dialogRef =
      this.dialog.open(
        DeleteConfirmationComponent,
        {
          width: '400px'
        }
      );


    // ========================================
    // AFTER DIALOG CLOSED
    // ========================================

    dialogRef
      .afterClosed()
      .subscribe((result) => {


        // ====================================
        // USER CONFIRMED
        // ====================================

        if (result) {


          // ==================================
          // DELETE API
          // ==================================

          this.makerProductionService
            .deleteMakerProduction(
              production._id
            )
            .subscribe({

              // ==============================
              // SUCCESS
              // ==============================

              next: (response: any) => {

                console.log(
                  'Delete Maker Production Response:',
                  response
                );


                // ==============================
                // SUCCESS ALERT
                // ==============================

                Swal.fire({

                  icon: 'success',

                  title: 'Deleted',

                  text:
                    response?.message ||
                    'Maker Production Deleted Successfully',

                  timer: 2500,

                  timerProgressBar: true,

                  showConfirmButton: false,

                  customClass: {
                    popup: 'success-popup'
                  }

                });


                // ==============================
                // REFRESH LIST
                // ==============================

                this.getAllMakerProductions();

              },


              // ==============================
              // ERROR
              // ==============================

              error: (error: any) => {

                console.error(
                  'Delete Maker Production Error:',
                  error
                );


                // ==============================
                // ERROR ALERT
                // ==============================

                Swal.fire({

                  icon: 'error',

                  title: 'Oops...',

                  text:
                    error?.error?.message ||
                    'Delete Failed',

                  timer: 2500,

                  timerProgressBar: true,

                  showConfirmButton: false,

                  customClass: {
                    popup: 'error-popup'
                  }

                });

              }

            });

        }

      });

  }
  // =========================
// CHANGE MAKER PRODUCTION STATUS
// =========================

changeStatus(element: any): void {

  Swal.fire({
    title: 'Change Production Status',
    html: `
      <div class="production-status-grid">

        <!-- ISSUED -->
        <label class="production-status-option issued-option">
          <input
            type="radio"
            name="productionStatus"
            value="ISSUED"
            ${element.status === 'ISSUED' ? 'checked' : ''}
          >
          <div class="status-content">
            <span class="status-icon">
            </span>
            <span class="status-option-text">ISSUED</span>
          </div>
          <span class="status-selected">
          </span>
        </label>

        <!-- IN PROGRESS -->
        <label class="production-status-option progress-option">
          <input
            type="radio"
            name="productionStatus"
            value="IN_PROGRESS"
            ${element.status === 'IN_PROGRESS' ? 'checked' : ''}
          >
          <div class="status-content">
            <span class="status-icon">
            </span>
            <span class="status-option-text">IN PROGRESS</span>
          </div>
          <span class="status-selected">
          </span>
        </label>

        <!-- COMPLETED -->
        <label class="production-status-option completed-option">
          <input
            type="radio"
            name="productionStatus"
            value="COMPLETED"
            ${element.status === 'COMPLETED' ? 'checked' : ''}
          >
          <div class="status-content">
            <span class="status-icon">
            </span>
            <span class="status-option-text">COMPLETED</span>
          </div>
          <span class="status-selected">
          </span>
        </label>

        <!-- CANCELLED -->
        <label class="production-status-option cancelled-option">
          <input
            type="radio"
            name="productionStatus"
            value="CANCELLED"
            ${element.status === 'CANCELLED' ? 'checked' : ''}
          >
          <div class="status-content">
            <span class="status-icon">
            </span>
            <span class="status-option-text">CANCELLED</span>
          </div>
          <span class="status-selected">
          </span>
        </label>

      </div>
    `,
    width: '500px',
    showCancelButton: true,
    confirmButtonText: 'Update Status',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#640101',
    cancelButtonColor: '#6c757d',
    reverseButtons: true,
    customClass: {
      popup: 'production-status-popup',
      title: 'production-status-title',
      confirmButton: 'production-status-confirm',
      cancelButton: 'production-status-cancel'
    },
    didOpen: () => {
      // Grid layout apply via JavaScript
      const grid = document.querySelector('.production-status-grid') as HTMLElement;
      if (grid) {
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = '1fr 1fr';
        grid.style.gap = '12px';
        grid.style.margin = '10px 0';
      }
    },
    preConfirm: () => {
      const selected = document.querySelector(
        'input[name="productionStatus"]:checked'
      ) as HTMLInputElement;

      if (!selected) {
        Swal.showValidationMessage('Please select a status');
        return false;
      }

      return selected.value;
    }

  }).then((result) => {
    if (result.isConfirmed && result.value) {
      this.makerProductionService
        .updateMakerProductionStatus(element._id, result.value)
        .subscribe({
          next: (response) => {
            console.log('Status Updated:', response);
            element.status = result.value;
            this.alert.success('Status Updated Successfully');
          },
          error: (error) => {
            console.error('Status Update Error:', error);
            this.alert.error(error?.error?.message || 'Failed to update status');
          }
        });
    }
  });

}

}