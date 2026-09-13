import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { MakersProductionItemService } from 'src/app/Services/makers-production-item.service';

@Component({
  selector: 'app-makers-production-item-list',
  templateUrl: './makers-production-item-list.component.html',
  styleUrls: ['./makers-production-item-list.component.css']
})
export class MakersProductionItemListComponent implements OnInit, AfterViewInit {


  // ==========================================
  // DISPLAYED COLUMNS
  // ==========================================

  displayedColumns: string[] = [

    'sno',

    'production',

    'maker',

    'product',

    'variant',

    'quantityGiven',

    'quantityReceived',

    'pendingQuantity',

    'notes',

    'createdAt',

    'actions'

  ];


  // ==========================================
  // ITEM LIST
  // ==========================================

  makerProductionItemList: any[] = [];


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

    private makerProductionItemService:
      MakersProductionItemService,

    private router:
      Router,

    private alertService:
      AlertService

  ) { }


  // ==========================================
  // ON INIT
  // ==========================================

  ngOnInit(): void {

    this.getAllMakerProductionItems();


    // ========================================
    // CUSTOM SEARCH
    // ========================================

    this.dataSource.filterPredicate = (

      data: any,

      filter: string

    ) => {

      // ======================================
      // PRODUCTION
      // ======================================

      const productionNumber =
        data.production
          ?.productionNumber || '';


      const productionStatus =
        data.production
          ?.status || '';


      // ======================================
      // MAKER
      // ======================================

      const makerName =
        data.production
          ?.maker
          ?.name || '';


      const makerPhone =
        data.production
          ?.maker
          ?.phone || '';


      // ======================================
      // PRODUCT
      // ======================================

      const productName =
        data.product
          ?.productName ||
        data.product
          ?.name ||
        '';


      const productCode =
        data.product
          ?.productCode ||
        data.product
          ?.code ||
        '';


      // ======================================
      // VARIANT
      // ======================================

      const variantName =
        data.variantName || '';


      const variantId =
        data.variantId || '';


      // ======================================
      // NOTES
      // ======================================

      const notes =
        data.notes || '';


      // ======================================
      // SEARCH TEXT
      // ======================================

      const searchText = (

        productionNumber +

        ' ' +

        productionStatus +

        ' ' +

        makerName +

        ' ' +

        makerPhone +

        ' ' +

        productName +

        ' ' +

        productCode +

        ' ' +

        variantName +

        ' ' +

        variantId +

        ' ' +

        (data.quantityGiven || '') +

        ' ' +

        (data.quantityReceived || '') +

        ' ' +

        notes

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
  // GET ALL ITEMS
  // ==========================================

  getAllMakerProductionItems(): void {

    this.makerProductionItemService
      .getAllMakerProductionItems()
      .subscribe({

        next: (response: any) => {

          console.log(
            'Maker Production Items Response:',
            response
          );


          // ====================================
          // API DATA
          // ====================================

          this.makerProductionItemList =
            response?.data || [];


          // ====================================
          // BIND TABLE
          // ====================================

          this.dataSource.data =
            this.makerProductionItemList;


          // ====================================
          // PAGINATOR
          // ====================================

          this.dataSource.paginator =
            this.paginator;


          // ====================================
          // SORT
          // ====================================

          this.dataSource.sort =
            this.sort;

        },


        error: (error: any) => {

          console.log(
            'Get Maker Production Items Error:',
            error
          );


          this.makerProductionItemList = [];

          this.dataSource.data = [];


          this.alertService.error(

            error?.error?.message ||

            'Failed to load maker production items'

          );

        }

      });

  }


  // ==========================================
  // SEARCH
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
  // PENDING QUANTITY
  // ==========================================

  getPendingQuantity(
    item: any
  ): number {

    const quantityGiven =
      Number(
        item?.quantityGiven || 0
      );


    const quantityReceived =
      Number(
        item?.quantityReceived || 0
      );


    const pending =
      quantityGiven -
      quantityReceived;


    return Math.max(
      pending,
      0
    );

  }
  // ==========================================
  // VIEW MAKER PRODUCTION ITEM
  // ==========================================

  viewMakerProductionItem(
    element: any
  ): void {

    console.log(
      'View Maker Production Item:',
      element
    );


    if (!element?._id) {

      this.alertService.error(
        'Maker Production Item ID not found'
      );

      return;

    }


    this.router.navigate(

      [
        '/admin/update-gold-smith-production-item',
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
  // EDIT MAKER PRODUCTION ITEM
  // ==========================================

  editMakerProductionItem(
    element: any
  ): void {

    console.log(
      'Edit Maker Production Item:',
      element
    );


    if (!element?._id) {

      this.alertService.error(
        'Maker Production Item ID not found'
      );

      return;

    }


    this.router.navigate([

      '/admin/update-gold-smith-production-item',
      element._id

    ]);

  }

  // ==========================================
  // DELETE
  // ==========================================

  deleteMakerProductionItem(
    element: any
  ): void {

    if (!element?._id) {

      this.alertService.error(
        'Maker Production Item ID not found'
      );

      return;

    }


    // ========================================
    // Production Status
    // ========================================

    const productionStatus =
      element.production
        ?.status;


    if (
      productionStatus ===
      'COMPLETED'
    ) {

      this.alertService.error(

        'Items from a completed maker production cannot be deleted'

      );

      return;

    }


    // ========================================
    // Confirmation
    // ========================================

    const confirmed =
      window.confirm(

        `Are you sure you want to delete this production item?`

      );


    if (!confirmed) {

      return;

    }


    // ========================================
    // DELETE API
    // ========================================

    this.makerProductionItemService
      .deleteMakerProductionItem(
        element._id
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Delete Maker Production Item Response:',
            response
          );


          this.alertService.success(

            response?.message ||

            'Maker production item deleted successfully'

          );


          // ==================================
          // REFRESH
          // ==================================

          this.getAllMakerProductionItems();

        },


        error: (error: any) => {

          console.log(
            'Delete Maker Production Item Error:',
            error
          );


          this.alertService.error(

            error?.error?.message ||

            'Failed to delete maker production item'

          );

        }

      });

  }


}
