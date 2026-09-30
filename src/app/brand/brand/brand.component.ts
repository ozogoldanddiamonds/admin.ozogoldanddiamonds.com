import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Brand } from 'src/app/Models/brand';
import { BrandService } from 'src/app/Services/brand.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit, AfterViewInit {
  selectedBrand: Brand | null = null;

  displayedColumns: string[] = [
    'sno',
    'name',
    'code',
    'logo',
    'description',
    'isActive',
    'actions'
  ];

  dataSource = new MatTableDataSource<Brand>([]);

  role: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private brandService: BrandService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.role = localStorage.getItem('role') || '';

    this.getAllBrands();

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  // ============================
  // GET ALL BRANDS
  // ============================

  getAllBrands(): void {

    this.brandService.getAllBrands().subscribe({

      next: (res) => {

        console.log('Brand Response:', res);

        if (res && res.success) {

          this.dataSource.data = res.data || [];

          // Re-assign paginator & sort
          setTimeout(() => {

            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;

          });

        } else {

          this.dataSource.data = [];

        }

      },

      error: (err) => {

        console.error('Get brands error:', err);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load brands'
        });

      }

    });

  }


  // ============================
  // SEARCH
  // ============================

  applyFilter(event: Event): void {

    const filterValue = (
      event.target as HTMLInputElement
    ).value;

    this.dataSource.filter = filterValue
      .trim()
      .toLowerCase();

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

  }


  // ============================
  // VIEW BRAND
  // ============================

viewBrand(element: Brand): void {

  // Selected brand details
  this.selectedBrand = element;

  // Wait for Angular to render details section
  setTimeout(() => {

    const detailsSection =
      document.getElementById('brandDetails');

    if (detailsSection) {

      detailsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

    }

  }, 100);

}


  // ============================
  // EDIT BRAND
  // ============================

  editBrand(element: Brand): void {

    console.log('Edit Brand:', element);

    this.router.navigate([
      '/admin/update-brand',
      element._id
    ]);

  }


  // ============================
  // DELETE BRAND
  // ============================

  deleteBrand(element: Brand): void {

  if (!element._id) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Brand ID not found'
    });
    return;
  }

  Swal.fire({
    title: 'Are you sure?',
    text: `Do you want to delete ${element.name}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Delete',
    cancelButtonText: 'Cancel'
  }).then((result) => {

    if (result.isConfirmed) {

      this.brandService.deleteBrand(element._id!).subscribe({

        next: (res) => {

          if (res && res.success) {

            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Brand deleted successfully',
              timer: 1500,
              showConfirmButton: false
            });

            this.getAllBrands();

          } else {

            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res?.message || 'Failed to delete brand'
            });

          }

        },

        error: (err) => {

          console.error('Delete brand error:', err);

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err?.error?.message || 'Failed to delete brand'
          });

        }

      });

    }

  });

}
closeBrandDetails(): void {

  this.selectedBrand = null;

}

}
