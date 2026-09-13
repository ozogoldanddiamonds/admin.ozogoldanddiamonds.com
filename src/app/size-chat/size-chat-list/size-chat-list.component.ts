import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { SizeChart } from 'src/app/models/size-chart';
import { SizeChatService } from 'src/app/Services/size-chat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-size-chat-list',
  templateUrl: './size-chat-list.component.html',
  styleUrls: ['./size-chat-list.component.css']
})
export class SizeChatListComponent implements OnInit {

  displayedColumns: string[] = [
    'sno',
    'title',
    'subCategory',
    'image',
    'isActive',
    'actions'
  ];

  dataSource = new MatTableDataSource<SizeChart>();

  sizeCharts: SizeChart[] = [];

  selectedSizeChart: SizeChart | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private sizeChartService: SizeChatService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllSizeCharts();
  }

  //==========================
  // Get All Size Charts
  //==========================

  getAllSizeCharts(): void {

    this.sizeChartService.getAllSizeCharts().subscribe({

      next: (response: any) => {

        console.log(response);

        this.sizeCharts = response.data;

        this.dataSource.data = response.data;

        this.dataSource.paginator = this.paginator;

        this.dataSource.sort = this.sort;

      },

      error: (error) => {

        console.log(error);

      }

    });

  }

  //==========================
  // Edit
  //==========================

  editSizeChart(element: any) {

    this.router.navigate([
      '/admin/update-size-chart',
      element._id
    ]);

  }

  //==========================
  // View
  //==========================

  viewSizeChart(sizeChart: SizeChart): void {

    // this.dialog.open(
    //   ViewSizeChartComponent,
    //   {
    //     width: '500px',
    //     data: sizeChart
    //   }
    // );

  }

  //==========================
  // Delete
  //==========================

  deleteSizeChart(data: any): void {

    const dialogRef = this.dialog.open(
      DeleteConfirmationComponent,
      {
        width: '400px'
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      if (result) {

        this.sizeChartService.deleteSizeChart(data._id)
          .subscribe({

            next: () => {

              Swal.fire({

                icon: 'success',

                title: 'Deleted',

                text: 'Size Chart Deleted Successfully',

                timer: 2500,

                showConfirmButton: false

              });

              this.getAllSizeCharts();

            },

            error: () => {

              Swal.fire({

                icon: 'error',

                title: 'Oops...',

                text: 'Delete Failed',

                timer: 2500,

                showConfirmButton: false

              });

            }

          });

      }

    });

  }

  //==========================
  // Search
  //==========================

  applyFilter(event: Event): void {

    const filterValue =
      (event.target as HTMLInputElement).value;

    this.dataSource.filter =
      filterValue.trim().toLowerCase();

  }

}