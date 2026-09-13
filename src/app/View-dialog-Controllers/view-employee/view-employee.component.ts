import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent {
 constructor(

    @Inject(MAT_DIALOG_DATA)
    public data: any,

    private dialogRef:
    MatDialogRef<ViewEmployeeComponent>

  ) { }

  // Close Popup

  closeDialog() {

    this.dialogRef.close();

  }

}
