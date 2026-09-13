import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from 'src/app/delete-confirmation/delete-confirmation.component';
import { Ads } from 'src/app/models/ads';
import { AdsService } from 'src/app/Services/ads.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'section',
    'title',
    'description',
    'image',
    'status',

    'actions'
  ];

  dataSource =
    new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private adsService: AdsService,
    private router: Router
  ) { }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.getAds();
  }

  getAds(): void {

    this.adsService
      .getAllAds()
      .subscribe({

        next: (res: any) => {

          const ads = res.data[0];

          const tableData = [

            {
              adsId: ads._id,
              sectionKey: 'section1',
              sectionName: 'Section 1',
              title: ads.section1?.title,
              description: ads.section1?.description,
              image: ads.section1?.image,
              isActive: ads.section1?.isActive
            },
            {
              adsId: ads._id,
              sectionKey: 'section2',
              sectionName: 'Section 2',
              title: ads.section2?.title,
              description: ads.section2?.description,
              image: ads.section2?.image,
              isActive: ads.section2?.isActive
            },

            {
              adsId: ads._id,
              sectionKey: 'section3',
              sectionName: 'Section 3',
              title: ads.section3?.title,
              description: ads.section3?.description,
              image: ads.section3?.image,
              isActive: ads.section3?.isActive
            }

          ];

          this.dataSource.data =
            tableData;

          this.dataSource.paginator =
            this.paginator;

        },

        error: (err) => {
          console.log(err);
        }

      });

  }

  applyFilter(
    event: Event
  ): void {

    const filterValue =
      (event.target as HTMLInputElement)
        .value;

    this.dataSource.filter =
      filterValue
        .trim()
        .toLowerCase();

  }

  editAds(element: any): void {

    this.router.navigate([
      '/admin/update-Ads',
      element.adsId,
      element.sectionKey
    ]);

  }
  changeStatus(element: any) {

    Swal.fire({

      title: 'Change Status',

      input: 'radio',

      inputOptions: {

        true: 'Active',

        false: 'Inactive'


      },


      inputValue:
        element.isActive
          ? 'true'
          : 'false',

      showCancelButton: true,
      confirmButtonColor: ' #640101',

      cancelButtonColor: '#6c757d'

    }).then((result) => {

      if (result.isConfirmed) {

        const isActive =
          result.value === 'true';

        this.adsService
          .updateAdsStatus(
            element.adsId,
            element.sectionKey,
            isActive
          )
          .subscribe({

            next: () => {

              element.isActive =
                isActive;

              Swal.fire(
                'Success',
                'Status Updated',
                'success'
              );

            }

          });

      }

    });

  }

}