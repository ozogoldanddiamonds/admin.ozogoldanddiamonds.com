import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminLoginService } from '../../Services/admin-login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-branch',
  templateUrl: './sub-branch.component.html',
  styleUrls: ['./sub-branch.component.css']
})
export class SubBranchComponent implements OnInit {

  userForm!: FormGroup;
  branchList: any[] = [];


  constructor(
    private fb: FormBuilder,
        private authService: AdminLoginService,
         private router:
              Router
    
  ) {}

  ngOnInit(): void {
     this.getBranchList();

    this.userForm = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        Validators.required
      ],

      role: [
        '',
        Validators.required
      ],

      contactNumber: [
  '',
  [
    Validators.required,
    Validators.pattern(/^[0-9]{10}$/)
  ]
],

      location: [''],

      address: [''],

      branchId:['']

    });

  }

 createUser() {

  const payload = this.userForm.value;

  this.authService
    .register(payload)
    .subscribe({

     next: (response: any) => {

  Swal.fire({

    icon: 'success',

    title: 'Success',

    text: response.message,

    confirmButtonColor: '#7a0000'

  }).then(() => {

    this.router.navigate([
      '/admin/subranch-list'
    ]);

  });

},

      error: (err) => {

        console.log(err);

      }

    });

}
allowOnlyNumbers(event: KeyboardEvent) {

  const charCode = event.which ? event.which : event.keyCode;

  if (charCode < 48 || charCode > 57) {
    event.preventDefault();
  }

}
getBranchList() {

  this.authService
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

 goBack() {
    this.router.navigate([
      '/admin/subranch-list'
    ]);
  }

}