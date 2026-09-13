import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { AdminLoginService } from 'src/app/Services/admin-login.service';
import { AlertService } from 'src/app/Services/alert.service';
import { StonesRateService } from 'src/app/Services/stones-rate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stones-list',
  templateUrl: './stones-list.component.html',
  styleUrls: ['./stones-list.component.css']
})
export class StonesListComponent implements OnInit {
   role: string = '';

  displayedColumns: string[] = [

    'sno',

    'stoneType',

    'stoneCategory',

    'quality',

    'unit',

    'ratePerUnit',

    'isActive',

    'actions'

  ];

  dataSource =
    new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  stoneRates: any[] = [];

  constructor(

    private stoneRateService:
      StonesRateService,

    private router:
      Router,

    private dialog:
      MatDialog,
        private alert: AlertService,
          public authService: AdminLoginService

  ) { }

 ngOnInit(): void {

  this.role = localStorage.getItem('role') || '';

  if (this.role === 'BRANCH') {

    this.displayedColumns = [
      'sno',
      'stoneType',
      'stoneCategory',
      'quality',
      'unit',
      'ratePerUnit',
      'isActive',
      'actions'
    ];

  } else {

    this.displayedColumns = [
      'sno',
      'stoneType',
      'stoneCategory',
      'quality',
      'unit',
      'ratePerUnit',
      'isActive'
    ];

  }

  this.getAllStoneRates();
}
  hasAccess(): boolean {
  return ['BRANCH', 'SUB_BRANCH'].includes(this.role);
}


  // =========================
  // GET ALL STONE RATES
  // =========================

  getAllStoneRates(): void {

    this.stoneRateService
      .getAllStoneRates()
      .subscribe({

        next: (
          response: any
        ) => {

          this.stoneRates =
            response.data;

          this.dataSource.data =
            response.data;

          this.dataSource.paginator =
            this.paginator;

          this.dataSource.sort =
            this.sort;

        },

        error: (
          error
        ) => {

          console.error(
            error
          );

        }

      });

  }

  // =========================
  // EDIT
  // =========================

  editStoneRate(
    element: any
  ): void {

    this.router.navigate([

      '/admin/stones-update',

      element._id

    ]);

  }

  // =========================
  // DELETE
  // =========================

  deleteStoneRate(
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

          this.stoneRateService
            .deleteStoneRate(
              data._id
            )
            .subscribe({

              next: () => {

               this.alert.success('Deleted Successfully');

                this.getAllStoneRates();

              },

              error: (error) => {

                Swal.fire({

                  icon: 'error',

                  title: 'Oops...',

                  text:
                    error?.error?.message ||
                    'Deleted Failed'

                });

              }

            });

        }

      });

  }

  // =========================
  // SEARCH
  // =========================

  applyFilter(event: Event): void {

    const filterValue =
      (event.target as HTMLInputElement)
        .value;

    this.dataSource.filter =
      filterValue
        .trim()
        .toLowerCase();

  }
}
