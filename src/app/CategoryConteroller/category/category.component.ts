import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../Services/category.service';
import { Category } from 'src/app/models/category';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { ViewCategoryComponent } from 'src/app/View-dialog-Controllers/view-category/view-category.component';
import Swal from 'sweetalert2';
import { AlertService } from 'src/app/Services/alert.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  role: string = '';

  displayedColumns: string[] = ['sno', 'name', 'image', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<Category>();

  categories: Category[] = [];
  selectedCategory: Category | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoryService: CategoryService, private router: Router, private dialog: MatDialog, private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.role = localStorage.getItem('role') || '';
  }

  // Controller method
  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        console.log('API Response:', response);

        this.categories = response.data;
        this.dataSource.data = response.data;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  goToCreateCategory() {
    this.router.navigate([
      '/create-category'
    ]);
  }

  editCategory(element: any) {
    this.router.navigate([
      '/admin/update-category',
      element._id
    ]);
  }
  viewCategory(
    category: Category
  ): void {

    this.dialog.open(
      ViewCategoryComponent,
      {
        width: '500px',
        data: category
      }
    );
  }

  deleteCategory(
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
      .subscribe((result) => {

        if (result) {

          this.categoryService
            .deleteCategory(
              data._id
            )
            .subscribe({

              next: () => {

                Swal.fire({

                  icon: 'success',

                  title: 'Deleted',

                  text: 'Deleted Successfully',

                  timer: 2500,

                  timerProgressBar: true,

                  showConfirmButton: false,

                  customClass: {
                    popup: 'success-popup'
                  }

                });

                this.getAllCategories();

              },

              error: () => {

                Swal.fire({

                  icon: 'error',

                  title: 'Oops...',

                  text: 'Delete Failed',

                  timer: 2500,

                  timerProgressBar: true,

                  showConfirmButton: false,

                  customClass: {
                    popup: 'error-popup'
                  }

                });

              }

            });

        }

      });

  }
  // Search Filter
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}