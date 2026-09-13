import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminLoginService } from 'src/app/Services/admin-login.service';
import { SupplierPurchaseItemsService } from 'src/app/Services/supplier-purchase-items.service';

@Component({
  selector: 'app-supplier-purchase-item',
  templateUrl: './supplier-purchase-item.component.html',
  styleUrls: ['./supplier-purchase-item.component.css']
})
export class SupplierPurchaseItemComponent implements OnInit {


  // =========================
  // ROLE
  // =========================

  role: string = '';


  // =========================
  // TABLE COLUMNS
  // =========================

  displayedColumns: string[] = [

    'sno',

    'supplier',

    'invoiceNumber',

    'product',

    'variantId',

    'quantity',

    'purchasePrice',

    'discount',

    'tax',

    'totalAmount',

    'purchaseDate',

    'paymentStatus',

    'status',

    'actions'

  ];


  // =========================
  // DATA SOURCE
  // =========================

  dataSource =
    new MatTableDataSource<any>();


  // =========================
  // PAGINATOR
  // =========================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  // =========================
  // SORT
  // =========================

  @ViewChild(MatSort)
  sort!: MatSort;


  // =========================
  // DATA
  // =========================

  supplierPurchaseItems: any[] = [];


  constructor(
    private supplierPurchaseItemService:
      SupplierPurchaseItemsService,

    private router: Router,

    public authService:
      AdminLoginService
  ) { }

  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.role = localStorage.getItem('role') || '';


    console.log(
      'ROLE =>',
      this.role
    );


    this.getAllSupplierPurchaseItems();

  }


  // =========================
  // GET ALL ITEMS
  // =========================

  getAllSupplierPurchaseItems(): void {

    this.supplierPurchaseItemService
      .getAllSupplierPurchaseItems()
      .subscribe({

        next: (response: any) => {

          console.log(
            response,
            'supplier purchase items'
          );


          this.supplierPurchaseItems =
            response.data || [];


          this.dataSource.data =
            this.supplierPurchaseItems;


          // =========================
          // PAGINATOR
          // =========================

          this.dataSource.paginator =
            this.paginator;


          // =========================
          // SORT
          // =========================

          this.dataSource.sort =
            this.sort;


          // =========================
          // CUSTOM SEARCH
          // =========================

          this.dataSource.filterPredicate =
            (
              data: any,
              filter: string
            ): boolean => {

              const searchText = [

                // Supplier
                data.purchase
                  ?.supplier
                  ?.name,

                // Invoice
                data.purchase
                  ?.invoiceNumber,

                // Product
                data.product
                  ?.name,

                // Variant ID
                data.variantId,

                // Quantity
                data.quantity,

                // Purchase Price
                data.purchasePrice,

                // Discount
                data.discount,

                // Tax
                data.tax,

                // Total
                data.totalAmount,

                // Payment Status
                data.purchase
                  ?.paymentStatus,

                // Purchase Status
                data.purchase
                  ?.status

              ]
                .filter(
                  value =>
                    value !== undefined &&
                    value !== null
                )
                .join(' ')
                .toLowerCase();


              return searchText.includes(
                filter
              );

            };

        },


        error: (error) => {

          console.error(
            error
          );

        }

      });

  }




  viewSupplierPurchaseItem(element: any): void {

    console.log('VIEW ELEMENT:', element);

    const purchaseId =
      element.purchase?._id;

    if (!purchaseId) {
      console.error('Purchase ID not found');
      return;
    }

    this.router.navigate(
      [
        '/admin/update-supplier-purchase-item',
        purchaseId,
        element._id
      ],
      {
        queryParams: {
          mode: 'view'
        }
      }
    );

  }
  // =========================
  // EDIT
  // =========================

  editSupplierPurchaseItem(element: any): void {

    console.log('CLICK ELEMENT:', element);

    const purchaseId =
      element.purchase?._id;

    if (!purchaseId) {

      console.error(
        'Purchase ID not found'
      );

      return;
    }

    console.log(
      'PURCHASE ID:',
      purchaseId
    );

    this.router.navigate([
      '/admin/update-supplier-purchase-item',
      element.purchase._id,
      element._id
    ]);

  }


  // =========================
  // SEARCH
  // =========================

  applyFilter(
    event: Event
  ): void {

    const filterValue =
      (
        event.target as HTMLInputElement
      ).value;


    this.dataSource.filter =
      filterValue
        .trim()
        .toLowerCase();


    // =========================
    // FIRST PAGE
    // =========================

    if (
      this.dataSource.paginator
    ) {

      this.dataSource.paginator
        .firstPage();

    }

  }
}
