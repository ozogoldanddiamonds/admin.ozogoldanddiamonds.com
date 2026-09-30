import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../Services/user.service';
import { User } from '../models/user';
import { UserViewComponent } from '../View-dialog-Controllers/user-view/user-view.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  


  displayedColumns:
    string[] = [

      'sno',

      'name',

      'phone',

      'email',

      'isVerified',

      'createdAt',

      'actions'

    ];


  dataSource =
    new MatTableDataSource<User>();


  users:
    User[] = [];


  totalUsers:
    number = 0;


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(

    private userService:
      UserService,

    private dialog:
      MatDialog

  ) {}


  ngOnInit(): void {

    this.getAllUsers();

    this.getUsersCount();

  }


  /*
  GET ALL USERS
  */

  getAllUsers(): void {

    this.userService
      .getAllUsers()
      .subscribe({

        next: (
          response: any
        ) => {

          this.users =
            response.data;

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


  /*
  GET USERS COUNT
  */

  getUsersCount(): void {

    this.userService
      .getUsersCount()
      .subscribe({

        next: (
          response: any
        ) => {

          this.totalUsers =
            response.totalUsers;

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


  // ================================
  // SEARCH FILTER
  // ================================

  applyFilter(
    event: Event
  ): void {

    const filterValue =
      (
        event.target as HTMLInputElement
      ).value;


    this.dataSource.filter =
      filterValue
        .trim()
        .toLowerCase();


    // =========================
    // FIRST PAGE
    // =========================

    if (
      this.dataSource.paginator
    ) {

      this.dataSource.paginator
        .firstPage();

    }

  }


  // ================================
  // VIEW USER
  // ================================

  viewUser(user: User): void {

    this.dialog.open(
      UserViewComponent,
      {

        width: '600px',

        maxWidth: '95vw',

        maxHeight: '90vh',

        data: user,

        panelClass: 'user-view-dialog'

      }
    );

  }
}