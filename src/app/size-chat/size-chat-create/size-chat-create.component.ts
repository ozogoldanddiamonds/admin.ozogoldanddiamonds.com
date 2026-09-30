import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { SizeChatService } from 'src/app/Services/size-chat.service';
import { SubcategoryService } from 'src/app/Services/subcategory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-size-chat-create',
  templateUrl: './size-chat-create.component.html',
  styleUrls: ['./size-chat-create.component.css']
})
export class SizeChatCreateComponent implements OnInit {
  isSaving: boolean = false;

  sizeChartForm!: FormGroup;

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  subCategories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private sizeChartService: SizeChatService,
    private subCategoryService: SubcategoryService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.sizeChartForm = this.fb.group({
      title: ['', Validators.required],
      subCategory: ['', Validators.required],
      description: [''],
      isActive: [true]
    });

    this.getAllSubCategories();
  }

  //=========================
  // Get Sub Categories
  //=========================
  getAllSubCategories(): void {
    this.subCategoryService.getAllSubCategories().subscribe({
      next: (res: any) => {
        this.subCategories = res?.data || [];
      },
      error: (err) => {
        console.log('Sub Categories Error:', err);
      }
    });
  }

  //=========================
  // Image Change
  //=========================
  onFileChange(event: any): void {
    const file = event?.target?.files?.[0];

    if (!file) {
      this.selectedFile = null;
      this.imagePreview = null;
      return;
    }

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  //=========================
  // Save
  //=========================
  onSubmit(): void {
    this.sizeChartForm.markAllAsTouched();

    if (this.sizeChartForm.invalid || !this.selectedFile) {
      this.isSaving = false;
      return;
    }

    this.isSaving = true;

    const formData = new FormData();

    formData.append('title', this.sizeChartForm.value.title);
    formData.append('subCategory', this.sizeChartForm.value.subCategory);
    formData.append('description', this.sizeChartForm.value.description || '');
    formData.append('isActive', String(this.sizeChartForm.value.isActive));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.sizeChartService.createSizeChart(formData).subscribe({
      next: (res) => {
        console.log(res);

        this.isSaving = false;

        this.alert.success('Size Chart Created Successfully');

        this.router.navigate(['/admin/sizechat-list']);
      },
      error: (err) => {
        this.isSaving = false;

        console.log('Create Size Chart Error:', err);

        const backendMessage =
          err?.error?.message ||
          err?.error?.error ||
          err?.message ||
          'Something went wrong while creating Size Chart';

        Swal.fire({
          icon: 'error',
          title: 'Unable to Create Size Chart',
          text: backendMessage
        });
      }
    });
  }

  //=========================
  // Back
  //=========================
  goBack(): void {
    this.router.navigate(['/admin/sizechat-list']);
  }
}