import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminLoginService } from 'src/app/Services/admin-login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-branch-update',
  templateUrl: './sub-branch-update.component.html',
  styleUrls: ['./sub-branch-update.component.css']
})
export class SubBranchUpdateComponent implements OnInit {
  branchList: any[] = [];
  changePassword: boolean = false;
  userForm!: FormGroup;

  userId!: string;

  constructor(

    private fb: FormBuilder,

    private route: ActivatedRoute,

    private router: Router,

    private adminService: AdminLoginService

  ) { }

  ngOnInit(): void {
    this.getBranchList();

    // Route nundi ID tiskovadam

    this.userId =
      this.route.snapshot.paramMap.get('id')!;

    // Form Create

    this.userForm = this.fb.group({

      name: [
        '',
        Validators.required
      ],
      branchId: ['', Validators.required],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [''],

      role: ['SUB_BRANCH'],

      contactNumber: [''],

      location: [''],

      address: ['']

    });

    // Existing Data Fetch

    this.getSubBranchById();

  }
  getBranchList() {

    this.adminService
      .getBranchList()
      .subscribe({

        next: (res: any) => {

          this.branchList = res.data;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }
  // ===========================
  // GET BY ID
  // ===========================

  getSubBranchById() {

    this.adminService
      .getSubBranchById(this.userId)
      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.userForm.patchValue({

            name:
              res.data.name,

            email:
              res.data.email,


            role:
              res.data.role,
            branchId: res.data.branchId?._id || res.data.branchId, // 👈 Add this


            contactNumber:
              res.data.contactNumber,

            location:
              res.data.location,

            address:
              res.data.address

          });

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // ===========================
  // UPDATE
  // ===========================

  updateUser() {

    if (
      this.userForm.invalid
    ) {

      this.userForm
        .markAllAsTouched();

      return;

    }

    this.adminService
      .updateSubBranch(

        this.userId,

        this.userForm.value

      )
      .subscribe({

        next: (res: any) => {

          Swal.fire({

            icon: 'success',

            title: 'Success',

            text:
              res.message,

            confirmButtonColor:
              '#7a0000'

          }).then(() => {

            this.router.navigate([
              '/admin/subranch-list'
            ]);

          });

        },

        error: (err) => {

          Swal.fire({

            icon: 'error',

            title: 'Error',

            text:
              err?.error?.message ||
              'Update Failed'

          });

        }

      });

  }

  // ===========================
  // BACK
  // ===========================

  goBack() {

    this.router.navigate([
      '/admin/subranch-list'
    ]);

  }

}