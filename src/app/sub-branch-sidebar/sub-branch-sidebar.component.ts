import { Component, HostListener, OnInit } from '@angular/core';
import { Route, Router, RouterOutlet, Routes } from '@angular/router';
import Swal from 'sweetalert2';
import { AlertService } from '../Services/alert.service';
interface SearchRoute {
  path: string;
  fullPath: string;
  label: string;
}
@Component({
  selector: 'app-sub-branch-sidebar',
  templateUrl: './sub-branch-sidebar.component.html',
  styleUrls: ['./sub-branch-sidebar.component.css'],
})
export class SubBranchSidebarComponent implements OnInit {


  // =====================================================
  // SEARCH
  // =====================================================

  searchText: string = '';
  showSearchResults: boolean = false;

  allSearchRoutes: SearchRoute[] = [];
  filteredSearchRoutes: SearchRoute[] = [];

  showProfilePopup = false;
  openMenu: string | null = null;

  role = localStorage.getItem('role') || '';


  isSidebarClosed = false;
  showDropdown = false;
  userName = localStorage.getItem('name') || 'Admin';
  userEmail = localStorage.getItem('email') || 'email@gmail.com';

  constructor(private router: Router, private alertService: AlertService) { }
  ngOnInit(): void {

    this.loadUserRole();

    this.loadRoutes();
  }

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onMouseEnter() { }

  onMouseLeave() { }
  goToProfile() {

    this.showDropdown = false;

    // this.router.navigate(['SUB_BRANCH/Profile']);
    this.showProfilePopup = true;

  }
  toggleMenu(menu: string): void { if (this.openMenu === menu) { this.openMenu = null; } else { this.openMenu = menu; } }
  logout() {

    this.showDropdown = false;

    this.alertService.confirm(
      'Confirm Logout?',
      'Are you sure you want to logout?',
      'Logout',
      'Cancel'
    ).then((result: any) => {

      if (result.isConfirmed) {

        localStorage.clear();

        this.router.navigate(['/']);

      }

    });

  }



  closeProfile() {

    this.showProfilePopup = false;

  }

  // =====================================================
  // GET ROLE
  // =====================================================

  loadUserRole(): void {

    const storedRole = localStorage.getItem('role');

    console.log('ROLE FROM LOCAL STORAGE:', storedRole);

    this.role = (storedRole || '')
      .trim()
      .toUpperCase()
      .replace(/[, ]/g, '_');

    console.log('NORMALIZED ROLE:', this.role);

  }


  // =====================================================
  // LOAD ROUTES FROM APP ROUTING
  // =====================================================

  loadRoutes(): void {

    console.log('====================================');
    console.log('LOADING SEARCH ROUTES');
    console.log('ROLE:', this.role);
    console.log('====================================');


    // -----------------------------------------------------
    // ROLE → ROUTE PARENT
    // -----------------------------------------------------

    let parentPath: string = '';


    if (this.role === 'BRANCH') {

      parentPath = 'admin';

    }
    else if (this.role === 'SUB_BRANCH') {

      parentPath = 'SUB_BRANCH';

    }
    else {

      console.error(
        'Unsupported role:',
        this.role
      );

      this.allSearchRoutes = [];
      this.filteredSearchRoutes = [];

      return;
    }


    // -----------------------------------------------------
    // GET ALL APP ROUTES
    // -----------------------------------------------------

    const appRoutes: Routes = this.router.config;

    console.log('APP ROUTES:', appRoutes);


    // -----------------------------------------------------
    // FIND ROLE PARENT
    // -----------------------------------------------------

    const parentRoute: Route | undefined =
      appRoutes.find(route => {

        return (
          route.path?.toLowerCase() ===
          parentPath.toLowerCase()
        );

      });


    console.log('PARENT PATH:', parentPath);
    console.log('PARENT ROUTE:', parentRoute);


    // -----------------------------------------------------
    // CHECK PARENT
    // -----------------------------------------------------

    if (!parentRoute) {

      console.error(
        'Parent route NOT FOUND:',
        parentPath
      );

      this.allSearchRoutes = [];
      this.filteredSearchRoutes = [];

      return;
    }


    // -----------------------------------------------------
    // CHECK CHILDREN
    // -----------------------------------------------------

    if (
      !parentRoute.children ||
      parentRoute.children.length === 0
    ) {

      console.error(
        'No children found for:',
        parentPath
      );

      this.allSearchRoutes = [];
      this.filteredSearchRoutes = [];

      return;
    }


    console.log(
      'CHILD ROUTES:',
      parentRoute.children
    );


    // -----------------------------------------------------
    // CONVERT CHILD ROUTES TO SEARCH ROUTES
    // -----------------------------------------------------

    this.allSearchRoutes = parentRoute.children

      .filter((route: any) => {

        // No path
        if (!route.path) {
          return false;
        }


        // Ignore parameter routes
        //
        // update-product/:id
        // product/:subBranchId
        // update/:purchaseId/:itemId

        if (route.path.includes(':')) {
          return false;
        }


        // Ignore redirect routes
        if (route.redirectTo) {
          return false;
        }


        return true;

      })

      .map((route: any) => {

        const routePath = route.path!;

        return {

          path: routePath,

          fullPath:
            `/${parentPath}/${routePath}`,

          label:
            this.formatRouteName(routePath)

        };

      });


    // -----------------------------------------------------
    // INITIAL FILTER
    // -----------------------------------------------------

    this.filteredSearchRoutes = [
      ...this.allSearchRoutes
    ];


    console.log(
      'FINAL SEARCH ROUTES:',
      this.allSearchRoutes
    );

    console.log(
      'TOTAL ROUTES:',
      this.allSearchRoutes.length
    );

  }


  // =====================================================
  // FORMAT ROUTE NAME
  // =====================================================

  formatRouteName(path: string): string {

    return path

      .replace(/[-_]/g, ' ')

      .replace(/\b\w/g, char =>
        char.toUpperCase()
      );

  }


  // =====================================================
  // OPEN SEARCH
  // =====================================================

  openSearch(): void {

    console.log('SEARCH CLICKED');

    this.showSearchResults = true;

    // Refresh role
    this.loadUserRole();

    // Refresh routes
    this.loadRoutes();

    // Apply search
    this.onSearch();

  }


  // =====================================================
  // SEARCH / FILTER
  // =====================================================

  onSearch(): void {

    const search =
      this.searchText
        .trim()
        .toLowerCase();


    // Empty search
    // Show ALL routes

    if (!search) {

      this.filteredSearchRoutes = [
        ...this.allSearchRoutes
      ];

      return;
    }


    // Filter

    this.filteredSearchRoutes =
      this.allSearchRoutes.filter(route => {

        return (

          route.label
            .toLowerCase()
            .includes(search)

          ||

          route.path
            .toLowerCase()
            .includes(search)

        );

      });

  }


  // =====================================================
  // ROUTE CLICK
  // =====================================================

  navigateToRoute(route: SearchRoute): void {

    console.log(
      'Navigating to:',
      route.fullPath
    );


    this.showSearchResults = false;

    this.searchText = '';


    this.router.navigateByUrl(
      route.fullPath
    );

  }


  // =====================================================
  // CLOSE SEARCH OUTSIDE CLICK
  // =====================================================

  @HostListener(
    'document:click',
    ['$event']
  )
  onDocumentClick(event: MouseEvent): void {

    const target =
      event.target as HTMLElement;


    if (
      !target.closest(
        '.search-wrapper'
      )
    ) {

      this.showSearchResults = false;

    }

  }

}