import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { MakersProductionService } from 'src/app/Services/makers-production.service';

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


  constructor(

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
    // CONFIRMATION
    // ========================================

    const confirmed =
      window.confirm(

        `Are you sure you want to delete production "${production.productionNumber || ''}"?`

      );


    if (!confirmed) {

      return;

    }


    // ========================================
    // DELETE API
    // ========================================

    this.makerProductionService
      .deleteMakerProduction(
        production._id
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Delete Maker Production Response:',
            response
          );


          this.alertService.success(

            response?.message ||

            'Maker production deleted successfully'

          );


          // ==================================
          // REFRESH LIST
          // ==================================

          this.getAllMakerProductions();

        },


        error: (error: any) => {

          console.log(
            'Delete Maker Production Error:',
            error
          );


          this.alertService.error(

            error?.error?.message ||

            'Failed to delete maker production'

          );

        }

      });

  }

}
