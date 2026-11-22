import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { OrderViewDialogComponent } from '../order-view-dialog/order-view-dialog.component';
import { OrderService } from '../Services/order.service';

@Component({
  selector: 'app-main-branch-orders',
  templateUrl: './main-branch-orders.component.html',
  styleUrls: ['./main-branch-orders.component.css'],
})
export class MainBranchOrdersComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'sno',
    'orderNumber',
    'customer',
    'phone',
    'orderSource',
    // 'subBranch',
    'payment',
    'status',
    'amount',
    'date',
    'shipment',
    'actions',
  ];

  dataSource = new MatTableDataSource<any>();

  selectedOrderIds: string[] = [];

  isBulkTracking = false;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  // ==========================================
  // INITIALIZATION
  // ==========================================

  ngOnInit(): void {
    this.getOrders();
  }

  // ==========================================
  // GET ORDERS
  // Handles Admin and SUB_BRANCH separately
  // ==========================================

  // getOrders(): void {
  //   const role = localStorage.getItem('role');

  //   // SUB BRANCH ORDERS
  //   if (role === 'SUB_BRANCH') {
  //     const adminId = localStorage.getItem('adminId');

  //     if (!adminId) {
  //       console.error('Sub Branch ID not found');

  //       this.dataSource.data = [];
  //       this.selectedOrderIds = [];

  //       this.setTable();
  //       return;
  //     }

  //     this.orderService.getSubBranchOrders(adminId).subscribe({
  //       next: (res: any) => {
  //         this.dataSource.data = res?.success ? res.data || [] : [];

  //         this.selectedOrderIds = [];

  //         this.setTable();
  //       },

  //       error: (err: any) => {
  //         console.error('Error fetching Sub Branch orders:', err);

  //         this.dataSource.data = [];
  //         this.selectedOrderIds = [];

  //         this.setTable();
  //       },
  //     });

  //     return;
  //   }

  //   // NORMAL ORDERS
  //   this.orderService.getAllOrders().subscribe({
  //     next: (res: any) => {
  //       this.dataSource.data = res?.data || [];

  //       this.selectedOrderIds = [];

  //       this.setTable();
  //     },

  //     error: (err: any) => {
  //       console.error('Error fetching orders:', err);

  //       this.dataSource.data = [];
  //       this.selectedOrderIds = [];

  //       this.setTable();
  //     },
  //   });
  // }

  getOrders(): void {
    this.selectedOrderIds = [];
    this.isBulkTracking = false;

    this.orderService.getAllBranchOrders().subscribe({
      next: (res: any) => {
        console.log('ONLINE CUSTOMER ORDERS:', res);

        this.dataSource.data = res?.success ? res.data || [] : [];

        this.setTable();
      },

      error: (err: any) => {
        console.error('Error fetching customer orders:', err);

        this.dataSource.data = [];
        this.selectedOrderIds = [];

        this.setTable();
      },
    });
  }

  // ==========================================
  // SET PAGINATOR & SORT
  // ==========================================

  private setTable(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ==========================================
  // SEARCH
  // ==========================================

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.dataSource.filter = filterValue;

    // Clear selection when search changes
    this.selectedOrderIds = [];
  }

  // ==========================================
  // VIEW ORDER
  // ==========================================

  viewOrder(order: any): void {
    this.dialog.open(OrderViewDialogComponent, {
      width: '1000px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: order,
      autoFocus: false,
    });
  }

  // ==========================================
  // EDIT ORDER
  // ==========================================

  editOrder(id: string): void {
    this.router.navigate(['/admin/order/edit', id]);
  }

  // ==========================================
  // DELETE ORDER
  // ==========================================

  deleteCategory(id: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.orderService.deleteOrder(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted',
              text: 'Order Deleted Successfully',
              timer: 2500,
              showConfirmButton: false,
            });

            // Role-based refresh
            this.getOrders();
          },

          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Delete Failed',
            });
          },
        });
      }
    });
  }

  // ==========================================
  // OPEN SHIPMENT
  // ==========================================

  openShipment(order: any): void {
    if (
      order.orderSource !== 'ONLINE' ||
      order.paymentStatus !== 'Paid' ||
      order.paymentMethod === 'COD'
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Shipment Not Allowed',
        text: 'Only paid online orders are eligible for shipment.',
      });
      return;
    }

    const isCancelled = order.sequelShipment?.bookingStatus === 'CANCELLED';

    this.router.navigate(['/admin/order-shipment', order._id], {
      queryParams: isCancelled ? { newShipment: 'true' } : {},
    });
  }

  // ==========================================
  // CHECK SHIPMENT ELIGIBILITY
  // ==========================================

  isTrackable(order: any): boolean {
    return (
      order.orderSource === 'ONLINE' &&
      order.paymentStatus === 'Paid' &&
      order.paymentMethod !== 'COD' &&
      order.sequelShipment?.bookingStatus === 'BOOKED' &&
      /^\d{10}$/.test(order.sequelShipment?.docketNumber || '') &&
      !['SDELVD', 'SCANCELLED'].includes(order.sequelShipment?.shipmentStatus)
    );
  }

  // ==========================================
  // INDIVIDUAL CHECKBOX SELECTION
  // ==========================================

  toggleOrderSelection(order: any, checked: boolean): void {
    if (!this.isTrackable(order)) {
      return;
    }

    if (checked) {
      if (!this.selectedOrderIds.includes(order._id)) {
        this.selectedOrderIds.push(order._id);
      }
    } else {
      this.selectedOrderIds = this.selectedOrderIds.filter(
        (id) => id !== order._id,
      );
    }
  }

  // ==========================================
  // CHECK WHETHER ORDER IS SELECTED
  // ==========================================

  isOrderSelected(order: any): boolean {
    return this.selectedOrderIds.includes(order._id);
  }

  // ==========================================
  // GET ELIGIBLE FILTERED ORDERS
  // ==========================================

  get eligibleFilteredOrders(): any[] {
    return this.dataSource.filteredData.filter((order: any) =>
      this.isTrackable(order),
    );
  }

  // ==========================================
  // CHECK SELECT ALL STATUS
  // ==========================================

  isAllSelected(): boolean {
    const eligible = this.eligibleFilteredOrders;

    return (
      eligible.length > 0 &&
      eligible.every((order) => this.isOrderSelected(order))
    );
  }

  // ==========================================
  // SELECT ALL / DESELECT ALL
  // ==========================================

  toggleSelectAll(checked: boolean): void {
    if (checked) {
      this.eligibleFilteredOrders.forEach((order) => {
        if (!this.selectedOrderIds.includes(order._id)) {
          this.selectedOrderIds.push(order._id);
        }
      });
    } else {
      const visibleIds = this.eligibleFilteredOrders.map((order) => order._id);

      this.selectedOrderIds = this.selectedOrderIds.filter(
        (id) => !visibleIds.includes(id),
      );
    }
  }

  // ==========================================
  // BULK SHIPMENT TRACKING
  // ==========================================

  trackSelectedShipments(): void {
    if (this.isBulkTracking) {
      return;
    }

    if (!this.selectedOrderIds.length) {
      Swal.fire(
        'Select Orders',
        'Please select at least one booked shipment.',
        'warning',
      );

      return;
    }

    // Keep a snapshot of selected IDs
    const orderIds = [...this.selectedOrderIds];

    Swal.fire({
      title: 'Track Shipments?',

      text: `Are you sure you want to track ${orderIds.length} selected shipments?`,

      icon: 'question',

      showCancelButton: true,

      confirmButtonText: 'Yes, Track',

      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      }

      this.isBulkTracking = true;

      this.orderService.trackMultipleOrders(orderIds).subscribe({
        next: (res: any) => {
          this.isBulkTracking = false;

          if (res?.success) {
            const data = res.data || {};

            this.selectedOrderIds = [];

            Swal.fire({
              icon: 'success',

              title: 'Bulk Tracking Completed',

              html: `
                <div style="text-align:left">
                  <p><b>Requested:</b> ${data.requested ?? 0}</p>
                  <p><b>Eligible:</b> ${data.eligible ?? 0}</p>
                  <p><b>Tracked:</b> ${data.tracked ?? 0}</p>
                  <p><b>Updated:</b> ${data.updated ?? 0}</p>
                  <p><b>Skipped:</b> ${data.skipped ?? 0}</p>
                  <p><b>Errors:</b> ${data.errors?.length ?? 0}</p>
                </div>
              `,
            }).then(() => {
              // Refresh according to logged-in role
              this.getOrders();
            });
          } else {
            Swal.fire(
              'Tracking Failed',
              res?.message || 'Unable to track shipments.',
              'error',
            );
          }
        },

        error: (err: any) => {
          this.isBulkTracking = false;

          console.error('Bulk tracking error:', err);

          Swal.fire(
            'Error',
            err.error?.message || 'Bulk shipment tracking failed.',
            'error',
          );
        },
      });
    });
  }
}
