import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { ViewEmployeeComponent } from 'src/app/View-dialog-Controllers/view-employee/view-employee.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = [
    'sno',
    'photo',
    'name',
    'contactNumber',
    'role',
    'subBranch',
    'location',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {

    this.employeeService
      .getAllEmployees()
      .subscribe({

        next: (res: any) => {

          this.dataSource.data = res.data;

          this.dataSource.paginator = this.paginator;

        },

        error: (err: any) => {

          console.log(err);

          this.alert.error(
            err?.error?.message || 'Failed To Load Employees'
          );

        }

      });

  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  editEmployee(element: any) {

    this.router.navigate([
      '/admin/employee-update',
      element._id
    ]);

  }

  viewemployee(employee: any): void {

    this.dialog.open(ViewEmployeeComponent, {

      width: '800px',

      maxHeight: '90vh',

      data: employee,

      disableClose: true

    });

  }

  deleteEmployee(element: any) {

    Swal.fire({

      title: 'Delete Employee?',

      text: 'You cannot undo this action.',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Delete',

      confirmButtonColor: '#640101',

      cancelButtonColor: '#6c757d'

    }).then((result) => {

      if (result.isConfirmed) {

        this.employeeService
          .deleteEmployee(element._id)
          .subscribe({

            next: () => {

              this.alert.success('Employee Deleted Successfully');

              this.getAllEmployees();

            },

            error: (err: any) => {

              console.log(err);

              this.alert.error(
                err?.error?.message || 'Delete Failed'
              );

            }

          });

      }

    });

  }

  changeStatus(element: any) {

    Swal.fire({

      title: 'Change Status',

      input: 'radio',

      inputOptions: {

        ACTIVE: 'Active',

        INACTIVE: 'Inactive'

      },

      inputValue: element.status,

      showCancelButton: true,

      confirmButtonColor: '#640101',

      cancelButtonColor: '#6c757d'

    }).then((result) => {

      if (result.isConfirmed) {

        // API unte ikkada call cheyyi
        // this.employeeService.updateStatus(element._id, result.value).subscribe(...)

        element.status = result.value;

        this.alert.success('Status Updated Successfully');

      }

    });

  }

}