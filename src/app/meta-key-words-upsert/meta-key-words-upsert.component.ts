import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlertService } from '../Services/alert.service';
import { MetaKeyWordsService } from '../Services/meta-key-words.service';

@Component({
  selector: 'app-meta-key-words-upsert',
  templateUrl: './meta-key-words-upsert.component.html',
  styleUrls: ['./meta-key-words-upsert.component.css']
})
export class MetaKeyWordsUpsertComponent implements OnInit {

  isSaving = false;
  seoForm!: FormGroup;
  seoId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: MetaKeyWordsService
  ) { }

  ngOnInit(): void {

    this.seoForm = this.fb.group({
      metaTitle: ['', Validators.required],
      metaDescription: ['', Validators.required],
      metaKeywordsText: ['', Validators.required],
      canonicalUrl: ['', Validators.required],
      ogTitle: ['', Validators.required],
      ogDescription: ['', Validators.required],
      ogImage: [''],
      isActive: [true]
    });

    // GET ID FROM URL
    this.seoId =
      this.route.snapshot.paramMap.get('id') || '';

    if (!this.seoId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'SEO record ID not found'
      });

      this.goBack();
      return;
    }

    // FETCH DATA AND PATCH FORM
    this.getSEOById();
  }

  getSEOById(): void {

    this.service
      .getMetaKeywordsSEOById(this.seoId)
      .subscribe({

        next: (res: any) => {

          const data = res?.data;

          if (!data) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'SEO data not found'
            });
            return;
          }

          this.seoForm.patchValue({
            metaTitle: data.metaTitle || '',
            metaDescription: data.metaDescription || '',

            metaKeywordsText: Array.isArray(data.metaKeywords)
              ? data.metaKeywords.join(', ')
              : '',

            canonicalUrl: data.canonicalUrl || '',
            ogTitle: data.ogTitle || '',
            ogDescription: data.ogDescription || '',
            ogImage: data.ogImage || '',
            isActive: data.isActive ?? true
          });

        },

        error: (err: any) => {

          console.error('GET SEO ERROR =>', err);

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err?.error?.message || 'Failed to fetch SEO data'
          });

        }

      });
  }

  onSubmit(): void {

    if (this.seoForm.invalid || this.isSaving) {
      this.seoForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;

    const formValue = this.seoForm.getRawValue();

    const payload = {
      pageKey: 'home',

      metaTitle: formValue.metaTitle.trim(),
      metaDescription: formValue.metaDescription.trim(),

      metaKeywords: formValue.metaKeywordsText
        .split(',')
        .map((keyword: string) => keyword.trim())
        .filter((keyword: string) => keyword.length > 0),

      canonicalUrl: formValue.canonicalUrl.trim(),
      ogTitle: formValue.ogTitle.trim(),
      ogDescription: formValue.ogDescription.trim(),
      ogImage: formValue.ogImage.trim(),
      isActive: formValue.isActive
    };

    // CALL EXISTING UPSERT API
    this.service
      .updateMetaKeywordsSEO(payload)
      .subscribe({

        next: (res: any) => {

          this.isSaving = false;

          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: res?.message || 'SEO updated successfully',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: {
              popup: 'success-popup'
            }
          }).then(() => {
            this.router.navigate(['/admin/meta-key-words']);
          });

        },

        error: (err: any) => {

          console.error('UPSERT SEO ERROR =>', err);

          this.isSaving = false;

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err?.error?.message || 'Update failed',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: {
              popup: 'error-popup'
            }
          });

        }

      });
  }

  goBack(): void {
    this.router.navigate(['/admin/meta-key-words']);
  }

}
