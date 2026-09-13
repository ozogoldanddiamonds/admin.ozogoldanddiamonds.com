import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SchemaService } from 'src/app/Services/schema.service';
import { ViewScheemaComponent } from 'src/app/View-dialog-Controllers/view-scheema/view-scheema.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-schema',
  templateUrl: './list-schema.component.html',
  styleUrls: ['./list-schema.component.css']
})
export class ListSchemaComponent implements OnInit {

  displayedColumns: string[] = [
    'sno',
    'name',
    'amount',
    'monthlyAmount',
    'durationMonths',
    'userPayMonths',
    'companyPayMonths',
    'status',
    'createdAt',
    'action'
  ];

  schemeList: any[] = [];

  dataSource = new MatTableDataSource<any>();

  searchText: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private schemeService: SchemaService,
    private router: Router,
     private dialog:
        MatDialog,
  ) { }

  ngOnInit(): void {

    this.getAllSchemes();

  }

  getAllSchemes() {

    this.schemeService.getAllSchemes().subscribe({

      next: (res: any) => {

        if (res.success) {

          this.schemeList = res.data;

          this.dataSource = new MatTableDataSource(this.schemeList);

          this.dataSource.paginator = this.paginator;

        }

      },

      error: (err) => {

        console.log(err);

      }

    });

  }


  applyFilter() {

    this.dataSource.filter = this.searchText.trim().toLowerCase();

  }
viewScheme(element: any): void {

  this.dialog.open(ViewScheemaComponent, {

    width: '800px',

    disableClose: true,

    data: element

  });

}


  editScheme(id:string){

   this.router.navigate(['/admin/edit-scheme',id]);

}


  deleteScheme(id: string) {

    if (confirm("Are you sure you want to delete this scheme?")) {

      this.schemeService.deleteScheme(id).subscribe({

        next: (res: any) => {

          alert(res.message);

          this.getAllSchemes();

        },

        error: (err) => {

          console.log(err);

        }

      });

    }

  }


  changeStatus(scheme: any): void {
 
   Swal.fire({
 
     title: 'Change Scheme Status',
 
     input: 'radio',
 
     inputOptions: {
 
       active: 'Active',
 
       inactive: 'Inactive'
 
     },
 
     inputValue: scheme.isActive ? 'active' : 'inactive',
 
     showCancelButton: true,
 
     confirmButtonText: 'Update',
 
     cancelButtonText: 'Cancel',
 
     confirmButtonColor: '#640101',
 
     cancelButtonColor: '#6c757d',
 
     inputValidator: (value: any) => {
 
       if (!value) {
 
         return 'Please select status';
 
       }
 
       return null;
 
     }
 
   }).then((result: any) => {
 
     if (!result.isConfirmed) {
 
       return;
 
     }
 
     const status = result.value === 'active';
 
     this.schemeService.updateSchemeStatus(
 
       scheme._id,
 
       status
 
     ).subscribe({
 
       next: (res: any) => {
 
         scheme.isActive = status;
 
         this.dataSource.data = [...this.dataSource.data];
 
         Swal.fire({
 
           icon: 'success',
 
           title: 'Success',
 
           text: res.message,
 
           timer: 1500,
 
           showConfirmButton: false
 
         });
 
       },
 
       error: (err: any) => {
 
         Swal.fire({
 
           icon: 'error',
 
           title: 'Error',
 
           text: err.error?.message || 'Something went wrong'
 
         });
 
       }
 
     });
 
   });
 
 }

}