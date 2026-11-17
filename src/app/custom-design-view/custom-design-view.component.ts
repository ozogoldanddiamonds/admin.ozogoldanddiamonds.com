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

  getStatusClass(status?: string): string {
    switch (status) {
      case 'PENDING': return 'status-pending';
      case 'UNDER_REVIEW': return 'status-review';
      case 'QUOTATION_SENT': return 'status-quotation';
      case 'APPROVED': return 'status-approved';
      case 'IN_PRODUCTION': return 'status-production';
      case 'COMPLETED': return 'status-completed';
      case 'REJECTED': return 'status-rejected';
      case 'CANCELLED': return 'status-cancelled';
      default: return 'status-pending';
    }
  }
  getMetalType(value?: string | null): string {
    const labels: any = {
      GOLD: 'Gold',
      GOLD_DIAMOND: 'Gold & Diamond',
      SILVER: 'Silver',
      PLATINUM: 'Platinum'
    };

    return labels[value || ''] || value || '-';
  }

  getStoneType(value?: string | null): string {
    const labels: any = {
      NONE: 'No Stone',
      DIAMOND: 'Diamond',
      GEMSTONE: 'Gemstone'
    };

    return labels[value || ''] || value || '-';
  }

  getContactMethod(value?: string | null): string {
    const labels: any = {
      WHATSAPP: 'WhatsApp',
      PHONE: 'Phone',
      EMAIL: 'Email'
    };

    return labels[value || ''] || value || '-';
  }

  getDesignType(value?: string | null): string {
    const labels: any = {
      REFERENCE_DESIGN: 'Reference Design',
      NEW_DESIGN: 'New Design'
    };

    return labels[value || ''] || value || '-';
  }
}
