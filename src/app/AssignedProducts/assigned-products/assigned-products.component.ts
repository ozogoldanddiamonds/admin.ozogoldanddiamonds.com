import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignProductService } from 'src/app/Services/assign-product.service';
import { ProductService } from 'src/app/Services/product.service';
import { ViewProductComponent } from 'src/app/View-dialog-Controllers/view-product/view-product.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assigned-products',
  templateUrl: './assigned-products.component.html',
  styleUrls: ['./assigned-products.component.css']
})
export class AssignedProductsComponent implements OnInit {

  // =====================================
  // TABLE COLUMNS
  // =====================================
  products: any;
  displayedColumns: string[] = [

    'sno',

    'image',

    'name',

    'category',

    'sku',

    'purity',

    'assignedQuantity',

    'action'

  ];

  // =====================================
  // DATASOURCE
  // =====================================

  dataSource =
    new MatTableDataSource<any>();

  assignedProducts: any[] = [];

  subBranchId!: string;

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

  constructor(

    private route: ActivatedRoute,

    private productService: ProductService,
    private assignProductService: AssignProductService,
    private dialog:
      MatDialog,

  ) { }

  // =====================================
  // ON INIT
  // =====================================

  ngOnInit(): void {

    //   this.subBranchId =

    //     this.route.snapshot.paramMap.get(

    //       'subBranchId'

    //     )!;

    // console.log(this.subBranchId);

    this.getAssignedProducts();

  }



  // =====================================
  // GET ASSIGNED PRODUCTS
  // =====================================

  getAssignedProducts() {

    this.assignProductService

      .getMyAssignedProducts()

      .subscribe({

        next: (res: any) => {
          this.products = res.data;
          this.dataSource.data = res.data;

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }
  viewProduct(element: any): void {

    const product = {
      ...element.productId,
      variants: [element.variant]
    };

    this.dialog.open(ViewProductComponent, {

      width: '1000px',

      maxHeight: '90vh',

      data: product

    });

  }
  // =====================================
  // SEARCH
  // =====================================

  applyFilter(event: Event) {

    const filterValue =

      (event.target as HTMLInputElement)

        .value;

    this.dataSource.filter =

      filterValue

        .trim()

        .toLowerCase();

  }

  // =====================================
  // IMAGE
  // =====================================

  getProductImage(product: any): string {

    return product.images &&

      product.images.length > 0

      ?

      product.images[0]

      :

      'assets/no-image.png';

  }

  // =====================================
  // RETURN PRODUCT
  // =====================================

  returnProduct(product: any) {

    console.log(product);

    // Next Step
    // Return Popup Open Chestham

    Swal.fire(

      'Coming Soon',

      'Return Product Flow',

      'info'

    );

  }

}