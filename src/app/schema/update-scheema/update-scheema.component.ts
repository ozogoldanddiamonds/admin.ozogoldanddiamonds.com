import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/Services/alert.service';
import { SchemaService } from 'src/app/Services/schema.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-scheema',
  templateUrl: './update-scheema.component.html',
  styleUrls: ['./update-scheema.component.css']
})
export class UpdateScheemaComponent implements OnInit {

  schemeForm!: FormGroup;

  submitted = false;

  id!: string;

  constructor(

    private fb: FormBuilder,

    private route: ActivatedRoute,

    private router: Router,

    private schemeService: SchemaService

  ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id')!;

    this.schemeForm = this.fb.group({

      name: ['', Validators.required],

      amount: ['', Validators.required],

      durationMonths: [12, Validators.required],

      userPayMonths: [11, Validators.required],

      companyPayMonths: [1, Validators.required],

      monthlyAmount: [{ value: '', disabled: true }],

      description: ['', Validators.required],

      benefits: [''],

      terms: [''],

      isPopular: [false],

      displayOrder: [0]

    });

    this.getSchemeById();

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
  // Get Scheme By Id
  // ==========================

  getSchemeById() {

    this.schemeService.getSchemeById(this.id)

      .subscribe({

        next: (res: any) => {

          const scheme = res.data;

          this.schemeForm.patchValue({

            name: scheme.name,

            amount: scheme.amount,

            durationMonths: scheme.durationMonths,

            userPayMonths: scheme.userPayMonths,

            companyPayMonths: scheme.companyPayMonths,

            monthlyAmount: scheme.monthlyAmount,

            description: scheme.description,

            benefits: scheme.benefits?.join(', '),

            terms: scheme.terms,

            isPopular: scheme.isPopular,

            displayOrder: scheme.displayOrder

          });

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  // ==========================
  // Monthly Amount
  // ==========================

  calculateMonthlyAmount() {

    const amount = Number(

      this.schemeForm.get('amount')?.value

    );

    const duration = Number(

      this.schemeForm.get('durationMonths')?.value

    );

    if (amount > 0 && duration > 0) {

      this.schemeForm.patchValue({

        monthlyAmount: Number(

          (amount / duration).toFixed(2)

        )

      });

    }

  }

  // ==========================
  // Update Scheme
  // ==========================

  updateScheme() {

    this.submitted = true;

    if (this.schemeForm.invalid) {

      return;

    }

    const form = this.schemeForm.getRawValue();

    if (

      Number(form.userPayMonths)

      +

      Number(form.companyPayMonths)

      !=

      Number(form.durationMonths)

    ) {

      Swal.fire({

        icon: 'warning',

        title: 'Validation',

        text: 'User Pay Months + Company Pay Months must equal Duration Months'

      });

      return;

    }

    const payload = {

      ...form,

      benefits: form.benefits

        ? form.benefits

          .split(',')

          .map((x: string) => x.trim())

          .filter((x: string) => x)

        : []

    };

    this.schemeService

      .updateScheme(

        this.id,

        payload

      )

      .subscribe({

        next: (res: any) => {

          Swal.fire({

            icon: 'success',

            title: 'Success',

            text: res.message,

            timer: 1500,

            showConfirmButton: false

          });

          this.router.navigate([

            '/admin/scheme-list'

          ]);

        },

        error: (err: any) => {

          Swal.fire({

            icon: 'error',

            title: 'Oops...',

            text:

              err.error?.message ||

              'Failed To Update Scheme'

          });

        }

      });

  }

}