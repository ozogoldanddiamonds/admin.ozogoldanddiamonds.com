import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-order-item',
  templateUrl: './view-order-item.component.html',
  styleUrls: ['./view-order-item.component.css']
})
export class ViewOrderItemComponent {
 constructor(

    @Inject(MAT_DIALOG_DATA)
    public data: any,

    private dialogRef: MatDialogRef<ViewOrderItemComponent>

  ) {  console.log("Popup Data:", this.data);

  console.log("Variant Details:", this.data.variantDetails);

  console.log("Stones:", this.data.variantDetails?.stones);}
  trackByItem(index: number): number {
    return index;
  }

  trackByStone(index: number): number {
    return index;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  printInvoice() {
    window.print();
  }
}
