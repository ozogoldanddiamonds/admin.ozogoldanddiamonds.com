import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignVariantComponent } from 'src/app/assign-variant/assign-variant.component';
import { AssignedProductsComponent } from 'src/app/AssignedProducts/assigned-products/assigned-products.component';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { Product } from 'src/app/models/product';
import { AlertService } from 'src/app/Services/alert.service';
import { ProductService } from 'src/app/Services/product.service';
import { ViewProductComponent } from 'src/app/View-dialog-Controllers/view-product/view-product.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product Management';

  pageSubTitle = 'Manage all products here';

  // =====================================
  // TABLE COLUMNS
  // =====================================

  displayedColumns: string[] = [

    'sno',

    'image',

    'name',

    'category',

    'productType',

    // 'price',

    'status',

    'actions'

  ];
  subBranchId: any;

  // =====================================
  // DATASOURCE
  // =====================================

  dataSource =
    new MatTableDataSource<any>();

  // =====================================
  // PRODUCTS
  // =====================================

  products: any[] = [];

  // =====================================
  // SELECTED PRODUCT
  // =====================================

  selectedProduct: any = null;

  // =====================================
  // PAGINATOR
  // =====================================

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  // =====================================
  // SORT
  // =====================================

  @ViewChild(MatSort)
  sort!: MatSort;


  // =====================================
  // CONSTRUCTOR
  // =====================================

  constructor(

    private productService:
      ProductService,

    private router:
      Router,
    private dialog:
      MatDialog,
    private route: ActivatedRoute,
    private alert: AlertService

  ) { }

  // =====================================
  // ON INIT
  // =====================================

  ngOnInit() {

    this.subBranchId = this.route.snapshot.paramMap.get('subBranchId');

    if (this.subBranchId) {
      this.pageTitle =
        'Assigned Products';

      this.pageSubTitle =
        'Manage products assigned to this Sub Branch';

      this.displayedColumns = [

        'sno',

        'image',

        'name',

        'category',

        'productType',

        'status',

        'actions'

      ];

    }

    this.getProducts();

  }

  assignProduct(product: any) {

    const dialogRef =

      this.dialog.open(

        AssignVariantComponent,

        {

          width: '900px',

          disableClose: true,

          data: {

            product,

            subBranchId: this.subBranchId

          }

        }

      );

    dialogRef.afterClosed()

      .subscribe(result => {

        if (result) {

          this.getProducts();

        }

      });

  }
  // =====================================
  // GET PRODUCTS
  // =====================================

  getProducts(): void {

    this.productService
      .getAllProducts()
      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.products =
            res.data;

          this.dataSource =
            new MatTableDataSource(
              this.products
            );

          this.dataSource.paginator =
            this.paginator;

          this.dataSource.sort =
            this.sort;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // =====================================
  // SEARCH FILTER
  // =====================================

  applyFilter(
    event: Event
  ): void {

    const filterValue =

      (event.target as HTMLInputElement)
        .value;

    this.dataSource.filter =

      filterValue
        .trim()
        .toLowerCase();

  }

  // =====================================
  // VIEW PRODUCT
  // =====================================

  viewProduct(
    product: Product
  ): void {

    this.dialog.open(

      ViewProductComponent,

      {

        width: '1000px',

        maxHeight: '90vh',

        data: product

      }

    );

  }

  // =====================================
  // EDIT PRODUCT
  // =====================================

  editProduct(
    product: any
  ): void {

    this.router.navigate([

      '/admin/edit-product',

      product._id

    ]);

  }
  // =====================================
  // DELETE PRODUCT
  // =====================================

  deleteProduct(
    product: any
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

        // IF DELETE CONFIRMED

        if (result) {

          this.productService
            .deleteProduct(
              product._id
            )
            .subscribe({

              // SUCCESS

              next: () => {

                this.alert.success('Product Deleted Successfully');

                this.getProducts();

              },

              // ERROR

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
  // =====================================
  // GET PRODUCT IMAGE
  // =====================================

  getProductImage(
    product: any
  ): string {

    return product.images &&
      product.images.length > 0

      ? product.images[0]

      : 'assets/no-image.png';

  }


  // =====================================
  // GET VIDEO URL
  // =====================================

  getVideoUrl(
    product: any
  ): string {

    return product.video
      ? product.video
      : '';

  }

  // =====================================
  // CHECK CERTIFICATE
  // =====================================

  hasCertificate(
    diamond: any
  ): boolean {

    return !!diamond.certificateUrl;

  }

  // =====================================
  // GET CERTIFICATE URL
  // =====================================

  getCertificateUrl(
    diamond: any
  ): string {

    return diamond.certificateUrl
      ? diamond.certificateUrl
      : '';

  }

  // =====================================
  // CHECK IMAGE CERTIFICATE
  // =====================================

  isCertificateImage(
    url: string
  ): boolean {

    return (

      url.includes('.jpg')

      ||

      url.includes('.jpeg')

      ||

      url.includes('.png')

      ||

      url.includes('image')

    );

  }

  // =====================================
  // CHECK PDF CERTIFICATE
  // =====================================

  isCertificatePdf(
    url: string
  ): boolean {

    return url.includes('.pdf');

  }
  //   changeStatus(element: any): void {

  //   const newStatus = !element.isActive;

  //   Swal.fire({
  //     title: newStatus ? 'Activate Product?' : 'Deactivate Product?',
  //     text: `Are you sure you want to ${newStatus ? 'activate' : 'deactivate'} this product?`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#640101',
  //     cancelButtonColor: '#6c757d',
  //     confirmButtonText: 'Yes',
  //     cancelButtonText: 'Cancel'
  //   }).then((result) => {

  //     if (result.isConfirmed) {

  //       this.productService.updateProductStatus(element._id, newStatus)
  //         .subscribe({

  //           next: (res) => {

  //             // Update UI without reloading
  //             element.isActive = newStatus;

  //             Swal.fire({
  //               icon: 'success',
  //               title: 'Success',
  //               text: res.message,
  //               timer: 1500,
  //               showConfirmButton: false
  //             });

  //           },

  //           error: (err) => {

  //             Swal.fire({
  //               icon: 'error',
  //               title: 'Error',
  //               text: err.error?.message || 'Something went wrong'
  //             });

  //           }

  //         });

  //     }

  //   });

  // }


  changeStatus(product: any): void {

    Swal.fire({
      title: 'Change Product Status',

      input: 'radio',

      inputOptions: {
        active: 'Active',
        inactive: 'Inactive'
      },

      inputValue: product.isActive ? 'active' : 'inactive',

      showCancelButton: true,

      confirmButtonText: 'Update',

      cancelButtonText: 'Cancel',

      confirmButtonColor: '#640101',

      cancelButtonColor: '#6c757d',

      inputValidator: (value) => {
        if (!value) {
          return 'Please select status';
        }
        return null;
      }

    }).then((result) => {

      if (!result.isConfirmed) {
        return;
      }

      const status = result.value === 'active';

      this.productService
        .updateProductStatus(product._id, status)
        .subscribe({

          next: (res) => {

            product.isActive = status;

            // Refresh table if using MatTableDataSource
            this.dataSource.data = [...this.dataSource.data];

            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: res.message,
              timer: 1500,
              showConfirmButton: false
            });

          },

          error: (err) => {

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