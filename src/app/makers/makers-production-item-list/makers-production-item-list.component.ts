import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { AlertService } from 'src/app/Services/alert.service';
import { MakersProductionItemService } from 'src/app/Services/makers-production-item.service';
import Swal from 'sweetalert2';

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
      AlertService,
       private dialog:
    MatDialog
    

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

 // ==========================================
// DELETE MAKER PRODUCTION ITEM
// ==========================================

deleteMakerProductionItem(
  element: any
): void {

  // ========================================
  // ID VALIDATION
  // ========================================

  if (!element?._id) {

    this.alertService.error(
      'Maker Production Item ID not found'
    );

    return;

  }


  // ========================================
  // PRODUCTION STATUS
  // ========================================

  const productionStatus =
    element.production?.status;


  // ========================================
  // COMPLETED CHECK
  // ========================================

  if (
    productionStatus === 'COMPLETED'
  ) {

    this.alertService.error(
      'Items from a completed maker production cannot be deleted'
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

        this.makerProductionItemService
          .deleteMakerProductionItem(
            element._id
          )
          .subscribe({

            // ==============================
            // SUCCESS
            // ==============================

            next: (response: any) => {

              console.log(
                'Delete Maker Production Item Response:',
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
                  'Maker Production Item Deleted Successfully',

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

              this.getAllMakerProductionItems();

            },


            // ==============================
            // ERROR
            // ==============================

            error: (error: any) => {

              console.error(
                'Delete Maker Production Item Error:',
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


}
