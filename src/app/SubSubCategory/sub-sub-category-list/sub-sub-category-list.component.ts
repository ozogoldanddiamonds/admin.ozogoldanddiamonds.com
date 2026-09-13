import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { SubsubcategoryService } from 'src/app/Services/subsubcategory.service';
import { MatSelectModule } from "@angular/material/select";
import { ViewSubSubCategoryComponent } from 'src/app/View-dialog-Controllers/view-sub-sub-category/view-sub-sub-category.component';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-sub-sub-category-list',
  templateUrl: './sub-sub-category-list.component.html',
  styleUrls: ['./sub-sub-category-list.component.css'],
})
export class SubSubCategoryListComponent implements OnInit {
  role: string = '';
  displayedColumns: string[] = [
    'sno',
    'name',
    'category',
    'subCategory',
    'image',
    'isActive',
    'actions'
  ];

  dataSource =
    new MatTableDataSource<any>();

  selectedSubSubCategory:
    any = null;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private subSubCategoryService:
      SubsubcategoryService,
    private router: Router,
    private dialog: MatDialog,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getAllSubSubCategories();
    this.role = localStorage.getItem('role') || '';
  }

  /*
  GET ALL
  */
  getAllSubSubCategories() {
    this.subSubCategoryService
      .getAllSubSubCategories()
      .subscribe({
        next: (response: any) => {

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
  EDIT
  */
  editSubSubCategory(
    element: any
  ) {
    this.router.navigate([
      '/admin/update-subsubcategory',
      element._id
    ]);
  }

  viewSubSubCategory(
    subSubCategory: any
  ): void {

    this.dialog.open(
      ViewSubSubCategoryComponent,
      {
        width: '500px',
        data: subSubCategory
      }
    );
  }

  /*
  DELETE
  */
  deleteSubSubCategory(
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

          this.subSubCategoryService
            .deleteSubSubCategory(data._id)
            .subscribe({

              next: () => {

                this.alert.success('Deleted Successfully');

                this.getAllSubSubCategories();

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

  /*
  SEARCH
  */
  applyFilter(
    event: Event
  ) {
    const filterValue =
      (event.target as HTMLInputElement)
        .value;

    this.dataSource.filter =
      filterValue
        .trim()
        .toLowerCase();
  }

}
