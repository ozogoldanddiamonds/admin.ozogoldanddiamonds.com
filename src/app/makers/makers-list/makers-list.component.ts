import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { MakersService } from 'src/app/Services/makers.service';

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

  dataSource =
    new MatTableDataSource<any>();


  // ==========================================
  // Paginator
  // ==========================================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  // ==========================================
  // Sort
  // ==========================================

  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(

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
        data.isActive
          ? 'active'
          : 'inactive';


      // ======================================
      // Search Text
      // ======================================

      const searchText = (

        (data.name || '') +

        ' ' +

        (data.phone || '') +

        ' ' +

        (data.email || '') +

        ' ' +

        (data.specialization || '') +

        ' ' +

        (data.notes || '') +

        ' ' +

        addressLine1 +

        ' ' +

        addressLine2 +

        ' ' +

        city +

        ' ' +

        state +

        ' ' +

        pincode +

        ' ' +

        country +

        ' ' +

        status

      )
        .toLowerCase()
        .trim();


      return searchText.includes(
        filter
      );

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

        next: (response: any) => {

          console.log(
            'Makers Response:',
            response
          );


          // ====================================
          // API Data
          // ====================================

          this.makerList =
            response?.data || [];


          // ====================================
          // Bind Table
          // ====================================

          this.dataSource.data =
            this.makerList;


          // ====================================
          // Paginator
          // ====================================

          this.dataSource.paginator =
            this.paginator;


          // ====================================
          // Sort
          // ====================================

          this.dataSource.sort =
            this.sort;

        },


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
    // Reset Page
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
  // Delete Maker
  // ==========================================

  deleteMaker(
    maker: any
  ): void {

    if (!maker?._id) {

      this.alertService.error(
        'Maker ID not found'
      );

      return;

    }


    // ========================================
    // Confirmation
    // ========================================

    const confirmed =
      window.confirm(

        `Are you sure you want to delete "${maker.name || 'this maker'}"?`

      );


    if (!confirmed) {

      return;

    }


    // ========================================
    // Delete API
    // ========================================

    this.makerService
      .deleteMaker(
        maker._id
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Delete Maker Response:',
            response
          );


          this.alertService
            .success(

              response?.message ||

              'Maker deleted successfully'

            )
          this.getAllMakers();

        },


        error: (error: any) => {

          console.log(
            'Delete Maker Error:',
            error
          );


          this.alertService.error(

            error?.error?.message ||

            'Failed to delete maker'

          );

        }

      });

  }

  viewMaker(
    element: any
  ): void {

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


  editMaker(
    maker: any
  ): void {

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
