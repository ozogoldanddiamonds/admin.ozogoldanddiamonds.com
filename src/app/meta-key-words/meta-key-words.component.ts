import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MetaKeyWordsService } from '../Services/meta-key-words.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from '../Services/alert.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MetaViewDetailsComponent } from '../meta-view-details/meta-view-details.component';

@Component({
  selector: 'app-meta-key-words',
  templateUrl: './meta-key-words.component.html',
  styleUrls: ['./meta-key-words.component.css']
})
export class MetaKeyWordsComponent implements OnInit, AfterViewInit {
  role: string = '';
  displayedColumns: string[] = [
    'sno',
    'metaTitle',
    'metaKeywords',
    'isActive',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>([]);

  selectedSEO: any = null;
  isEditing = false;
  saving = false;
  hasExistingRecord = false;

  seoForm!: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private metaSeoService: MetaKeyWordsService,
    private fb: FormBuilder,
    private toastr: AlertService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getMetaSEO();
    this.role = localStorage.getItem('role') || '';
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initializeForm(): void {
    this.seoForm = this.fb.group({
      metaTitle: ['', [Validators.required, Validators.maxLength(70)]],
      metaDescription: ['', Validators.maxLength(320)],
      metaKeywordsText: [''],
      canonicalUrl: [''],
      ogTitle: [''],
      ogDescription: [''],
      ogImage: [''],
      isActive: [true]
    });
  }

  getMetaSEO(): void {
    this.metaSeoService.getMetaKeywordsSEO().subscribe({
      next: (response: any) => {
        if (response?.success && response?.data) {
          const seo = response.data;

          this.dataSource.data = [seo];
          this.selectedSEO = null;
          this.isEditing = false;
          this.hasExistingRecord = true;

          this.dataSource.filterPredicate = (
            data: any,
            filter: string
          ): boolean => {
            const searchableText = [
              data.metaTitle,
              data.metaDescription,
              ...(data.metaKeywords || [])
            ].join(' ').toLowerCase();

            return searchableText.includes(filter);
          };

          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }

          if (this.sort) {
            this.dataSource.sort = this.sort;
          }
        } else {
          this.dataSource.data = [];
          this.hasExistingRecord = false;
        }
      },
      error: (error: any) => {
        if (error?.status === 404) {
          // First-time setup: no record exists yet.
          this.dataSource.data = [];
          this.hasExistingRecord = false;
          return;
        }

        console.error('Error fetching homepage SEO:', error);
        this.toastr.error('Failed to load homepage SEO settings');
      }
    });
  }

  applyFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // View button click
  viewSEO(seo: any): void {

    if (!seo?._id) {
      Swal.fire('Error', 'SEO record ID not found', 'error');
      return;
    }

    this.dialog.open(MetaViewDetailsComponent, {
      width: '750px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: {
        id: seo._id
      },
      autoFocus: false,
      restoreFocus: true
    });

  }

  editSEO(seo: any): void {
    if (!seo?._id) {
      Swal.fire('Error', 'SEO record ID not found', 'error');
      return;
    }

    this.router.navigate(['/admin/meta-key-words-upsert', seo._id]);
  }

}
