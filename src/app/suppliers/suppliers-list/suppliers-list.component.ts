import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { AdminLoginService } from 'src/app/Services/admin-login.service';
import { AlertService } from 'src/app/Services/alert.service';
import { SupplierService } from 'src/app/Services/supplier.service';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.css']
})
export class SuppliersListComponent implements OnInit {

  role: string = '';

  displayedColumns: string[] = [
    'sno',
    'name',
    'companyName',
    'phone',
    'email',
    'gstNumber',
    'isActive',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  suppliers: any[] = [];


  constructor(
    private supplierService: SupplierService,
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

    this.getAllSuppliers();

  }


  // =========================
  // GET ALL SUPPLIERS
  // =========================

  getAllSuppliers(): void {

    this.supplierService
      .getAllSuppliers()
      .subscribe({

        next: (response: any) => {

          this.suppliers =
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

  viewSupplier(element: any): void {

    this.router.navigate(
      [
        '/admin/update-supplier',
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
  // EDIT SUPPLIER
  // =========================

  editSupplier(element: any): void {

    this.router.navigate([
      '/admin/update-supplier',
      element._id
    ]);

  }


  // =========================
  // DELETE SUPPLIER
  // =========================
  deleteSupplier(data: any) { }
  // deleteSupplier(data: any): void {

  //   const dialogRef =
  //     this.dialog.open(

  //       DeleteConfirmationComponent,

  //       {

  //         width: '400px'

  //       }

  //     );


  //   dialogRef
  //     .afterClosed()
  //     .subscribe(result => {

  //       if (result) {

  //         this.supplierService.deleteSupplier(
  //             data._id
  //           )
  //           .subscribe({

  //             next: () => {

  //               this.alert.success(
  //                 'Deleted Successfully'
  //               );

  //               this.getAllSuppliers();

  //             },

  //             error: (error) => {

  //               console.error(error);

  //               alert(
  //                 'Delete failed'
  //               );

  //             }

  //           });

  //       }

  //     });

  // }


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
