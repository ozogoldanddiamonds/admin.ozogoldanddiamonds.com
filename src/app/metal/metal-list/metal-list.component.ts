import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { AdminLoginService } from 'src/app/Services/admin-login.service';
import { AlertService } from 'src/app/Services/alert.service';
import { MetalRateService } from 'src/app/Services/metal-rate.service';

@Component({
  selector: 'app-metal-list',
  templateUrl: './metal-list.component.html',
  styleUrls: ['./metal-list.component.css']
})
export class MetalListComponent implements OnInit {
  role: string = '';
  displayedColumns: string[] = ['sno', 'metalType', 'purity', 'unit', 'ratePerGram', 'effectiveDate', 'isActive', 'actions'];

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  metalRates: any[] = [];

  constructor(private metalRateService: MetalRateService, private router: Router, private dialog:
    MatDialog,
    public authService: AdminLoginService,
    private alert: AlertService) { }
  ngOnInit(): void {

    this.role = localStorage.getItem('role') || '';

    this.getAllMetalRates();
  }

  getAllMetalRates(): void {

    this.metalRateService
      .getAllMetalRates()
      .subscribe({

        next: (response: any) => {

          this.metalRates =
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

  editMetalRate(element: any): void {

    this.router.navigate([

      '/admin/metal-update',

      element._id

    ]);

  }
  deleteMetalRate(data: any): void {

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

          this.metalRateService
            .deleteMetalRate(
              data._id
            )
            .subscribe({

              next: () => {

                this.alert.success('Deleted Successfully');

                this.getAllMetalRates();

              },

              error: () => {

                alert(
                  'Delete failed'
                );

              }

            });

        }

      });

  }
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
