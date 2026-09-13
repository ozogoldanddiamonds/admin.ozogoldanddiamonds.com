import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SchemePaymentService } from 'src/app/Services/scheme-payment.service';
import { ViewPaymentSchemeComponent } from 'src/app/View-dialog-Controllers/view-payment-scheme/view-payment-scheme.component';

@Component({
  selector: 'app-schema-payment-list',
  templateUrl: './schema-payment-list.component.html',
  styleUrls: ['./schema-payment-list.component.css']
})
export class SchemaPaymentListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [

    'sno',

    'user',

    'monthNo',

    'amount',

    'paymentMode',

    'gateway',

    'status',

    'paymentDate',

    'actions'

  ];

  paymentList: any[] = [];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(

    private paymentService: SchemePaymentService,

    private dialog: MatDialog

  ) { }

  ngOnInit(): void {

    this.getAllPayments();

    // Search Filter

    this.dataSource.filterPredicate = (

      data: any,

      filter: string

    ) => {

      const search = (

        (data.user?.name || '') +

        ' ' +

        (data.paymentMode || '') +

        ' ' +

        (data.gateway || '') +

        ' ' +

        (data.status || '')

      ).toLowerCase();

      return search.includes(filter);

    };

  }

  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;

  }

  // ==========================
  // Get All Payments
  // ==========================

  getAllPayments(): void {

    this.paymentService.getAllPayments()

      .subscribe({

        next: (res: any) => {

          console.log(res);

          this.paymentList = res.data;

          this.dataSource.data = this.paymentList;

        },

        error: (err: any) => {

          console.log(err);

        }

      });

  }

  // ==========================
  // Search
  // ==========================

  applyFilter(event: Event): void {

    const filterValue = (

      event.target as HTMLInputElement

    ).value;

    this.dataSource.filter =

      filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();

    }

  }

  // ==========================
  // View Payment
  // ==========================

  viewPayment(element: any): void {

    this.dialog.open(

      ViewPaymentSchemeComponent,

      {

        width: '850px',

        data: element

      }

    );

  }

}
