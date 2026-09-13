import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SchemaService } from 'src/app/Services/schema.service';

@Component({
  selector: 'app-view-scheema',
  templateUrl: './view-scheema.component.html',
  styleUrls: ['./view-scheema.component.css']
})
export class ViewScheemaComponent {
 
constructor(

    @Inject(MAT_DIALOG_DATA)
    public data: any,

    private dialogRef: MatDialogRef<ViewScheemaComponent>

  ) {

    console.log("Dialog Data =>", data);

  }


}