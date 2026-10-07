import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsCustomDatesViewComponent } from 'ngx-bootstrap/datepicker/themes/bs/bs-custom-dates-view.component';
import { CustomDesignViewComponent } from 'src/app/custom-design-view/custom-design-view.component';
import { CustomDesignRequest } from 'src/app/models/custom-design-request';
import { CustomdesignService } from 'src/app/Services/customdesign.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-custom-design-list',
  templateUrl: './custom-design-list.component.html',
  styleUrls: ['./custom-design-list.component.css']
})
export class CustomDesignListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'sno',
    'requestNumber',
    'customer',
    'category',
    'subCategory',
    // 'description',
    'requiredDate',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<CustomDesignRequest>([]);

  customDesignRequests: CustomDesignRequest[] = [];

  selectedRequest: CustomDesignRequest | null = null;

  loading = false;

  role = '';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;
  request: any;


  constructor(
    private customDesignService: CustomdesignService,
    private dialog: MatDialog
  ) { }


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {

    this.role = localStorage.getItem('role') || '';

    this.getAllCustomDesignRequests();
  }


  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;
  }


  // =========================================================
  // GET ALL REQUESTS
  // =========================================================

  getAllCustomDesignRequests(): void {

    this.loading = true;

    this.customDesignService
      .getAllCustomDesignRequests()
      .subscribe({

        next: (res: any) => {

          this.loading = false;

          console.log(
            'ALL CUSTOM DESIGN RESPONSE:',
            res
          );

          if (res?.success) {

            this.customDesignRequests =
              res.data || [];

            this.dataSource.data =
              this.customDesignRequests;

          } else {

            this.customDesignRequests = [];

            this.dataSource.data = [];

            Swal.fire({
              icon: 'error',
              title: 'Error',
              text:
                res?.message ||
                'Failed to load custom design requests'
            });
          }
        },

        error: (error: any) => {

          this.loading = false;

          console.error(
            'GET ALL CUSTOM DESIGN ERROR:',
            error
          );

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text:
              error?.error?.message ||
              'Failed to load custom design requests'
          });
        }
      });
  }


  // =========================================================
  // SEARCH / FILTER
  // =========================================================

  applyFilter(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    const filterValue =
      input?.value?.trim().toLowerCase() || '';

    this.dataSource.filter =
      filterValue;

    if (this.dataSource.paginator) {

      this.dataSource.paginator.firstPage();
    }
  }


  // =========================================================
  // VIEW REQUEST
  // =========================================================

  viewRequest(
    request: CustomDesignRequest
  ): void {

    console.log(
      'VIEW CLICKED:',
      request
    );

    console.log(
      'REQUEST ID:',
      request?._id
    );


    if (!request?._id) {

      Swal.fire({
        icon: 'error',
        title: 'Invalid Request',
        text: 'Request ID is missing.'
      });

      return;
    }


    this.loading = true;


    this.customDesignService
      .getCustomDesignRequestById(request._id)
      .subscribe({

        next: (res: any) => {

          this.loading = false;

          console.log(
            'VIEW API RESPONSE:',
            res
          );


          if (
            res?.success &&
            res?.data
          ) {

            this.selectedRequest =
              res.data;


            this.dialog.open(
              CustomDesignViewComponent,
              {
                width: '900px',

                maxWidth: '95vw',

                maxHeight: '90vh',

                data: res.data,

                disableClose: false
              }
            );

          } else {

            Swal.fire({
              icon: 'error',
              title: 'Not Found',
              text:
                res?.message ||
                'Request details not found.'
            });
          }
        },

        error: (error: any) => {

          this.loading = false;

          console.error(
            'VIEW REQUEST ERROR:',
            error
          );

          console.error(
            'ERROR BODY:',
            error?.error
          );


          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text:
              error?.error?.message ||
              'Failed to load request details.'
          });
        }
      });
  }


  // =========================================================
  // DELETE REQUEST
  // =========================================================

  deleteRequest(
    request: CustomDesignRequest
  ): void {

    if (!request?._id) {

      Swal.fire({
        icon: 'error',
        title: 'Invalid Request',
        text: 'Request ID is missing.'
      });

      return;
    }


    Swal.fire({

      title: 'Are you sure?',

      text:
        'This custom design request will be permanently deleted.',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Yes, Delete',

      cancelButtonText: 'Cancel',

      confirmButtonColor: '#d33',

      cancelButtonColor: '#6c757d'

    }).then((result) => {

      if (!result.isConfirmed) {
        return;
      }


      this.loading = true;


      this.customDesignService
        .deleteCustomDesignRequest(request._id)
        .subscribe({

          next: (res: any) => {

            this.loading = false;

            console.log(
              'DELETE RESPONSE:',
              res
            );


            if (res?.success) {

              // Remove from local array
              this.customDesignRequests =
                this.customDesignRequests.filter(
                  item =>
                    item._id !== request._id
                );


              // Update table
              this.dataSource.data =
                this.customDesignRequests;


              Swal.fire({
                icon: 'success',
                title: 'Deleted',
                text:
                  res?.message ||
                  'Custom design request deleted successfully.',
                timer: 1800,
                showConfirmButton: false
              });

            } else {

              Swal.fire({
                icon: 'error',
                title: 'Delete Failed',
                text:
                  res?.message ||
                  'Failed to delete request.'
              });
            }
          },

          error: (error: any) => {

            this.loading = false;

            console.error(
              'DELETE REQUEST ERROR:',
              error
            );

            console.error(
              'DELETE ERROR BODY:',
              error?.error
            );


            Swal.fire({
              icon: 'error',
              title: 'Delete Failed',
              text:
                error?.error?.message ||
                'Failed to delete custom design request.'
            });
          }
        });

    });
  }


  // =========================================================
  // STATUS CLASS
  // =========================================================

  getStatusClass(
    status: string
  ): string {

    switch (status) {

      case 'NEW':
        return 'status-new';

      case 'CONTACTED':
        return 'status-contacted';

      case 'DISCUSSION':
        return 'status-discussion';

      case 'QUOTATION_SENT':
        return 'status-quotation';

      case 'ACCEPTED':
        return 'status-accepted';

      case 'ORDER_CREATED':
        return 'status-order';

      case 'IN_PRODUCTION':
        return 'status-production';

      case 'COMPLETED':
        return 'status-completed';

      case 'REJECTED':
        return 'status-rejected';

      case 'CANCELLED':
        return 'status-cancelled';

      default:
        return '';
    }
  }


  // =========================================================
  // TRACK BY
  // =========================================================

  trackByRequestId(
    index: number,
    request: CustomDesignRequest
  ): string {

    return request?._id || index.toString();
  }

  closeRequestDetails(): void {
    this.selectedRequest = null;
  }

}