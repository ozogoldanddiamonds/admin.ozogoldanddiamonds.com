import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../Services/alert.service';
import { OrderService } from '../Services/order.service';

@Component({
  selector: 'app-order-view-dialog',
  templateUrl: './order-view-dialog.component.html',
  styleUrls: ['./order-view-dialog.component.css']
})
export class OrderViewDialogComponent implements OnInit {


  // ==========================================
  // ORDER
  // ==========================================

  order: any = null;


  // ==========================================
  // ORDER ID
  // ==========================================

  orderId: string = '';


  // ==========================================
  // LOADING
  // ==========================================

  isLoading = false;


  constructor(


    @Inject(MAT_DIALOG_DATA)
    public data: any,

    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<OrderViewDialogComponent>,

    private router: Router,

    private orderService: OrderService,

    private alertService: AlertService

  ) { }


  // ==========================================
  // ON INIT
  // ==========================================

  ngOnInit(): void {
    console.log('Dialog Order Data:', this.data);

    this.orderId =
      this.data?._id ||
      this.data?.id ||
      this.data?.orderId ||
      '';

    console.log('Order ID:', this.orderId);


    if (!this.orderId) {

      this.alertService.error(
        'Order ID not found'
      );

      return;
    }


    this.getOrderById();

  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  // ==========================================
  // GET ORDER BY ID
  // ==========================================

  getOrderById(): void {

    this.isLoading = true;


    this.orderService
      .getOrderById(
        this.orderId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Order Details Response:',
            response
          );


          // ====================================
          // RESPONSE VALIDATION
          // ====================================

          if (
            !response?.success
          ) {

            this.order = null;

            this.isLoading = false;


            this.alertService.error(

              response?.message ||

              'Order details not found'

            );

            return;

          }


          // ====================================
          // BIND ORDER
          // ====================================

          this.order =
            response?.data || null;


          // ====================================
          // NO DATA
          // ====================================

          if (!this.order) {

            this.alertService.error(

              'Order details not found'

            );

          }


          console.log(
            'Bound Order:',
            this.order
          );


          this.isLoading = false;

        },


        error: (error: any) => {

          console.log(
            'Get Order Details Error:',
            error
          );


          this.order = null;

          this.isLoading = false;


          this.alertService.error(

            error?.error?.message ||

            'Failed to load order details'

          );

        }

      });

  }


  // ==========================================
  // FORMAT ORDER SOURCE
  // ==========================================

  formatOrderSource(
    source: string
  ): string {

    if (!source) {

      return '-';

    }


    const sourceMap: {
      [key: string]: string
    } = {

      ONLINE:
        'Online',

      ADMIN:
        'Admin',

      BRANCH:
        'Branch',

      SUB_BRANCH:
        'Sub Branch',

      DISTRIBUTOR:
        'Distributor',

      SALESMAN:
        'Salesman'

    };


    return (

      sourceMap[source] ||

      source
        .replace(
          /_/g,
          ' '
        )

    );

  }


  // ==========================================
  // PAYMENT STATUS CLASS
  // ==========================================

  getPaymentStatusClass(
    status: string
  ): string {

    switch (
    status
    ) {

      case 'Paid':

      case 'PAID':

        return 'active';


      case 'Pending':

      case 'PENDING':

        return 'pending';


      case 'Partial':

      case 'PARTIAL':

        return 'partial';


      case 'Failed':

      case 'FAILED':

        return 'inactive';


      default:

        return 'inactive';

    }

  }


  // ==========================================
  // ORDER STATUS CLASS
  // ==========================================

  getOrderStatusClass(
    status: string
  ): string {

    switch (
    status
    ) {

      case 'Confirmed':

      case 'CONFIRMED':

      case 'Delivered':

      case 'DELIVERED':

      case 'Completed':

      case 'COMPLETED':

        return 'active';


      case 'Pending':

      case 'PENDING':

      case 'Processing':

      case 'PROCESSING':

      case 'Packed':

      case 'PACKED':

        return 'pending';


      case 'Cancelled':

      case 'CANCELLED':

      case 'Rejected':

      case 'REJECTED':

        return 'inactive';


      default:

        return 'inactive';

    }

  }


  // ==========================================
  // GET ITEM COUNT
  // ==========================================

  getItemCount(): number {

    return this.order?.items?.length || 0;

  }


  // ==========================================
  // GET TOTAL QUANTITY
  // ==========================================

  getTotalQuantity(): number {

    if (
      !this.order?.items?.length
    ) {

      return 0;

    }


    return this.order.items.reduce(

      (
        total: number,
        item: any
      ) => {

        return (

          total +
          Number(
            item?.quantity || 0
          )

        );

      },

      0

    );

  }

  isMakerAllocation(allocation: any): boolean {
    return allocation?.sourceType === 'MAKER';
  }

  isSupplierAllocation(allocation: any): boolean {
    return allocation?.sourceType === 'SUPPLIER';
  }

  getSupplier(allocation: any): any {
    return allocation?.sourceDetails?.supplier ||
      allocation?.supplierPurchaseItem?.purchase?.supplier ||
      null;
  }

  getSupplierPurchase(allocation: any): any {
    return allocation?.sourceDetails?.purchase ||
      allocation?.supplierPurchaseItem?.purchase ||
      null;
  }

  getMaker(allocation: any): any {
    return allocation?.sourceDetails?.maker ||
      allocation?.makerProductionItem?.production?.maker ||
      null;
  }

  getMakerProduction(allocation: any): any {
    return allocation?.sourceDetails?.production ||
      allocation?.makerProductionItem?.production ||
      null;
  }

  getStockSourceLabel(allocation: any): string {
    if (allocation?.sourceType === 'MAKER') {
      return 'Maker';
    }

    if (allocation?.sourceType === 'SUPPLIER') {
      return 'Supplier';
    }

    return allocation?.sourceType || 'Unknown';
  }
  // ==========================================
  // GET TOTAL STOCK ALLOCATIONS
  // ==========================================

  getTotalStockAllocations(): number {

    if (
      !this.order?.items?.length
    ) {

      return 0;

    }


    return this.order.items.reduce(

      (
        total: number,
        item: any
      ) => {

        return (

          total +
          (
            item?.stockAllocations?.length
            || 0
          )

        );

      },

      0

    );

  }


  // ==========================================
  // GET MAKER ALLOCATION QUANTITY
  // ==========================================

  getMakerAllocatedQuantity(
    item: any
  ): number {

    if (
      !item?.stockAllocations?.length
    ) {

      return 0;

    }


    return item.stockAllocations.reduce(

      (
        total: number,
        allocation: any
      ) => {

        if (
          allocation?.sourceType ===
          'MAKER'
        ) {

          return (

            total +
            Number(
              allocation?.quantity || 0
            )

          );

        }


        return total;

      },

      0

    );

  }


  // ==========================================
  // GET STOCK SOURCE
  // ==========================================

  getStockSource(
    allocation: any
  ): string {

    if (!allocation) {

      return '-';

    }


    return (

      allocation.sourceType ||

      allocation.sourceDetails
        ?.sourceType ||

      '-'

    );

  }


  // ==========================================
  // FORMAT PAYMENT METHOD
  // ==========================================

  formatPaymentMethod(
    method: string
  ): string {

    if (!method) {

      return '-';

    }


    return method
      .replace(
        /_/g,
        ' '
      );

  }


  // ==========================================
  // CHECK INVOICE PRINTED
  // ==========================================

  getInvoicePrintedText(): string {

    return this.order?.invoicePrinted
      ? 'Yes'
      : 'No';

  }


  // ==========================================
  // CHECK STOCK UPDATED
  // ==========================================

  getStockUpdatedText(): string {

    return this.order?.stockUpdated
      ? 'Yes'
      : 'No';

  }


  // ==========================================
  // GET CUSTOMER NAME
  // ==========================================

  getCustomerName(): string {

    return (

      this.order?.customerDetails
        ?.name ||

      '-'

    );

  }


  // ==========================================
  // GET CREATOR NAME
  // ==========================================

  getCreatedByName(): string {

    return (

      this.order?.createdBy
        ?.name ||

      '-'

    );

  }


  // ==========================================
  // BACK
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/admin/order-list'

    ]);

  }

}
