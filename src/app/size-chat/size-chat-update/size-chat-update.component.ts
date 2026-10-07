import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { SizeChatService } from 'src/app/Services/size-chat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-size-chat-update',
  templateUrl: './size-chat-update.component.html',
  styleUrls: ['./size-chat-update.component.css']
})
export class SizeChatUpdateComponent implements OnInit {

  // =========================
  // VARIABLES
  // =========================

  isSaving: boolean = false;

  sizeChartForm!: FormGroup;

  sizeChartId: string = '';

  subCategories: any[] = [];

  selectedFile: File | null = null;

  imagePreview: string | null = null;

  oldImage: string = '';


  // =========================
  // CONSTRUCTOR
  // =========================

  constructor(
    private fb: FormBuilder,
    private sizeChartService: SizeChatService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private alert: AlertService
  ) {

    // =========================
    // FORM
    // =========================

    this.sizeChartForm = this.fb.group({

      title: [
        '',
        Validators.required
      ],

      subCategory: [
        '',
        Validators.required
      ],

      description: [
        ''
      ],

      image: [
        ''
      ]

    });

  }


  // =========================
  // NG ON INIT
  // =========================

  ngOnInit(): void {

    this.sizeChartId =
      this.activeRoute.snapshot
        .paramMap
        .get('id') || '';

    console.log(
      this.sizeChartId,
      'size chart id'
    );

    this.getSizeChartById();

  }


  // =========================
  // GET SIZE CHART BY ID
  // =========================

  getSizeChartById(): void {

    if (!this.sizeChartId) {

      console.error(
        'Size Chart ID not found'
      );

      return;

    }


    /*
      Existing service lo
      getSizeChartBySubCategory() undi,
      but ID based GET method ledu.

      So getAllSizeCharts() use chesi
      required record ni find chestunnam.
    */

    this.sizeChartService
      .getAllSizeCharts()
      .subscribe({

        next: (response: any) => {

          console.log(
            response,
            'all size charts'
          );


          const sizeCharts =
            response?.data || [];


          const sizeChart =
            sizeCharts.find(
              (item: any) =>
                item._id === this.sizeChartId
            );


          if (!sizeChart) {

            console.error(
              'Size Chart not found'
            );

            return;

          }


          console.log(
            sizeChart,
            'selected size chart'
          );


          // =========================
          // SUB CATEGORIES
          // =========================

          this.loadSubCategories(
            sizeCharts
          );


          // =========================
          // SUB CATEGORY ID
          // =========================

          let subCategoryId = '';


          if (
            sizeChart.subCategory &&
            typeof sizeChart.subCategory === 'object'
          ) {

            subCategoryId =
              sizeChart.subCategory._id || '';

          } else {

            subCategoryId =
              sizeChart.subCategory || '';

          }


          // =========================
          // PATCH FORM
          // =========================

          this.sizeChartForm.patchValue({

            title:
              sizeChart.title || '',

            subCategory:
              subCategoryId,

            description:
              sizeChart.description || ''

          });


          // =========================
          // EXISTING IMAGE
          // =========================

          this.oldImage =
            sizeChart.image || '';

          this.imagePreview =
            this.oldImage;


          console.log(
            'Existing Image:',
            this.oldImage
          );

        },


        error: (error) => {

          console.error(
            'Get Size Chart Error:',
            error
          );

        }

      });

  }


  // =========================
  // LOAD SUB CATEGORIES
  // =========================

  loadSubCategories(
    sizeCharts: any[]
  ): void {

    const categories: any[] = [];


    sizeCharts.forEach(
      (item: any) => {

        if (
          item.subCategory &&
          typeof item.subCategory === 'object'
        ) {

          const exists =
            categories.find(
              (category: any) =>
                category._id ===
                item.subCategory._id
            );


          if (!exists) {

            categories.push(
              item.subCategory
            );

          }

        }

      }
    );


    this.subCategories =
      categories;


    console.log(
      'Sub Categories:',
      this.subCategories
    );

  }


  // =========================
  // FILE CHANGE
  // =========================

  onFileChange(
    event: any
  ): void {

    const file =
      event.target.files?.[0];


    if (!file) {

      return;

    }


    console.log(
      file,
      'selected file'
    );


    this.selectedFile =
      file;


    // =========================
    // FORM IMAGE VALUE
    // =========================

    this.sizeChartForm
      .patchValue({

        image: file

      });


    this.sizeChartForm
      .get('image')
      ?.markAsTouched();


    // =========================
    // IMAGE PREVIEW
    // =========================

    const reader =
      new FileReader();


    reader.onload = () => {

      this.imagePreview =
        reader.result as string;

    };


    reader.readAsDataURL(file);

  }


  // =========================
  // SUBMIT / UPDATE
  // =========================

  onSubmit(): void {

    // =========================
    // VALIDATION
    // =========================

    if (
      this.sizeChartForm.invalid
    ) {

      this.sizeChartForm
        .markAllAsTouched();

      return;

    }


    // =========================
    // ID CHECK
    // =========================

    if (!this.sizeChartId) {

      console.error(
        'Size Chart ID missing'
      );

      return;

    }


    this.isSaving = true;


    // =========================
    // FORM DATA
    // =========================

    const formData =
      new FormData();


    // Title

    formData.append(
      'title',
      this.sizeChartForm
        .get('title')
        ?.value || ''
    );


    // Sub Category

    formData.append(
      'subCategory',
      this.sizeChartForm
        .get('subCategory')
        ?.value || ''
    );


    // Description

    formData.append(
      'description',
      this.sizeChartForm
        .get('description')
        ?.value || ''
    );


    // =========================
    // NEW IMAGE
    // =========================

    /*
      User new image select chesthe
      matrame image append chestam.

      Image select cheyyakapothe
      existing image backend lo
      unchanged ga untundi.
    */

    if (this.selectedFile) {

      formData.append(
        'image',
        this.selectedFile
      );

    }


    console.log(
      'Updating Size Chart:',
      this.sizeChartId
    );


    console.log(
      'Update Form Values:',
      this.sizeChartForm.value
    );


    // =========================
    // API CALL
    // =========================

    this.sizeChartService
      .updateSizeChart(
        this.sizeChartId,
        formData
      )
      .subscribe({

        // =========================
        // SUCCESS
        // =========================

        next: (response: any) => {

          console.log(
            response,
            'update response'
          );


          this.isSaving = false;


          // Success message
          this.alert.success(
            'Updated Successfully'
          );


          // =========================
          // GO TO LIST PAGE
          // =========================

          this.router.navigate([
            '/admin/size-chat-list'
          ]);

        },


        // =========================
        // ERROR
        // =========================

        error: (error) => {

          console.error(
            'Update Size Chart Error:',
            error
          );


          this.isSaving = false;


          Swal.fire({

            icon: 'error',

            title: 'Oops...',

            text: 'Update Failed'

          });

        }

      });

  }


  // =========================
  // BACK
  // =========================

  goBack(): void {

    this.router.navigate([
      '/admin/size-chat-list'
    ]);

  }

}