import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-branch',
  templateUrl: './view-branch.component.html',
  styleUrls: ['./view-branch.component.css']
})
export class ViewBranchComponent {
 constructor(

    @Inject(MAT_DIALOG_DATA)
    public data: any,

    private dialogRef:
    MatDialogRef<ViewBranchComponent>

  ) {}

  closeDialog() {

    this.dialogRef.close();

  }

}