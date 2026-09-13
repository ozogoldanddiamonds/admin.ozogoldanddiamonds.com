import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { GoldRate } from 'src/app/models/goldRate';
import { GoldRateService } from 'src/app/Services/gold-rate.service';
import { ViewGoldRateComponent } from 'src/app/View-dialog-Controllers/view-gold-rate/view-gold-rate.component';
import { MatFormFieldModule } from "@angular/material/form-field";


@Component({
  selector: 'app-gold-list',
  templateUrl: './gold-list.component.html',
  styleUrls: ['./gold-list.component.css'],
})
export class GoldListComponent implements OnInit {

  displayedColumns:
    string[] = [
      'sno',
      'ratePerGram',
      'updatedBy',
      'createdAt',
      'actions'
    ];

  dataSource =
    new MatTableDataSource<GoldRate>();

  goldRates:
    GoldRate[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private goldRateService:
      GoldRateService,

    private router:
      Router,

    private dialog:
      MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllGoldRates();
  }

  /*
  GET ALL GOLD RATES
  */
  getAllGoldRates(): void {
    this.goldRateService
      .getAllGoldRates()
      .subscribe({
        next: (
          response: any
        ) => {

          this.goldRates =
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

  /*
  EDIT
  */
  editGoldRate(element: any) {
    this.router.navigate([
      '/admin/Gold-update',
      element._id
    ]);
  }

  /*
  VIEW
  */
  viewGoldRate(
    goldRate: GoldRate
  ): void {

    this.dialog.open(
      ViewGoldRateComponent,
      {
        width: '500px',
        data: goldRate
      }
    );
  }

  /*
  DELETE
  */
  deleteGoldRate(
    data: any
  ) {

    const dialogRef =
      this.dialog.open(
        DeleteConfirmationComponent,
        {
          width: '400px'
        }
      );

    dialogRef
      .afterClosed()
      .subscribe(
        result => {

          if (result) {

            this.goldRateService
              .deleteGoldRate(
                data._id
              )
              .subscribe({

                next: () => {
                  alert(
                    "Deleted successfully"
                  );

                  this.getAllGoldRates();
                },

                error: () => {
                  alert(
                    "Delete failed"
                  );
                }

              });
          }
        });
  }

  /*
  SEARCH
  */
  // Search Filter
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
