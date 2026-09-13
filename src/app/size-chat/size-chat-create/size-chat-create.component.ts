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


  sizeChartForm!: FormGroup;

  selectedFile: File | null = null;

  imagePreview: any = null;

  subCategories: any[] = [];

  constructor(

    private fb: FormBuilder,

    private sizeChartService: SizeChatService,

    private subCategoryService: SubcategoryService,

    private router: Router,

    private alert: AlertService

  ) { }

  ngOnInit(): void {

    this.sizeChartForm = this.fb.group({

      title: ['', Validators.required],

      subCategory: ['', Validators.required],

      description: [''],

      image: ['', Validators.required],

      isActive: [true]

    });

    this.getAllSubCategories();

  }

  //=========================
  // Get Sub Categories
  //=========================

  getAllSubCategories() {

    this.subCategoryService
      .getAllSubCategories()
      .subscribe({

        next: (res: any) => {

          this.subCategories = res.data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  //=========================
  // Image
  //=========================

 onFileChange(event: any) {

  if (event.target.files && event.target.files.length > 0) {

    const file = event.target.files[0];

    this.selectedFile = file;

    const reader = new FileReader();

    reader.onload = () => {

      this.imagePreview = reader.result;

    };

    reader.readAsDataURL(file);

    this.sizeChartForm.patchValue({

      image: file

    });

  }

}

  //=========================
  // Save
  //=========================

  onSubmit() {

    if (this.sizeChartForm.invalid) {

      return;

    }

    const formData = new FormData();

    formData.append(
      'title',
      this.sizeChartForm.value.title
    );

    formData.append(
      'subCategory',
      this.sizeChartForm.value.subCategory
    );

    formData.append(
      'description',
      this.sizeChartForm.value.description
    );

    formData.append(
      'isActive',
      this.sizeChartForm.value.isActive
    );

    if (this.selectedFile) {

      formData.append(
        'image',
        this.selectedFile
      );

    }

    this.sizeChartService
      .createSizeChart(formData)
      .subscribe({

        next: (res) => {

          console.log(res);

          this.alert.success(
            'Size Chart Created Successfully'
          );

          this.router.navigate([
            '/admin/size-chart'
          ]);

        },

        error: (err) => {

          Swal.fire({

            icon: 'error',

            title: 'Oops...',

            text:
              err.error.message ||
              'Failed To Create Size Chart'

          });

        }

      });

  }

  //=========================

  goBack() {

    this.router.navigate([
      '/admin/size-chart'
    ]);

  }

}