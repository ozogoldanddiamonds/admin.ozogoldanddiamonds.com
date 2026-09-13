import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-userscheema',
  templateUrl: './view-userscheema.component.html',
  styleUrls: ['./view-userscheema.component.css']
})
export class ViewUserscheemaComponent {
constructor(

@Inject(MAT_DIALOG_DATA)

public data:any,

private dialogRef:MatDialogRef<ViewUserscheemaComponent>

){

console.log(this.data);

}

close(){

this.dialogRef.close();

}

}
