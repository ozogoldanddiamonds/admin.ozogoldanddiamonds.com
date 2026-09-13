import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent {
 constructor(
    @Inject(MAT_DIALOG_DATA) public order: any,
    private dialogRef: MatDialogRef<ViewOrdersComponent>
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getCustomerName(): string {
    return this.order?.customerDetails?.name || '-';
  }

  getCustomerPhone(): string {
    return this.order?.customerDetails?.phone || '-';
  }

  getCustomerEmail(): string {
    return this.order?.customerDetails?.email || '-';
  }

  getBranchName(): string {
    return this.order?.branch?.name || this.order?.subBranch?.name || '-';
  }

  getBranchEmail(): string {
    return this.order?.branch?.email || this.order?.subBranch?.email || '-';
  }

  getBranchPhone(): string {
    return this.order?.branch?.contactNumber || this.order?.subBranch?.contactNumber || '-';
  }

  getCreatedBy(): string {
    return this.order?.createdBy?.name || '-';
  }

  getPaymentDate(): string {
    return this.order?.paymentHistory?.[0]?.paidAt || this.order?.createdAt || '';
  }

  getItemImage(item: any): string {
    return item?.productSnapshot?.image || item?.product?.images?.[0] || '';
  }

  hasStones(item: any): boolean {
    return !!item?.variantSnapshot?.stones?.length;
  }

  hasPaymentHistory(): boolean {
    return !!this.order?.paymentHistory?.length;
  }

  hasStatusHistory(): boolean {
    return !!this.order?.statusHistory?.length;
  }

  hasNotes(): boolean {
    return !!this.order?.notes?.trim();
  }

  getVariantLabel(item: any): string {
    const v = item?.variantSnapshot;
    if (!v) return '-';
    return `${v.metalType || '-'} / ${v.purity || '-'} / ${v.metalColor || '-'} / Size ${v.size || '-'}`;
  }

  trackByItem(index: number): number {
    return index;
  }

  trackByStone(index: number): number {
    return index;
  }

  trackByPayment(index: number): number {
    return index;
  }

  trackByStatus(index: number): number {
    return index;
  }
}
