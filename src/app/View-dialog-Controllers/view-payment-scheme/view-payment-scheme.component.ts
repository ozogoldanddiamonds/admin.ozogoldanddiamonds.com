import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-payment-scheme',
  templateUrl: './view-payment-scheme.component.html',
  styleUrls: ['./view-payment-scheme.component.css']
})
export class ViewPaymentSchemeComponent {
 constructor(

    @Inject(MAT_DIALOG_DATA)
    public data: any,

    private dialogRef: MatDialogRef<ViewPaymentSchemeComponent>

  ) {

    console.log(this.data);

  }

  close() {

    this.dialogRef.close();

  }
}
