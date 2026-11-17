
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-shipment',
  templateUrl: './order-shipment.component.html',
  styleUrls: ['./order-shipment.component.css']
})
export class OrderShipmentComponent implements OnInit {

  trackingLoading = false;
  trackingData: any = null;
  trackingChecked = false;

  cancelLoading = false;
  isCreatingNewShipment = false;

  orderId!: string;
  order: any = null;
  loading = false;

  shipmentForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.orderId = this.route.snapshot.paramMap.get('id') || '';
    this.isCreatingNewShipment = this.route.snapshot.queryParamMap.get('newShipment') === 'true';

    this.shipmentForm = this.fb.group({
      boxes: this.fb.array([
        this.createBox()
      ])
    });

    if (this.orderId) {
      this.loadOrder();
    }

  }

  // ==========================================
  // LOAD ORDER
  // ==========================================

  loadOrder(): void {

    this.loading = true;

    this.orderService.getOrderById(this.orderId).subscribe({

      next: (res: any) => {

        if (res.success) {

          this.order = res.data;

          const bookingStatus = this.order?.sequelShipment?.bookingStatus;

          // New booking mode is only valid for a previously cancelled shipment.
          if (bookingStatus !== 'CANCELLED') {
            this.isCreatingNewShipment = false;
          }

          if (bookingStatus === 'BOOKED' && !this.isCreatingNewShipment) {
            this.getShipmentTracking();
          } else {
            this.trackingData = null;
            this.trackingChecked = false;
          }

          // Start with a clean package form when Admin chooses Create New Shipment.
          if (bookingStatus === 'CANCELLED' && this.isCreatingNewShipment) {
            this.shipmentForm.setControl(
              'boxes',
              this.fb.array([this.createBox()])
            );
          }

        }

        this.loading = false;

      },

      error: (err) => {

        console.error('Order fetch error:', err);

        this.loading = false;

      }

    });

  }

  // ==========================================
  // PACKAGE FORM
  // ==========================================

  get boxes(): FormArray {
    return this.shipmentForm.get('boxes') as FormArray;
  }

  createBox(): FormGroup {

    return this.fb.group({

      boxNumber: ['', Validators.required],
      lockNumber: ['', Validators.required],
      length: ['', [Validators.required, Validators.min(1)]],
      breadth: ['', [Validators.required, Validators.min(1)]],
      height: ['', [Validators.required, Validators.min(1)]],
      grossWeight: ['', [Validators.required, Validators.min(1)]]

    });

  }

  addBox(): void {
    this.boxes.push(this.createBox());
  }

  removeBox(index: number): void {

    if (this.boxes.length > 1) {
      this.boxes.removeAt(index);
    }

  }

  // ==========================================
  // SAVE PACKAGE DETAILS
  // ==========================================

  savePackageDetails(): void {

    const bookingStatus = this.order?.sequelShipment?.bookingStatus;

    if (
      bookingStatus === 'BOOKED' ||
      (bookingStatus === 'CANCELLED' && !this.isCreatingNewShipment)
    ) {
      Swal.fire(
        'Not Allowed',
        'Open this order using Create New Shipment before entering new package details.',
        'warning'
      );
      return;
    }

    if (this.shipmentForm.invalid) {

      this.shipmentForm.markAllAsTouched();
      return;

    }

    const boxes = this.shipmentForm.value.boxes;

    this.orderService
      .saveShipmentPackages(this.orderId, boxes)
      .subscribe({

        next: (res: any) => {

          if (res.success) {

            if (!this.order) {
              this.order = {};
            }

            this.order.sequelShipment = {
              ...this.order.sequelShipment,
              ...res.data
            };

            Swal.fire(
              'Saved',
              'Package details saved successfully.',
              'success'
            );

            this.loadOrder();

          }

        },

        error: (err) => {

          console.error('Package save error:', err);

          Swal.fire(
            'Error',
            err.error?.message || 'Failed to save package details.',
            'error'
          );

        }

      });

  }

  // ==========================================
  // BOOK SHIPMENT
  // ==========================================

  bookShipment(): void {

    if (!this.order) {

      Swal.fire('Error', 'Order details not available.', 'error');
      return;

    }

    if (
      this.order.orderSource !== 'ONLINE' ||
      this.order.paymentMethod !== 'ONLINE' ||
      this.order.paymentStatus !== 'Paid'
    ) {

      Swal.fire(
        'Shipment Not Allowed',
        'Only paid online orders are eligible for shipment.',
        'warning'
      );

      return;

    }

    if (!this.order.sequelShipment?.packages?.length) {

      Swal.fire(
        'Package Details Required',
        'Please save package details first.',
        'warning'
      );

      return;

    }

    const bookingStatus = this.order.sequelShipment?.bookingStatus;

    if (
      bookingStatus === 'BOOKED' ||
      bookingStatus === 'PENDING' ||
      bookingStatus === 'FAILED' ||
      (bookingStatus === 'CANCELLED' && !this.isCreatingNewShipment)
    ) {

      Swal.fire(
        'Booking Not Allowed',
        bookingStatus === 'CANCELLED'
          ? 'Use Create New Shipment to start a fresh booking.'
          : 'Shipment is already booked or requires verification.',
        'warning'
      );

      return;

    }

    Swal.fire({

      title: 'Book Shipment?',
      text: 'Are you sure you want to book this shipment?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Book Shipment',
      cancelButtonText: 'Cancel'

    }).then(result => {

      if (!result.isConfirmed) {
        return;
      }

      this.loading = true;

      this.orderService.bookSequelShipment(this.orderId).subscribe({

        next: (res: any) => {

          this.loading = false;

          if (res.success) {

            this.isCreatingNewShipment = false;

            Swal.fire(
              'Shipment Booked',
              'New shipment booked successfully.',
              'success'
            );

            this.loadOrder();

          }

        },

        error: (err) => {

          this.loading = false;

          console.error('Shipment Booking Error:', err);

          Swal.fire(
            'Booking Failed',
            err.error?.message || 'Shipment booking failed.',
            'error'
          );

        }

      });

    });

  }

  // ==========================================
  // CHECK WHETHER SHIPMENT CAN BE CANCELLED
  // ==========================================

  canCancelShipment(): boolean {

    const shipment = this.order?.sequelShipment;

    if (
      shipment?.bookingStatus !== 'BOOKED' ||
      !/^\d{10}$/.test(shipment?.docketNumber || '')
    ) {
      return false;
    }

    const status = shipment?.shipmentStatus;

    // Sequel247 does not allow cancellation after pickup.
    const pickedUpOrLaterStatuses = [
      'SCHECKIN',
      'SLINREC',
      'SLINORIN',
      'SLINDEST',
      'SDELASN',
      'SDELVD',
      'SCANCELLED'
    ];

    return !pickedUpOrLaterStatuses.includes(status);

  }

  // ==========================================
  // CANCEL SHIPMENT
  // ==========================================

  cancelShipment(): void {

    if (this.cancelLoading) {
      return;
    }

    if (!this.canCancelShipment()) {

      Swal.fire(
        'Cancellation Not Available',
        'This shipment is not eligible for cancellation. It may already have been picked up, delivered or cancelled.',
        'warning'
      );

      return;

    }

    Swal.fire({

      title: 'Cancel Shipment',

      text: `Docket Number: ${this.order.sequelShipment.docketNumber}`,

      input: 'textarea',

      inputLabel: 'Cancellation Reason',

      inputPlaceholder: 'Enter reason for shipment cancellation',

      inputAttributes: {
        'aria-label': 'Cancellation reason'
      },

      showCancelButton: true,

      confirmButtonText: 'Continue',

      cancelButtonText: 'Close',

      confirmButtonColor: '#dc3545',

      inputValidator: (value) => {

        if (!value || !value.trim()) {
          return 'Please enter a cancellation reason.';
        }

        if (value.trim().length < 3) {
          return 'Cancellation reason must contain at least 3 characters.';
        }

        return null;

      }

    }).then(result => {

      if (!result.isConfirmed || !result.value) {
        return;
      }

      const cancelReason = result.value.trim();

      Swal.fire({

        title: 'Confirm Cancellation?',

        html: `
          <p>Are you sure you want to cancel this Sequel247 shipment?</p>
          <p><strong>Docket:</strong> ${this.order.sequelShipment.docketNumber}</p>
          <p><strong>Reason:</strong> ${cancelReason}</p>
          <p class="text-danger small">
            This action cannot be automatically reversed.
          </p>
        `,

        icon: 'warning',

        showCancelButton: true,

        confirmButtonText: 'Yes, Cancel Shipment',

        cancelButtonText: 'Go Back',

        confirmButtonColor: '#dc3545'

      }).then(confirmResult => {

        if (!confirmResult.isConfirmed) {
          return;
        }

        this.cancelLoading = true;

        this.orderService.cancelSequelShipment(
          this.orderId,
          cancelReason
        ).subscribe({

          next: (res: any) => {

            this.cancelLoading = false;

            if (res.success) {

              // Update local shipment status
              this.order.sequelShipment.bookingStatus = 'CANCELLED';

              this.order.sequelShipment.shipmentStatus = 'SCANCELLED';

              this.order.sequelShipment.cancelReason = cancelReason;

              Swal.fire(
                'Shipment Cancelled',
                res.message || 'Sequel247 shipment cancelled successfully.',
                'success'
              );

              // Reload latest database record
              this.loadOrder();

            } else {

              Swal.fire(
                'Cancellation Failed',
                res.message || 'Unable to cancel shipment.',
                'error'
              );

            }

          },

          error: (err) => {

            this.cancelLoading = false;

            console.error('Shipment Cancellation Error:', err);

            Swal.fire(
              'Cancellation Failed',
              err.error?.message ||
              'Shipment cancellation could not be confirmed. Verify the docket status with Sequel247 before retrying.',
              'error'
            );

          }

        });

      });

    });

  }

  // ==========================================
  // SINGLE SHIPMENT TRACKING
  // ==========================================

  getShipmentTracking(): void {

    if (
      !this.order?._id ||
      this.order?.sequelShipment?.bookingStatus !== 'BOOKED'
    ) {
      return;
    }

    this.trackingLoading = true;

    this.orderService
      .getSequelShipmentTracking(this.order._id)
      .subscribe({

        next: (res: any) => {

          console.log('Tracking API Response:', res);

          if (res.success && res.data) {

            this.trackingData = res.data;

            this.order.sequelShipment.shipmentStatus =
              res.data.shipmentStatus;

            this.order.sequelShipment.trackingHistory =
              res.data.tracking || [];

            this.order.sequelShipment.lastTrackedAt =
              res.data.lastTrackedAt;

          }

          this.trackingChecked = true;
          this.trackingLoading = false;

        },

        error: (err) => {

          console.error('Tracking API Error:', err);

          this.trackingChecked = true;
          this.trackingLoading = false;

          Swal.fire(
            'Tracking Error',
            err.error?.message || 'Unable to fetch shipment tracking.',
            'error'
          );

        }

      });

  }

}
