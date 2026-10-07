import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SizeChart } from 'src/app/models/size-chart';

@Component({
  selector: 'app-view-size-chart',
  templateUrl: './view-size-chart.component.html',
  styleUrls: ['./view-size-chart.component.css']
})
export class ViewSizeChartComponent {

  constructor(
    public dialogRef: MatDialogRef<ViewSizeChartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SizeChart
  ) {}

  getSubCategoryName(): string {

    if (!this.data?.subCategory) {
      return '-';
    }

    if (typeof this.data.subCategory === 'string') {
      return this.data.subCategory;
    }

    return this.data.subCategory.name || '-';
  }

  close(): void {
    this.dialogRef.close();
  }
}
