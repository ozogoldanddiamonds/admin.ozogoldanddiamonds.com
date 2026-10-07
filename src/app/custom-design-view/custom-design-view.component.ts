import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomDesignRequest } from 'src/app/models/custom-design-request';

@Component({
  selector: 'app-custom-design-view',
  templateUrl: './custom-design-view.component.html',
  styleUrls: ['./custom-design-view.component.css']
})
export class CustomDesignViewComponent {

  constructor(
    public dialogRef: MatDialogRef<CustomDesignViewComponent>,
    @Inject(MAT_DIALOG_DATA) public request: CustomDesignRequest
  ) { }

  close(): void {
    this.dialogRef.close();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'NEW': return 'status-new';
      case 'CONTACTED': return 'status-contacted';
      case 'DISCUSSION': return 'status-discussion';
      case 'QUOTATION_SENT': return 'status-quotation';
      case 'ACCEPTED': return 'status-accepted';
      case 'ORDER_CREATED': return 'status-order';
      case 'IN_PRODUCTION': return 'status-production';
      case 'COMPLETED': return 'status-completed';
      case 'REJECTED': return 'status-rejected';
      case 'CANCELLED': return 'status-cancelled';
      default: return 'status-new';
    }
  }
}
