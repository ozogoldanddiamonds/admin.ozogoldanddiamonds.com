import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-order-shipment',
  templateUrl: './order-shipment.component.html',
  styleUrls: ['./order-shipment.component.css']
})
export class OrderShipmentComponent implements OnInit {

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

    this.shipmentForm = this.fb.group({
      boxes: this.fb.array([
        this.createBox()
      ])
    });

    if (this.orderId) {
      this.loadOrder();
    }
  }

  loadOrder(): void {
    this.loading = true;

    this.orderService.getOrderById(this.orderId).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.order = res.data;
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Order fetch error:', err);
        this.loading = false;
      }
    });
  }

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
  // Temporary: package form validation

  savePackageDetails(): void {

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

            // Update local order immediately
            if (!this.order) {
              this.order = {};
            }

            this.order.sequelShipment = {
              ...this.order.sequelShipment,
              ...res.data
            };

            alert("Package details saved successfully");

            console.log(
              "Saved Packages:",
              this.order.sequelShipment.packages
            );

            // Reload complete order from database
            this.loadOrder();
          }
        },

        error: (err) => {
          console.error("Package save error:", err);

          alert(
            err.error?.message ||
            "Failed to save package details"
          );
        }
      });
  }


  bookShipment(): void {

    // 1. Check order availability
    if (!this.order) {
      alert("Order details not available");
      return;
    }

    // 2. Check payment eligibility
    if (
      this.order.orderSource !== 'ONLINE' ||
      this.order.paymentMethod !== 'ONLINE' ||
      this.order.paymentStatus !== 'Paid'
    ) {
      alert("Only paid online orders are eligible for shipment");
      return;
    }

    // 3. Check package details
    if (!this.order.sequelShipment?.packages?.length) {
      alert("Please save package details first");
      return;
    }

    // 4. Check existing booking
    if (
      this.order.sequelShipment.bookingStatus === 'BOOKED' ||
      this.order.sequelShipment.bookingStatus === 'PENDING'
    ) {
      alert("Shipment already booked or booking is in progress");
      return;
    }

    // 5. Confirmation
    if (!confirm("Are you sure you want to book this shipment?")) {
      return;
    }

    // 6. Call backend API
    this.orderService.bookSequelShipment(this.orderId).subscribe({

      next: (res: any) => {

        if (res.success) {

          alert("Shipment booked successfully!");

          console.log("Docket Number:", res.data.docketNumber);
          console.log("BRN:", res.data.brn);
          console.log("Estimated Delivery:", res.data.estimatedDelivery);

          // Refresh order details
          this.loadOrder();

        }

      },

      error: (err) => {

        console.error("Shipment Booking Error:", err);

        alert(
          err.error?.message ||
          "Shipment booking failed"
        );

      }

    });

  }
}
