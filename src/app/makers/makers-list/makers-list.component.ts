import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { AlertService } from 'src/app/Services/alert.service';
import { MakersService } from 'src/app/Services/makers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-makers-list',
  templateUrl: './makers-list.component.html',
  styleUrls: ['./makers-list.component.css']
})
export class MakersListComponent implements OnInit, AfterViewInit {


  // ==========================================
  // Displayed Columns
  // ==========================================

  displayedColumns: string[] = [
    'sno',
    'maker',
    'phone',
    'email',
    'address',
    'specialization',
    'status',
    'createdAt',
    'actions'
  ];

  // ==========================================
  // Maker List
  // ==========================================

  makerList: any[] = [];

  // ==========================================
  // Data Source
  // ==========================================

  dataSource = new MatTableDataSource<any>();

  // ==========================================
  // Paginator
  // ==========================================

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ==========================================
  // Sort
  // ==========================================

  @ViewChild(MatSort) sort!: MatSort;

  // ==========================================
  // Constructor
  // ==========================================

  constructor(
    private makerService: MakersService,
    private router: Router,
    private alertService: AlertService,
    private dialog: MatDialog
  ) {}

  // ==========================================
  // On Init
  // ==========================================

  ngOnInit(): void {

    this.getAllMakers();

    // ========================================
    // Custom Search
    // ========================================

    this.dataSource.filterPredicate = (
      data: any,
      filter: string
    ) => {

      // ======================================
      // Address
      // ======================================

      const addressLine1 =
        data.address?.addressLine1 || '';

      const addressLine2 =
        data.address?.addressLine2 || '';

      const city =
        data.address?.city || '';

      const state =
        data.address?.state || '';

      const pincode =
        data.address?.pincode || '';

      const country =
        data.address?.country || '';

      // ======================================
      // Status
      // ======================================

      const status =
        data.isActive ? 'active' : 'inactive';

      // ======================================
      // Search Text
      // ======================================

      const searchText = (

        (data.name || '') + ' ' +

        (data.phone || '') + ' ' +

        (data.email || '') + ' ' +

        (data.specialization || '') + ' ' +

        (data.notes || '') + ' ' +

        addressLine1 + ' ' +

        addressLine2 + ' ' +

        city + ' ' +

        state + ' ' +

        pincode + ' ' +

        country + ' ' +

        status

      )
        .toLowerCase()
        .trim();

      return searchText.includes(filter);
    };
  }

  // ==========================================
  // After View Init
  // ==========================================

  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;

    this.dataSource.sort =
      this.sort;
  }

  // ==========================================
  // Get All Makers
  // ==========================================

  getAllMakers(): void {

    this.makerService
      .getAllMakers()
      .subscribe({

        // ====================================
        // Success
        // ====================================

        next: (response: any) => {

          console.log(
            'Makers Response:',
            response
          );

          // ==================================
          // API Data
          // ==================================

          this.makerList =
            response?.data || [];

          // ==================================
          // Bind Table
          // ==================================

          this.dataSource.data =
            this.makerList;

          // ==================================
          // Paginator
          // ==================================

          this.dataSource.paginator =
            this.paginator;

          // ==================================
          // Sort
          // ==================================

          this.dataSource.sort =
            this.sort;
        },

        // ====================================
        // Error
        // ====================================

        error: (error: any) => {

          console.log(
            'Get Makers Error:',
            error
          );

          this.makerList = [];

          this.dataSource.data = [];

          this.alertService.error(
            error?.error?.message ||
            'Failed to load makers'
          );
        }
      });
  }

  // ==========================================
  // Search Filter
  // ==========================================

  applyFilter(event: Event): void {

    const filterValue =
      (event.target as HTMLInputElement).value;

    this.dataSource.filter =
      filterValue
        .trim()
        .toLowerCase();

    // ========================================
    // Reset Page
    // ========================================

    if (this.dataSource.paginator) {

      this.dataSource
        .paginator
        .firstPage();
    }
  }

  // ==========================================
  // Delete Maker
  // ==========================================

  deleteMaker(data: any): void {

    // ========================================
    // Maker ID Validation
    // ========================================

    if (!data?._id) {

      this.alertService.error(
        'Maker ID not found'
      );

      return;
    }

    // ========================================
    // Delete Confirmation Dialog
    // ========================================

    const dialogRef =
      this.dialog.open(
        DeleteConfirmationComponent,
        {
          width: '400px'
        }
      );

    // ========================================
    // After Dialog Closed
    // ========================================

    dialogRef
      .afterClosed()
      .subscribe((result) => {

        if (result) {

          // ==================================
          // Delete API
          // ==================================

          this.makerService
            .deleteMaker(data._id)
            .subscribe({

              // =================================
              // Success
              // =================================

              next: (response: any) => {

                console.log(
                  'Delete Maker Response:',
                  response
                );

                Swal.fire({

                  icon: 'success',

                  title: 'Deleted',

                  text:
                    response?.message ||
                    'Maker Deleted Successfully',

                  timer: 2500,

                  timerProgressBar: true,

                  showConfirmButton: false,

                  customClass: {
                    popup: 'success-popup'
                  }

                });

                // ===============================
                // Refresh Maker List
                // ===============================

                this.getAllMakers();
              },

              // =================================
              // Error
              // =================================

              error: (error: any) => {

                console.error(
                  'Delete Maker Error:',
                  error
                );

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

  // ==========================================
  // View Maker
  // ==========================================

  viewMaker(element: any): void {

    this.router.navigate(
      [
        '/admin/update-gold-smith',
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
  // Edit Maker
  // ==========================================

  editMaker(maker: any): void {

    console.log(
      'Edit Maker:',
      maker
    );

    if (!maker?._id) {

      this.alertService.error(
        'Maker ID not found'
      );

      return;
    }

    this.router.navigate([
      '/admin/update-gold-smith',
      maker._id
    ]);
  }
}