import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { AdminLoginService } from 'src/app/Services/admin-login.service';
import { ViewBranchComponent } from 'src/app/View-dialog-Controllers/view-branch/view-branch.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-branch-list',
  templateUrl: './sub-branch-list.component.html',
  styleUrls: ['./sub-branch-list.component.css']
})
export class SubBranchListComponent implements OnInit {

  displayedColumns: string[] = [

    'sno',

    'name',
    //  'branchId',

    'email',

    'contactNumber',

    'location',

    'status',
   
'assign',
    'actions'

  ];

  dataSource =
    new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(

    private adminService: AdminLoginService,
     private dialog: MatDialog,
      private route:ActivatedRoute,

    private router: Router

  ) { }

  ngOnInit(): void {

    this.getAllSubBranches();

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;

    this.dataSource.sort =
      this.sort;

  }

  // =========================
  // GET ALL SUB BRANCHES
  // =========================

  getAllSubBranches() {

    this.adminService
      .getAllSubBranches()
      .subscribe({

        next: (res: any) => {

          this.dataSource.data =
            res.data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // =========================
  // SEARCH
  // =========================

  applyFilter(event: Event) {

    const filterValue =

      (event.target as HTMLInputElement)
        .value;

    this.dataSource.filter =

      filterValue
        .trim()
        .toLowerCase();

  }

  // =========================
  // VIEW
  // =========================

  viewSubBranch( employee: any
  ): void {
  
    this.dialog.open(
  
      ViewBranchComponent,
  
      {
  
      width: '800px',
  
      maxHeight: '90vh',
  
      data: employee,
  
      disableClose: true
  
    }
  
    );
  
  }

  // =========================
  // EDIT
  // =========================

  editSubBranch(element: any) {

    this.router.navigate([

      '/admin/update-subbranch',

      element._id

    ]);

  }
 assignProducts(element:any){

console.log(element);

this.router.navigate([
  '/admin/product',
  element._id
]);

}

  // =========================
  // DELETE
  // =========================

deleteSubBranch(
  data: any
) {

  const dialogRef =
    this.dialog.open(
      DeleteConfirmationComponent,
      {
        width: '400px'
      }
    );

  dialogRef.afterClosed()
    .subscribe(result => {

      if (result === true) {

        this.adminService
          .deleteSubBranch(
            data._id
          )
          .subscribe({

            next: () => {

              Swal.fire({

                icon: 'success',

                title: 'Deleted',

                text:
                  'Sub Branch Deleted Successfully'

              });

              this.getAllSubBranches();

            },

            error: (err) => {

              Swal.fire({

                icon: 'error',

                title: 'Error',

                text:
                  err?.error?.message ||
                  'Delete Failed'

              });

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

      this.adminService
        .updateSubBranchStatus(

          element._id,

          result.value

        )
        
        .subscribe({

          next: () => {

            element.status =
              result.value;

            Swal.fire(

              'Success',

              'Status Updated',

              'success'

            );

          }

        });

    }

  });

}

}
