import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  // =====================================
  // PRODUCT DATA
  // =====================================

  selectedProduct: any;

  // =====================================
  // CONSTRUCTOR
  // =====================================

constructor(

  public dialogRef: MatDialogRef<ViewProductComponent>,

  @Inject(MAT_DIALOG_DATA)
  public data: any

) {

}

  // =====================================
  // ON INIT
  // =====================================

  ngOnInit(): void {

  if (this.data.productId) {
    // Assigned Products page nunchi vachindi
    this.selectedProduct = this.data.productId;

    // Assigned variant ni use cheyyi
    if (this.data.variant) {
      this.selectedProduct.variants = [this.data.variant];
    }

  } else {
    // Product List page nunchi vachindi
    this.selectedProduct = this.data;
  }

  }



  // =====================================
  // CHECK VIDEO
  // =====================================

  hasVideo(): boolean {

    return !!this.selectedProduct?.video;

  }

  // =====================================
  // GET VIDEO URL
  // =====================================

  getVideoUrl(): string {

    return this.selectedProduct?.video
      ? this.selectedProduct.video
      : '';

  }

  // =====================================
  // CHECK CERTIFICATE
  // =====================================

  hasCertificate(
    diamond: any
  ): boolean {

    return !!diamond.certificateUrl;

  }

  // =====================================
  // CHECK CERTIFICATE IMAGE
  // =====================================

  isCertificateImage(
    url: string
  ): boolean {

    return (

      url.includes('.jpg')

      ||

      url.includes('.jpeg')

      ||

      url.includes('.png')

      ||

      url.includes('.webp')

    );

  }

  // =====================================
  // CHECK CERTIFICATE PDF
  // =====================================

  isCertificatePdf(
    url: string
  ): boolean {

    return url.includes('.pdf');

  }

  // =====================================
  // FORMAT PRICE
  // =====================================

  formatPrice(
    price: number
  ): string {

    return new Intl.NumberFormat(

      'en-IN',

      {

        minimumFractionDigits: 0,

        maximumFractionDigits: 2

      }

    ).format(price);

  }
  // =====================================
  // CLOSE DIALOG
  // =====================================


  closeDialog(): void {

    this.dialogRef.close();

  }
}
