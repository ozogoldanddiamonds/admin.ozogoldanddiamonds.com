import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MetaKeyWordsService } from '../Services/meta-key-words.service';

@Component({
  selector: 'app-meta-view-details',
  templateUrl: './meta-view-details.component.html',
  styleUrls: ['./meta-view-details.component.css']
})
export class MetaViewDetailsComponent implements OnInit {

  seo: any = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private service: MetaKeyWordsService,
    private dialogRef: MatDialogRef<MetaViewDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: { id: string }
  ) { }

  ngOnInit(): void {
    this.getSEOById();
  }

  getSEOById(): void {

    this.service.getMetaKeywordsSEOById(this.dialogData.id)
      .subscribe({

        next: (res: any) => {
          this.seo = res?.data || null;
          this.isLoading = false;

          if (!this.seo) {
            this.errorMessage = 'SEO data not found';
          }
        },

        error: (err: any) => {
          console.error('GET SEO BY ID ERROR:', err);

          this.isLoading = false;
          this.errorMessage =
            err?.error?.message || 'Failed to fetch SEO details';
        }

      });
  }

  close(): void {
    this.dialogRef.close();
  }


}
