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
  styleUrls: ['./create-order.component.css'],
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

  // Order processing
  isSubmitting = false;

  // Invoice
  invoicePdfUrl: string | null = null;

  // WhatsApp status
  whatsappInvoiceStatus: string | null = null;
  whatsappInvoiceError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private orderService: OrderService,
    public router: Router,
    private dialog: MatDialog,
    private alert: AlertService,
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required],

      customerPhone: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],

      customerEmail: ['', Validators.email],

      variant: ['', Validators.required],

      quantity: [1, [Validators.required, Validators.min(1)]],

      paymentMethod: ['CASH', Validators.required],

      notes: [''],
    });

    this.getProducts();
  }

  // ===========================
  // GET PRODUCTS
  // ===========================

  getProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res.data || [];

        this.allVariants = [];

        this.products.forEach((product: any) => {
          (product.variants || []).forEach((variant: any) => {
            this.allVariants.push({
              ...structuredClone(variant),

              product: structuredClone(product),
            });
          });
        });
      },

      error: (err: any) => {
        console.error('Get Products Error:', err);

        this.alert.error('Unable to load products');
      },
    });
  }

  // ===========================
  // LOAD ALL SKUS
  // ===========================

  loadAllSkus(): void {
    this.filteredVariants = [...this.allVariants];
  }

  // ===========================
  // VARIANT CHANGE
  // ===========================

  onVariantChange(): void {
    const variantId = this.orderForm.value.variant;

    const selected = this.allVariants.find((x: any) => x._id === variantId);

    if (!selected) {
      this.selectedProduct = null;
      this.selectedVariant = null;

      return;
    }

    this.selectedVariant = selected;

    this.selectedProduct = selected.product;
  }

  // ===========================
  // ADD ITEM
  // ===========================

  addItem(): void {
    const product = this.selectedProduct;
    const variant = this.selectedVariant;

    if (!product || !variant) {
      this.alert.error('Please select a product and variant');

      return;
    }

    const qty = Number(this.orderForm.value.quantity);

    if (!Number.isInteger(qty) || qty < 1) {
      this.alert.error('Please enter a valid quantity');

      return;
    }

    this.orderService
      .calculatePrice({
        product: product._id,
        variant: variant._id,
        quantity: qty,
      })
      .subscribe({
        next: (res: any) => {
          if (!res.success || !res.data) {
            this.alert.error('Unable to calculate product price');

            return;
          }

          this.cartItems.push({
            product: product._id,
            variant: variant._id,

            productDetails: structuredClone(product),
            variantDetails: structuredClone(variant),

            productName: product.name,
            variantName: variant.sku,

            image: product.images?.[0] || null,

            quantity: qty,

            metalValue: res.data.goldValue,
            makingCharge: res.data.makingCharge,
            gstAmount: res.data.gstAmount,

            gstPercentage: res.data.gstPercentage || 0,

            unitPrice: res.data.unitPrice,
            totalPrice: res.data.totalPrice,
          });

          this.calculateTotal();

          // Reset only product selection fields
          this.orderForm.patchValue({
            variant: '',
            quantity: 1,
          });

          this.selectedProduct = null;
          this.selectedVariant = null;
        },

        error: (err: any) => {
          console.error('Calculate Price Error:', err);

          this.alert.error(err?.error?.message || 'Price calculation failed');
        },
      });
  }

  // ===========================
  // REMOVE ITEM
  // ===========================

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);

    this.calculateTotal();
  }

  // ===========================
  // TOTAL
  // ===========================

  calculateTotal(): void {
    this.subTotal = 0;

    this.cartItems.forEach((item: any) => {
      this.subTotal += Number(item.totalPrice) || 0;
    });

    this.discount = 0;

    this.gst = this.cartItems.reduce(
      (total: number, item: any) =>
        total + (Number(item.gstAmount) || 0) * Number(item.quantity),
      0,
    );

    // Backend finalTotal = subTotal - discount + shippingCharge
    // GST is displayed separately, not added again.
    this.grandTotal = this.subTotal - this.discount;
  }

  // ===========================
  // CREATE ORDER
  // ===========================

  createOrder(): void {
    if (this.isSubmitting) {
      return;
    }

    const customerName = this.orderForm.get('customerName');
    const customerPhone = this.orderForm.get('customerPhone');
    const customerEmail = this.orderForm.get('customerEmail');
    const paymentMethodControl = this.orderForm.get('paymentMethod');

    if (
      customerName?.invalid ||
      customerPhone?.invalid ||
      customerEmail?.invalid ||
      paymentMethodControl?.invalid
    ) {
      customerName?.markAsTouched();
      customerPhone?.markAsTouched();
      customerEmail?.markAsTouched();
      paymentMethodControl?.markAsTouched();

      this.alert.error('Please enter valid customer details');
      return;
    }

    if (!this.cartItems.length) {
      this.alert.error('Please add at least one product');
      return;
    }

    const role = localStorage.getItem('role');
    const adminId = localStorage.getItem('adminId');

    if (!['BRANCH', 'SUB_BRANCH'].includes(role || '')) {
      this.alert.error('Invalid branch user');
      return;
    }

    if (!adminId) {
      this.alert.error('Admin session not found. Please login again.');
      return;
    }

    const paymentMethod = this.orderForm.value.paymentMethod;

    const body = {
      orderSource: role,

      branch: role === 'BRANCH' ? adminId : localStorage.getItem('branchId'),

      subBranch: role === 'SUB_BRANCH' ? adminId : null,

      createdBy: adminId,

      customerDetails: {
        name: this.orderForm.value.customerName.trim(),
        phone: this.orderForm.value.customerPhone.trim(),
        email: this.orderForm.value.customerEmail?.trim() || '',
      },

      paymentMethod,

      items: this.cartItems.map((item: any) => ({
        product: item.product,
        variant: item.variant,
        quantity: Number(item.quantity),
      })),

      notes: this.orderForm.value.notes,
    };

    // UPI - Razorpay flow
    if (paymentMethod === 'UPI') {
      this.startPosRazorpayPayment(body);
      return;
    }

    // CASH / CARD - Direct order flow
    const paymentConfirmed = window.confirm(
      `Please confirm that the customer has paid ₹${this.grandTotal.toFixed(2)} through ${paymentMethod}. Continue creating the order?`,
    );

    if (!paymentConfirmed) {
      return;
    }

    this.isSubmitting = true;

    this.orderService.createOrder(body).subscribe({
      next: (res: any) => {
        this.handleOrderSuccess(res);
      },
      error: (err: any) => {
        console.error('Create Order Error:', err);

        this.alert.error(err?.error?.message || 'Failed to create order');

        this.isSubmitting = false;
      },
    });
  }

  startPosRazorpayPayment(body: any): void {
    const RazorpayConstructor = (window as any).Razorpay;

    if (!RazorpayConstructor) {
      this.alert.error(
        'Razorpay Checkout is not loaded. Please refresh the page.',
      );
      return;
    }

    this.isSubmitting = true;

    const paymentRequest = {
      customerDetails: body.customerDetails,
      items: body.items,
    };

    this.orderService.createPosRazorpayOrder(paymentRequest).subscribe({
      next: (res: any) => {
        if (!res.success || !res.data) {
          this.alert.error(
            res.message || 'Unable to initiate Razorpay payment',
          );
          this.isSubmitting = false;
          return;
        }

        const paymentData = res.data;

        const options = {
          key: paymentData.keyId,
          amount: paymentData.amount,
          currency: paymentData.currency,
          name: 'OZO Gold and Diamonds',
          description: 'Branch POS Order Payment',
          order_id: paymentData.razorpayOrderId,

          prefill: {
            name: body.customerDetails.name,
            email: body.customerDetails.email,
            contact: body.customerDetails.phone,
          },

          notes: {
            paymentAttemptId: paymentData.paymentAttemptId,
            orderSource: body.orderSource,
          },

          theme: {
            color: '#B8860B',
          },

          handler: (response: any) => {
            this.verifyPosPayment(paymentData.paymentAttemptId, response);
          },

          modal: {
            ondismiss: () => {
              this.isSubmitting = false;
              this.alert.error('Payment was cancelled');
            },
          },
        };

        const razorpay = new RazorpayConstructor(options);

        razorpay.on('payment.failed', (response: any) => {
          console.error('Razorpay Payment Failed:', response);

          this.isSubmitting = false;

          this.alert.error(
            response?.error?.description ||
              'UPI payment failed. Please try again.',
          );
        });

        razorpay.open();
      },

      error: (err: any) => {
        console.error('Create POS Razorpay Error:', err);

        this.alert.error(
          err?.error?.message || 'Unable to initiate UPI payment',
        );

        this.isSubmitting = false;
      },
    });
  }

  verifyPosPayment(paymentAttemptId: string, paymentResponse: any): void {
    const verifyBody = {
      paymentAttemptId,

      razorpay_order_id: paymentResponse.razorpay_order_id,

      razorpay_payment_id: paymentResponse.razorpay_payment_id,

      razorpay_signature: paymentResponse.razorpay_signature,
    };

    this.orderService.verifyPosRazorpayPayment(verifyBody).subscribe({
      next: (res: any) => {
        if (!res.success) {
          this.alert.error(res.message || 'Payment verification failed');

          this.isSubmitting = false;
          return;
        }

        const order = res.data?.order || res.data;

        this.handleOrderSuccess({
          success: true,
          data: order,
        });
      },

      error: (err: any) => {
        console.error('POS Payment Verification Error:', err);

        if (err?.error?.paymentCaptured) {
          this.alert.error(
            'Payment successful, but order creation failed. Do not collect payment again. Contact support or retry order recovery.',
          );
        } else {
          this.alert.error(
            err?.error?.message ||
              'Payment verification failed. Check payment status before retrying.',
          );
        }

        this.isSubmitting = false;
      },
    });
  }

  handleOrderSuccess(res: any): void {
    if (!res?.success || !res?.data) {
      this.alert.error('Order creation failed');
      this.isSubmitting = false;
      return;
    }

    this.orderSummary = res.data;

    this.invoicePdfUrl = res.data.invoicePdfUrl || null;

    this.whatsappInvoiceStatus = res.data.whatsappInvoiceStatus || null;

    this.whatsappInvoiceError = res.data.whatsappInvoiceError || null;

    // Preserve completed order totals for invoice summary
    this.subTotal = Number(res.data.subTotal) || 0;
    this.discount = Number(res.data.discountAmount) || 0;
    this.gst = Number(res.data.gstAmount) || 0;
    this.grandTotal = Number(res.data.totalAmount) || 0;

    this.alert.success('Order Created Successfully');

    this.orderForm.reset({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      variant: '',
      quantity: 1,
      paymentMethod: 'CASH',
      notes: '',
    });

    this.cartItems = [];
    this.selectedProduct = null;
    this.selectedVariant = null;
    this.variants = [];

    // Do not call calculateTotal() here.
    // It would reset the completed order summary to zero.

    this.isSubmitting = false;
  }

  // ===========================
  // PRINT INVOICE
  // ===========================

  printInvoice(): void {
    if (!this.invoicePdfUrl) {
      this.alert.error('Invoice PDF is not available');

      return;
    }

    window.open(this.invoicePdfUrl, '_blank', 'noopener,noreferrer');
  }

  // ===========================
  // BACK
  // ===========================

  goBack(): void {
    const role = localStorage.getItem('role');

    const routeMap: Record<string, string> = {
      ADMIN: '/admin/order-list',
      BRANCH: '/BRANCH/order-list',
      SUB_BRANCH: '/SUB_BRANCH/order-list',
    };

    this.router.navigate([routeMap[role || 'ADMIN'] || '/admin/order-list']);
  }

  // ===========================
  // SKU SEARCH
  // ===========================

  onSearch(event: any): void {
    const term = event.term?.trim().toLowerCase();

    if (!term) {
      this.filteredVariants = [...this.allVariants];

      return;
    }

    this.filteredVariants = this.allVariants.filter(
      (x: any) =>
        (x.sku || '').toLowerCase().includes(term) ||
        (x.product?.name || '').toLowerCase().includes(term),
    );
  }

  // ===========================
  // VIEW ITEM
  // ===========================

  viewItem(item: any): void {
    this.dialog.open(ViewOrderItemComponent, {
      width: '700px',

      data: item,

      disableClose: true,
    });
  }
}
