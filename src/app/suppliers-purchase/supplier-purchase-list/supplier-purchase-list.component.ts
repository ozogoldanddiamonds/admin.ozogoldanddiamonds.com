import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { AdminLoginService } from 'src/app/Services/admin-login.service';
import { AlertService } from 'src/app/Services/alert.service';
import { SupplierPurchaseService } from 'src/app/Services/supplier-purchase.service';

@Component({
  selector: 'app-supplier-purchase-list',
  templateUrl: './supplier-purchase-list.component.html',
  styleUrls: ['./supplier-purchase-list.component.css']
})
export class SupplierPurchaseListComponent implements OnInit {

  role: string = '';

  displayedColumns: string[] = [
    'sno',
    'supplier',
    'invoiceNumber',
    'invoiceDate',
    'purchaseDate',
    'subtotal',
    'discount',
    'tax',
    'totalAmount',
    'paymentStatus',
    'status',
    'actions'
  ];


  dataSource =
    new MatTableDataSource<any>();


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  @ViewChild(MatSort)
  sort!: MatSort;


  supplierPurchases: any[] = [];


  constructor(
    private supplierPurchaseService: SupplierPurchaseService,
    private router: Router,
    private dialog: MatDialog,
    public authService: AdminLoginService,
    private alert: AlertService
  ) { }


  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.role =
      localStorage.getItem('role') || '';

    console.log(
      'ROLE =>',
      this.role
    );


    this.getAllSupplierPurchases();

  }


  // =========================
  // GET ALL SUPPLIER PURCHASES
  // =========================

  getAllSupplierPurchases(): void {

    this.supplierPurchaseService
      .getAllSupplierPurchases()
      .subscribe({

        next: (response: any) => {

          console.log(
            response,
            'supplier purchases'
          );


          this.supplierPurchases =
            response.data;


          this.dataSource.data =
            response.data;


          this.dataSource.paginator =
            this.paginator;


          this.dataSource.sort =
            this.sort;

        },


        error: (error) => {

          console.error(
            error
          );

        }

      });

  }


  // =========================
  // VIEW SUPPLIER PURCHASE
  // =========================


  viewSupplierPurchase(element: any): void {

    this.router.navigate(
      [
        '/admin/update-supplier-purchase',
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
  // DELETE SUPPLIER PURCHASE
  // =========================

  deleteSupplierPurchase(
    data: any
  ): void {

    const dialogRef =
      this.dialog.open(

        DeleteConfirmationComponent,

        {
          width: '400px'
        }

      );


    dialogRef
      .afterClosed()
      .subscribe(result => {

        if (result) {

          this.supplierPurchaseService
            .deleteSupplierPurchase(
              data._id
            )
            .subscribe({

              next: () => {

                this.alert.success(
                  'Deleted Successfully'
                );


                this.getAllSupplierPurchases();

              },


              error: (error) => {

                console.error(
                  error
                );


                alert(
                  'Delete failed'
                );

              }

            });

        }

      });

  }

  editSupplierPurchase(element: any): void {

    this.router.navigate([
      '/admin/update-supplier-purchase',
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

  }


}
