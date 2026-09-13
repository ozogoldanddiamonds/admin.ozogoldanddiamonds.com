import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { SchemaService } from 'src/app/Services/schema.service';
import { UserService } from 'src/app/Services/user.service';
import { UserscheemaService } from 'src/app/Services/userscheema.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-userscheema',
  templateUrl: './create-userscheema.component.html',
  styleUrls: ['./create-userscheema.component.css']
})
export class CreateUserscheemaComponent implements OnInit {

  userSchemeForm!: FormGroup;

  submitted = false;

  userList: any[] = [];

  schemeList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userSchemeService: UserscheemaService,
    private userService: UserService,
    private schemeService: SchemaService,
    private alert: AlertService,
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

    this.getAllUsers();

    this.getAllSchemes();

  }

  get f() {
    return this.userSchemeForm.controls;
  }

  // ==========================
  // Get Users
  // ==========================

getAllUsers() {

  this.userService.getAllUsers().subscribe({

    next: (res: any) => {

      console.log(res);

      this.userList = res.data;

      console.log(this.userList);

    },

    error: (err) => {

      console.log(err);

    }

  });

}


  // ==========================
  // Get Schemes
  // ==========================

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


  // ==========================
  // Auto Fill Amount
  // ==========================

  onSchemeChange() {

    const schemeId = this.userSchemeForm.value.scheme;

    const scheme = this.schemeList.find(
      (x: any) => x._id === schemeId
    );

    if (scheme) {

      this.userSchemeForm.patchValue({

        schemeAmount: scheme.amount,

        monthlyAmount: scheme.monthlyAmount

      });

    }

  }


  // ==========================
  // Create User Scheme
  // ==========================

  createUserScheme() {

    this.submitted = true;

    if (this.userSchemeForm.invalid) {

      return;

    }

    this.userSchemeService.createUserScheme(this.userSchemeForm.value)

      .subscribe({

        next: (response: any) => {

          console.log(response);

          this.alert.success('User Scheme Created Successfully');

          this.userSchemeForm.reset();

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
              'Failed To Create User Scheme'

          });

        }

      });

  }

}