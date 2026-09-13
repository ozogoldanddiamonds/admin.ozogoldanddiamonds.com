import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { Coupon } from 'src/app/models/coupon';
import { AlertService } from 'src/app/Services/alert.service';
import { CouponService } from 'src/app/Services/coupon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.css']
})
export class CouponListComponent implements OnInit {

  displayedColumns: string[] = [

    'sno',
    'code',
    'discountType',
    'value',
    'minOrderAmount',
    'expiryDate',
    'isActive',
    'actions'

  ];

  dataSource =
    new MatTableDataSource<Coupon>();

  coupons:
    Coupon[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(

    private couponService:
      CouponService,

    private router:
      Router,

    private dialog:
      MatDialog,
    private alert: AlertService

  ) { }

  ngOnInit(): void {

    this.getAllCoupons();

  }

  /*
  ============================
  GET ALL COUPONS
  ============================
  */

  getAllCoupons(): void {

    this.couponService
      .getAllCoupons()
      .subscribe({

        next: (response: any) => {

          this.coupons =
            response.data;

          this.dataSource.data =
            response.data;

          this.dataSource.paginator =
            this.paginator;

          this.dataSource.sort =
            this.sort;

        },

        error: (error) => {

          console.error(error);

        }

      });

  }

  /*
  ============================
  SEARCH FILTER
  ============================
  */

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /*
  ============================
  VIEW
  ============================
  */

  viewCoupon(
    coupon: Coupon
  ): void {

    console.log(coupon);

    // dialog open cheyyachu

  }

  /*
  ============================
  EDIT
  ============================
  */

  editCoupon(
    coupon: Coupon
  ): void {

    this.router.navigate([

      '/admin/update-coupon',
      coupon._id

    ]);

  }

  /*
  ============================
  DELETE
  ============================
  */

  deleteCoupon(
    coupon: Coupon
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

          this.couponService
            .deleteCoupon(
              coupon._id!
            )
            .subscribe({

              next: () => {

                this.alert.success('Deleted Successfully');


                this.getAllCoupons();

              },

              error: (
                error
              ) => {

                console.error(
                  error
                );

                Swal.fire({

                  icon: 'error',

                  title: 'Delete Failed',

                  text:
                    error?.error?.message ||
                    'Something went wrong'

                });

              }

            });

        }

      });

  }

}
