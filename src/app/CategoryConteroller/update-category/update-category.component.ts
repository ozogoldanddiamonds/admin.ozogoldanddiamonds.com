import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  categoryForm!: FormGroup;

  selectedFile: File | null = null;

  imagePreview: any = null;

  categoryId!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: CategoryService
  ) {}

  ngOnInit(): void {

    this.categoryForm =
      this.fb.group({
        name: ['', Validators.required],
        image: ['']
      });

    // GET ID FROM URL
    this.categoryId =
      this.route.snapshot.paramMap.get('id')!;

    // FETCH DATA
    this.getCategoryById();
  }

  getCategoryById() {
    this.service
      .getCategoryById(this.categoryId)
      .subscribe((res: any) => {

        const data = res.data;

        // PATCH VALUES
        this.categoryForm.patchValue({
          name: data.name
        });

        // IMAGE PREVIEW
        this.imagePreview = data.image;
      });
  }

  onFileChange(event: any) {
    const file =
      event.target.files[0];

    if (file) {
      this.selectedFile = file;

      const reader =
        new FileReader();

      reader.onload = () => {
        this.imagePreview =
          reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

 onSubmit() {

  const formData =
    new FormData();

  formData.append(

    'name',

    this.categoryForm.value.name

  );

  // ONLY IF IMAGE SELECTED

  if (this.selectedFile) {

    formData.append(

      'image',

      this.selectedFile

    );

  }

  this.service
    .updateCategory(

      this.categoryId,

      formData

    )
   .subscribe({

  next: () => {

    Swal.fire({

      icon: 'success',

      title: 'Success',

      text: 'Updated Successfully',

      timer: 2000,

      timerProgressBar: true,

      showConfirmButton: false,

      customClass: {
        popup: 'success-popup'
      }

    });

    this.router.navigate([
      '/admin/category'
    ]);

  },

  error: (err: any) => {

    console.log('ERROR =>', err);

    Swal.fire({

      icon: 'error',

      title: 'Error',

      text: err?.error?.message || 'Update Failed',

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

  goBack() {
    this.router.navigate([
      '/admin/category'
    ]);
  }
}