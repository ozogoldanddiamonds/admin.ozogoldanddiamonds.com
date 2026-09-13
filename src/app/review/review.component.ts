import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Review } from '../models/review';
import { ReviewService } from '../Services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  displayedColumns: string[] = [

    'sno',

    'product',

    'user',

    'rating',

    'title',

    'images',

    'createdAt'

  ];

  dataSource =
    new MatTableDataSource<Review>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private reviewService:
      ReviewService
  ) { }

  ngOnInit(): void {

    this.getAllReviews();

  }

  getAllReviews(): void {

    this.reviewService
      .getAllReviews()
      .subscribe({

        next: (
          response
        ) => {

          this.dataSource.data =
            response.data;

          this.dataSource.paginator =
            this.paginator;

          this.dataSource.sort =
            this.sort;

        },

        error: (
          error
        ) => {

          console.error(
            error
          );

        }

      });

  }

  applyFilter(
    event: Event
  ) {

    const filterValue =

      (event.target as HTMLInputElement)
        .value;

    this.dataSource.filter =

      filterValue
        .trim()
        .toLowerCase();

  }

}
