import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SchemaService } from 'src/app/Services/schema.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-scheema',
  templateUrl: './create-scheema.component.html',
  styleUrls: ['./create-scheema.component.css']
})
export class CreateScheemaComponent implements OnInit {

  schemeForm!: FormGroup;

  submitted = false;

  constructor(

    private fb: FormBuilder,

    private schemeService: SchemaService,

    private router: Router

  ) { }

  ngOnInit(): void {

    this.schemeForm = this.fb.group({

      name: ['', Validators.required],

      amount: ['', Validators.required],

      durationMonths: [12, Validators.required],

      userPayMonths: [11, Validators.required],

      companyPayMonths: [1, Validators.required],

      monthlyAmount: [{ value: 0, disabled: true }],

      description: ['', Validators.required],

      benefits: [''],

      terms: [''],

      isPopular: [false],

      displayOrder: [0]

    });

    // ======================
    // Auto Calculate
    // ======================

    this.schemeForm.get('amount')?.valueChanges.subscribe(() => {

      this.calculateMonthlyAmount();

    });

    this.schemeForm.get('durationMonths')?.valueChanges.subscribe(() => {

      this.calculateMonthlyAmount();

    });

  }

  get f() {

    return this.schemeForm.controls;

  }

  // ==========================
  // Calculate Monthly Amount
  // ==========================

  calculateMonthlyAmount() {

    const amount = Number(
      this.schemeForm.get('amount')?.value
    );

    const duration = Number(
      this.schemeForm.get('durationMonths')?.value
    );

    if (amount > 0 && duration > 0) {

      const monthly = Number(

        (amount / duration).toFixed(2)

      );

      this.schemeForm.patchValue({

        monthlyAmount: monthly

      });

    }

  }

  // ==========================
  // Create Scheme
  // ==========================

  createScheme() {

    this.submitted = true;

    if (this.schemeForm.invalid) {

      return;

    }

    const form = this.schemeForm.getRawValue();

    // ======================
    // Month Validation
    // ======================

    if (

      Number(form.userPayMonths)

      +

      Number(form.companyPayMonths)

      !==

      Number(form.durationMonths)

    ) {

      Swal.fire({

        icon: 'warning',

        title: 'Validation',

        text: 'User Pay Months + Company Pay Months must equal Duration Months'

      });

      return;

    }

    // ======================
    // Payload
    // ======================

    const payload = {

      name: form.name,

      amount: Number(form.amount),

      durationMonths: Number(form.durationMonths),

      userPayMonths: Number(form.userPayMonths),

      companyPayMonths: Number(form.companyPayMonths),

      monthlyAmount: Number(form.monthlyAmount),

      description: form.description,

      benefits: form.benefits

        ? form.benefits
            .split(',')
            .map((x: string) => x.trim())
            .filter((x: string) => x)

        : [],

      terms: form.terms,

      isPopular: form.isPopular,

      displayOrder: Number(form.displayOrder)

    };

    console.log(payload);

    this.schemeService.createScheme(payload)

      .subscribe({

        next: (res: any) => {

          Swal.fire({

            icon: 'success',

            title: 'Success',

            text: res.message,

            timer: 1500,

            showConfirmButton: false

          });

          this.schemeForm.reset();

          this.router.navigate([

            '/admin/scheme-list'

          ]);

        },

        error: (err: any) => {

          Swal.fire({

            icon: 'error',

            title: 'Error',

            text:

              err.error?.message ||

              'Failed To Create Scheme'

          });

        }

      });

  }

}