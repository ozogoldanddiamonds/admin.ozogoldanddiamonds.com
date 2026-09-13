import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-gold-rate',
  templateUrl: './view-gold-rate.component.html',
  styleUrls: ['./view-gold-rate.component.css']
})
export class ViewGoldRateComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {
    console.log(
      "view-gold-rate works!",
      data
    );
  }
}
