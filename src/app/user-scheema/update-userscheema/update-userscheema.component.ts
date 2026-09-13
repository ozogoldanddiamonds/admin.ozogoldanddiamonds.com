import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { SchemaService } from 'src/app/Services/schema.service';
import { UserService } from 'src/app/Services/user.service';
import { UserscheemaService } from 'src/app/Services/userscheema.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-userscheema',
  templateUrl: './update-userscheema.component.html',
  styleUrls: ['./update-userscheema.component.css']
})
export class UpdateUserscheemaComponent implements OnInit {

  userSchemeForm!: FormGroup;

  submitted = false;

  id!: string;

  userList: any[] = [];

  schemeList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userSchemeService: UserscheemaService,
    private userService: UserService,
    private schemeService: SchemaService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.userSchemeForm = this.fb.group({

      user: ['', Validators.required],

      scheme: ['', Validators.required],

      schemeAmount: ['', Validators.required],

      monthlyAmount: ['', Validators.required],

      startDate: ['', Validators.required],

      endDate: ['', Validators.required],

      paidMonths: [0],

      status: ['ACTIVE', Validators.required]

    });

    this.id = this.route.snapshot.paramMap.get('id')!;

    this.getAllUsers();

    this.getAllSchemes();

    this.getUserSchemeById();

  }

  get f() {
    return this.userSchemeForm.controls;
  }

  // ============================
  // Get All Users
  // ============================

  getAllUsers() {

    this.userService.getAllUsers().subscribe({

      next: (res: any) => {

        this.userList = res.data;

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }

  // ============================
  // Get All Schemes
  // ============================

  getAllSchemes() {

    this.schemeService.getAllSchemes().subscribe({

      next: (res: any) => {

        this.schemeList = res.data;

      },

      error: (err: any) => {

        console.log(err);

      }

    });

  }

  // ============================
  // Get User Scheme By Id
  // ============================

  getUserSchemeById() {

    this.userSchemeService.getUserSchemeById(this.id).subscribe({

      next: (res: any) => {

        console.log(res);

        this.userSchemeForm.patchValue({

          user: res.data.user?._id || res.data.user,

          scheme: res.data.scheme?._id || res.data.scheme,

          schemeAmount: res.data.schemeAmount,

          monthlyAmount: res.data.monthlyAmount,

          startDate: res.data.startDate
            ? res.data.startDate.substring(0, 10)
            : '',

          endDate: res.data.endDate
            ? res.data.endDate.substring(0, 10)
            : '',

          paidMonths: res.data.paidMonths,

          status: res.data.status

        });

      },

      error: (err: any) => {

        console.log(err);

        Swal.fire({

          icon: 'error',

          title: 'Oops...',

          text: err?.error?.message || 'Failed To Load User Scheme'

        });

      }

    });

  }

  // ============================
  // Auto Fill Amount
  // ============================

  onSchemeChange() {

    const schemeId = this.userSchemeForm.value.scheme;

    const scheme = this.schemeList.find(
      (x: any) => x._id == schemeId
    );

    if (scheme) {

      this.userSchemeForm.patchValue({

        schemeAmount: scheme.amount,

        monthlyAmount: scheme.monthlyAmount

      });

    }

  }

  // ============================
  // Update User Scheme
  // ============================

  updateUserScheme() {

    this.submitted = true;

    if (this.userSchemeForm.invalid) {

      this.userSchemeForm.markAllAsTouched();

      return;

    }

    this.userSchemeService.updateUserScheme(
      this.id,
      this.userSchemeForm.value
    ).subscribe({

      next: (res: any) => {

        console.log(res);

        this.alert.success('User Scheme Updated Successfully');

        this.router.navigate([
          '/admin/user-scheema-list'
        ]);

      },

      error: (err: any) => {

        console.log(err);

        Swal.fire({

          icon: 'error',

          title: 'Oops...',

          text:
            err?.error?.message ||
            'Failed To Update User Scheme'

        });

      }

    });

  }

}