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
import { SupplierPurchaseViewComponent } from 'src/app/View-dialog-Controllers/supplier-purchase-view/supplier-purchase-view.component';
import Swal from 'sweetalert2';

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


viewSupplierPurchase(purchase: any): void {

  this.dialog.open(
    SupplierPurchaseViewComponent,
    {
      width: '700px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: purchase
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


  // =========================
// CHANGE PAYMENT STATUS
// =========================

changePaymentStatus(element: any): void {

  Swal.fire({

    title: 'Change Payment Status',

    input: 'radio',

    inputOptions: {

      PAID: 'Paid',

      PENDING: 'Pending',

      PARTIAL: 'Partial'

    },

    inputValue: element.paymentStatus,

    showCancelButton: true,

    confirmButtonColor: '#640101',

    cancelButtonColor: '#6c757d',

    confirmButtonText: 'Update'

  }).then((result) => {

    if (result.isConfirmed && result.value) {

      this.supplierPurchaseService
        .updatePurchasePaymentStatus(
          element._id,
          result.value
        )
        .subscribe({

          next: () => {

            element.paymentStatus =
              result.value;

            this.alert.success(
              'Payment Status Updated Successfully'
            );

          },

          error: (error) => {

            console.error(error);

            this.alert.error(
              'Failed to update payment status'
            );

          }

        });

    }

  });

}


// =========================
// CHANGE PURCHASE STATUS
// =========================

changeStatus(element: any): void {

  Swal.fire({

    title: 'Change Status',

    input: 'radio',

    inputOptions: {

      DRAFT: 'Draft',

      RECEIVED: 'Received',

      CANCELLED: 'Cancelled'

    },

    inputValue: element.status,

    showCancelButton: true,

    confirmButtonColor: '#640101',

    cancelButtonColor: '#6c757d',

    confirmButtonText: 'Update'

  }).then((result) => {

    if (result.isConfirmed && result.value) {

      this.supplierPurchaseService
        .updateSupplierPurchaseStatus(
          element._id,
          result.value
        )
        .subscribe({

          next: (response) => {

            console.log(
              'Status Updated:',
              response
            );

            element.status =
              result.value;

            this.alert.success(
              'Status Updated Successfully'
            );

          },

          error: (error) => {

            console.error(
              'Status Update Error:',
              error
            );

            this.alert.error(
              error?.error?.message ||
              'Failed to update status'
            );

          }

        });

    }

  });

}


}
