import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { OrderService } from 'src/app/Services/order.service';
import { ProductService } from 'src/app/Services/product.service';
import { ViewOrderItemComponent } from 'src/app/View-dialog-Controllers/view-order-item/view-order-item.component';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {
  selectedProduct: any = null;
  allVariants: any[] = [];
  filteredVariants: any[] = [];

  selectedVariant: any = null;

  orderForm!: FormGroup;

  products: any[] = [];
  orderSummary: any = {};

  variants: any[] = [];

  cartItems: any[] = [];

  subTotal = 0;

  discount = 0;

  gst = 0;

  grandTotal = 0;

  constructor(

    private fb: FormBuilder,

    private productService: ProductService,

    private orderService: OrderService,
    public router: Router,

    private dialog: MatDialog,
    private alert: AlertService

  ) { }

  ngOnInit(): void {

    this.orderForm = this.fb.group({

      customerName: ['', Validators.required],

      customerPhone: ['', Validators.required],

      customerEmail: [''],

      // product: ['', Validators.required],

      variant: ['', Validators.required],

      quantity: [1, Validators.required],

      paymentMethod: ['CASH', Validators.required],

      notes: ['']

    });

    this.getProducts();

  }

  // ===========================
  // GET PRODUCTS
  // ===========================

  getProducts() {

    this.productService.getAllProducts().subscribe({

      next: (res: any) => {

        this.products = res.data;

        this.allVariants = [];

        this.products.forEach((product: any) => {

          product.variants.forEach((variant: any) => {

            this.allVariants.push({

              ...structuredClone(variant),

              product: structuredClone(product)

            });

          });

        });

      }

    });

  }
  loadAllSkus() {

    this.filteredVariants = [...this.allVariants];

  }
  onVariantChange() {

    const variantId = this.orderForm.value.variant;

    const selected = this.allVariants.find(
      (x: any) => x._id == variantId
    );

    if (!selected) return;

    this.selectedVariant = selected;

    this.selectedProduct = selected.product;
    console.log(this.selectedVariant); // 👈 check here

  }
  // getProducts() {

  //   this.productService.getAllProducts().subscribe({

  //     next: (res: any) => {


  //       this.products = res.data;

  //     }

  //   });

  // }

  // ===========================
  // GET VARIANTS
  // ===========================

  getVariants() {

    const productId = this.orderForm.value.product;

    this.selectedProduct = this.products.find(
      (x: any) => x._id === productId
    );

    if (this.selectedProduct) {

      this.variants = this.selectedProduct.variants;

      this.selectedVariant = null;

      this.orderForm.patchValue({
        variant: ""
      });

    }

  }
  getVariantDetails() {

    const variantId = this.orderForm.value.variant;

    this.selectedVariant = this.variants.find(
      (x: any) => x._id === variantId
    );

  }

  // ===========================
  // ADD ITEM
  // ===========================

  addItem() {
    const product = this.selectedProduct;

    const variant = this.selectedVariant;

    // const product = this.products.find(
    //   (x: any) => x._id == this.orderForm.value.product
    // );

    // const variant = this.variants.find(
    //   (x: any) => x._id == this.orderForm.value.variant
    // );

    if (!product || !variant) {
      return;
    }

    const qty = this.orderForm.value.quantity;

    this.orderService.calculatePrice({

      product: product._id,

      variant: variant._id,

      quantity: qty

    }).subscribe({

      next: (res: any) => {

        this.cartItems.push({

          product: product._id,
          variant: variant._id,
          productDetails: structuredClone(product),

          variantDetails: structuredClone(variant),
          // productDetails: product,      // 👈 Complete Product
          // variantDetails: variant,      // 👈 Complete Variant

          productName: product.name,
          variantName: variant.sku,

          image: product.images?.[0],

          quantity: qty,

          metalValue: res.data.goldValue,
          makingCharge: res.data.makingCharge,
          gstAmount: res.data.gstAmount,

          unitPrice: res.data.unitPrice,
          totalPrice: res.data.totalPrice

        });

        this.calculateTotal();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  // ===========================
  // REMOVE ITEM
  // ===========================

  removeItem(index: number) {

    this.cartItems.splice(index, 1);

    this.calculateTotal();

  }

  // ===========================
  // TOTAL
  // ===========================

  calculateTotal() {

    this.subTotal = 0;

    this.cartItems.forEach((item: any) => {

      this.subTotal += Number(item.totalPrice);

    });

    // Discount
    this.discount = 0;

    // GST (3%)
    this.gst = this.subTotal * 0.03;

    // Grand Total = SubTotal - Discount + GST
    this.grandTotal = this.subTotal - this.discount + this.gst;

  }

  // ===========================
  // CREATE ORDER
  // ===========================

  createOrder() {
    const role = localStorage.getItem('role');
    const adminId = localStorage.getItem('adminId');


    const body = {
      orderSource: role,

      branch: role === 'BRANCH'
        ? adminId
        : localStorage.getItem('branchId'),

      subBranch: role === 'SUB_BRANCH'
        ? adminId
        : null,

      createdBy: adminId,


      customerDetails: {

        name: this.orderForm.value.customerName,

        phone: this.orderForm.value.customerPhone,

        email: this.orderForm.value.customerEmail

      },

      paymentMethod:

        this.orderForm.value.paymentMethod,

      items: this.cartItems,

      notes: this.orderForm.value.notes

    };

    this.orderService.createOrder(body)

      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.orderSummary = res.data;

          this.cartItems = res.data.items;

          this.subTotal = res.data.subTotal;

          this.discount = res.data.discountAmount;

          this.gst = res.data.gstAmount;

          this.grandTotal = res.data.totalAmount;

          this.alert.success("Order Created Successfully");
          // Optional: Reset Form
          this.orderForm.reset({
            paymentMethod: 'CASH',
            quantity: 1
          });

          this.cartItems = [];
          this.variants = [];
          this.selectedProduct = null;
          this.selectedVariant = null;

          this.calculateTotal();

          // Optional Navigation
          // this.router.navigate(['/admin/orders']);

        },

        error: (err: any) => {

          console.log(err);

          this.alert.error(

            err?.error?.message ||

            "Failed To Create Order"

          );

        }

      });
  }
  goBack() {
    this.router.navigate(['/admin/order-list']);
  }
  // search sku
  onSearch(event: any) {

    const term = event.term?.trim().toLowerCase();

    if (!term) {

      // Search empty ayithe anni SKUs chupinchu
      this.filteredVariants = [...this.allVariants];
      return;

    }

    this.filteredVariants = this.allVariants.filter((x: any) =>
      x.sku.toLowerCase().includes(term)
    );

  }
  viewItem(item: any) {

    this.dialog.open(ViewOrderItemComponent, {

      width: '700px',

      data: item,

      disableClose: true

    });

  }

}