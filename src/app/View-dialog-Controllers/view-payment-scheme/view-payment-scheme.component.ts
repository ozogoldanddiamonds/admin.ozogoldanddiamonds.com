import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SchemePaymentService } from 'src/app/Services/scheme-payment.service';

@Component({
  selector: 'app-view-payment-scheme',
  templateUrl: './view-payment-scheme.component.html',
  styleUrls: ['./view-payment-scheme.component.css']
})
export class ViewPaymentSchemeComponent implements OnInit {

  payment: any;
  loading = true;
  errorMessage = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewPaymentSchemeComponent>,
    private paymentService: SchemePaymentService
  ) { }

  ngOnInit(): void {
    this.loadPaymentDetails();
  }

  loadPaymentDetails(): void {
    const paymentId = this.data?._id || this.data?.id;

    if (!paymentId) {
      this.loading = false;
      this.errorMessage = 'Payment ID not found';
      return;
    }

    this.paymentService.getPaymentById(paymentId).subscribe({
      next: (res: any) => {
        this.loading = false;

        if (res?.success) {
          this.payment = res.data;
        } else {
          this.errorMessage = res?.message || 'Failed to load payment details';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage =
          err?.error?.message || 'Failed to load payment details';
        console.error('Payment details error:', err);
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
