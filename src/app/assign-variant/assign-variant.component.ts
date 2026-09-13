import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ProductService } from '../Services/product.service';
import { AssignProductService } from '../Services/assign-product.service';

@Component({
  selector: 'app-assign-variant',
  templateUrl: './assign-variant.component.html',
  styleUrls: ['./assign-variant.component.css']
})
export class AssignVariantComponent implements OnInit {

  // ============================
  // PRODUCT
  // ============================

  product: any;

  // ============================
  // SUB BRANCH ID
  // ============================

  subBranchId!: string;

  // ============================
  // VARIANTS
  // ============================

  variants: any[] = [];

  // ============================
  // LOADING
  // ============================

  loading = false;

  constructor(

    @Inject(MAT_DIALOG_DATA)
    public data: any,

    private dialogRef:
      MatDialogRef<AssignVariantComponent>,

    // private productService:
    //   ProductService,
      private assignProductService: AssignProductService

  ) { }

  ngOnInit(): void {

    this.product =
      this.data.product;

    this.subBranchId =
      this.data.subBranchId;

    // Add Assign Quantity field

    this.variants =
      this.product.variants.map(

        (variant: any) => ({

          ...variant,

          assignQty: 0

        })

      );

  }

  // ===================================
  // ASSIGN PRODUCT
  // ===================================

  assignProduct() {

    // Selected Variants

    const selectedVariants =

      this.variants.filter(

        x => Number(x.assignQty) > 0

      );

    if (selectedVariants.length === 0) {

      Swal.fire({

        icon: 'warning',

        title: 'Quantity Required',

        text: 'Please enter assign quantity.'

      });

      return;

    }

    // Validate Stock

    for (let item of selectedVariants) {

      if (Number(item.assignQty) > Number(item.stock)) {

        Swal.fire({

          icon: 'error',

          title: 'Stock Error',

          text:
            `${item.sku} has only ${item.stock} stock.`

        });

        return;

      }

    }

    // Request Body

    const body = {

      subBranchId:
        this.subBranchId,

      productId:
        this.product._id,

      variants:

        selectedVariants.map(

          (item: any) => ({

            variantId:
              item._id,

            quantity:
              Number(item.assignQty)

          })

        )

    };

    this.loading = true;

    this.assignProductService

      .assignProducts(body)

      .subscribe({

        next: (res: any) => {

          this.loading = false;

          Swal.fire({

            icon: 'success',

            title: 'Success',

            text: res.message

          });

          this.dialogRef.close(true);

        },

        error: (err) => {

          this.loading = false;

          Swal.fire({

            icon: 'error',

            title: 'Error',

            text:
              err.error.message

          });

        }

      });

  }

  // ===================================
  // CLOSE POPUP
  // ===================================

  closeDialog() {

    this.dialogRef.close();

  }

}