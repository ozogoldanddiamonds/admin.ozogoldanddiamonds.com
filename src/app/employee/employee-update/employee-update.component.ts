import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminLoginService } from 'src/app/Services/admin-login.service';
import { AlertService } from 'src/app/Services/alert.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {

  employeeForm!: FormGroup;

  employeeId!: string;

  loading = false;

  subBranches: any[] = [];

  photo!: File;

  aadhaarImage!: File;

  photoPreview: any = '';

  aadhaarPreview: any = '';

  constructor(

    private fb: FormBuilder,

    private employeeService: EmployeeService,

    private adminService: AdminLoginService,

    private alert: AlertService,

    private router: Router,

    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {

    this.employeeId =
      this.route.snapshot.paramMap.get('id')!;

    this.createForm();

    this.getSubBranches();

    this.getEmployee();

  }

  // ==========================
  // CREATE FORM
  // ==========================

  createForm() {

    this.employeeForm =
      this.fb.group({

        firstName: [

          '',

          Validators.required

        ],

        lastName: [

          '',

          Validators.required

        ],

        contactNumber: [

          '',

          [

            Validators.required,

            Validators.pattern(
              '^[0-9]{10}$'
            )

          ]

        ],

        role: [

          '',

          Validators.required

        ],

        subBranchId: [

          '',

          Validators.required

        ],

        address: [

          '',

          Validators.required

        ],

        location: [

          '',

          Validators.required

        ],

        status: [

          'ACTIVE'

        ],
isActive: [true]  
      });

  }
  // ==========================
// GET ALL SUB BRANCHES
// ==========================

getSubBranches() {

  this.adminService

    .getAllSubBranches()

    .subscribe({

      next: (res: any) => {

        this.subBranches = res.data;

      },

      error: (err: any) => {

        console.log(err);

      }

    });

}


// ==========================
// GET EMPLOYEE BY ID
// ==========================

getEmployee() {

  this.employeeService

    .getEmployeeById(this.employeeId)

    .subscribe({

      next: (res: any) => {

        console.log("Employee =>", res);

        const employee = res.data;

        this.employeeForm.patchValue({

          firstName: employee.firstName,

          lastName: employee.lastName,

          contactNumber: employee.contactNumber,

          role: employee.role,

          subBranchId: employee.subBranchId?._id,

          address: employee.address,

          location: employee.location,

          status: employee.status,
           isActive: employee.isActive 

        });

        this.photoPreview = employee.photo;

        this.aadhaarPreview = employee.aadhaarImage;

      },

      error: (err: any) => {

        console.log(err);

      }

    });

}


// ==========================
// PHOTO CHANGE
// ==========================

onPhotoChange(event: any) {

  if (event.target.files.length > 0) {

    this.photo = event.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {

      this.photoPreview = reader.result;

    };

    reader.readAsDataURL(this.photo);

  }

}


// ==========================
// AADHAAR CHANGE
// ==========================

onAadhaarChange(event: any) {

  if (event.target.files.length > 0) {

    this.aadhaarImage = event.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {

      this.aadhaarPreview = reader.result;

    };

    reader.readAsDataURL(this.aadhaarImage);

  }

}
// ==========================
// UPDATE EMPLOYEE
// ==========================

updateEmployee() {

  if (this.employeeForm.invalid) {

    this.employeeForm.markAllAsTouched();

    return;

  }

  this.loading = true;

  const formData = new FormData();

  formData.append(
    'firstName',
    this.employeeForm.value.firstName
  );

  formData.append(
    'lastName',
    this.employeeForm.value.lastName
  );

  formData.append(
    'contactNumber',
    this.employeeForm.value.contactNumber
  );

  formData.append(
    'role',
    this.employeeForm.value.role
  );

  formData.append(
    'subBranchId',
    this.employeeForm.value.subBranchId
  );

  formData.append(
    'address',
    this.employeeForm.value.address
  );

  formData.append(
    'location',
    this.employeeForm.value.location
  );

  formData.append(
    'status',
    this.employeeForm.value.status
  );
  formData.append(
  'isActive',
  this.employeeForm.value.isActive
);

  // Photo
  if (this.photo) {

    formData.append(
      'photo',
      this.photo
    );

  }

  // Aadhaar
  if (this.aadhaarImage) {

    formData.append(
      'aadhaarImage',
      this.aadhaarImage
    );

  }

  this.employeeService

    .updateEmployee(

      this.employeeId,

      formData

    )

    .subscribe({

     next: (res: any) => {

  this.loading = false;

  this.alert.success(res.message);

  setTimeout(() => {

    this.router.navigate([
      '/admin/employee-list'
    ]);

  }, 1500);

},

      error: (err: any) => {

        this.loading = false;

        console.log(err);

        this.alert.error(

          err?.error?.message ||

          'Update Failed'

        );

      }

    });

}


// ==========================
// BACK
// ==========================

goBack() {

  this.router.navigate([

    '/admin/employee-list'

  ]);

}

}