import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchemaService } from 'src/app/Services/schema.service';
import { UserscheemaService } from 'src/app/Services/userscheema.service';
import { ViewUserscheemaComponent } from 'src/app/View-dialog-Controllers/view-userscheema/view-userscheema.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-schema',
  templateUrl: './user-schema.component.html',
  styleUrls: ['./user-schema.component.css']
})
export class UserSchemaComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [

    'sno',

    'user',

    'scheme',

    'schemeAmount',

    

    'nextDueDate',

    'maturityDate',

    'status',

    'createdAt',

    'actions'

  ];

  userSchemeList: any[] = [];

  dataSource =
    new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(

    private userSchemeService: UserscheemaService,

    private dialog: MatDialog,

    private router: Router

  ) { }

  ngOnInit(): void {

    this.getAllUserSchemes();

    this.dataSource.filterPredicate = (

      data: any,

      filter: string

    ) => {

      const search = (

        (data.user?.name || '') +

        ' ' +

        (data.schemeName || '') +

        ' ' +

        (data.status || '')

      ).toLowerCase();

      return search.includes(filter);

    };

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator =
      this.paginator;

  }

  // ==========================
  // Get All
  // ==========================

  getAllUserSchemes() {

    this.userSchemeService
      .getAllUserSchemes()

      .subscribe({

        next: (res: any) => {

          this.userSchemeList =
            res.data;

          this.dataSource.data =
            this.userSchemeList;

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  // ==========================
  // Search
  // ==========================

  applyFilter(event: Event) {

    const value = (

      event.target as HTMLInputElement

    ).value;

    this.dataSource.filter =
      value.trim().toLowerCase();

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

  }

  // ==========================
  // Edit
  // ==========================

  editUserScheme(id: string) {

    this.router.navigate([

      '/admin/user-scheema-update',

      id

    ]);

  }

  // ==========================
  // View
  // ==========================

  viewUserScheme(element: any) {

    this.dialog.open(

      ViewUserscheemaComponent,

      {

        width: '900px',

        data: element

      }

    );

  }

  // ==========================
  // Delete
  // ==========================

  deleteUserScheme(id: string) {

    Swal.fire({

      title: 'Delete User Scheme?',

      text: 'This action cannot be undone.',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Delete',

      cancelButtonText: 'Cancel',

      confirmButtonColor: '#640101'

    }).then((result) => {

      if (!result.isConfirmed) {

        return;

      }

      this.userSchemeService

        .deleteUserScheme(id)

        .subscribe({

          next: (res: any) => {

            Swal.fire({

              icon: 'success',

              title: 'Deleted',

              text: res.message,

              timer: 1500,

              showConfirmButton: false

            });

            this.getAllUserSchemes();

          },

          error: (err: any) => {

            Swal.fire({

              icon: 'error',

              title: 'Error',

              text:

                err.error?.message ||

                'Delete Failed'

            });

          }

        });

    });

  }

  // ==========================
  // Status
  // ==========================

 

}