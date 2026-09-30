import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-supplier-purchase-view',
  templateUrl: './supplier-purchase-view.component.html',
  styleUrls: ['./supplier-purchase-view.component.css']
})
export class SupplierPurchaseViewComponent {
constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SupplierPurchaseViewComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }

}
