import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    return this.checkRole(route);
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean | UrlTree {
    return this.checkRole(route);
  }

  private checkRole(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (!token || !userRole) {
      return this.router.parseUrl('/login');
    }

    const allowedRoles = route.data['roles'] || route.parent?.data['roles'];

    if (!allowedRoles || !allowedRoles.includes(userRole)) {
      if (userRole === 'SUB_BRANCH') {
        return this.router.parseUrl('/SUB_BRANCH/dashboard');
      }

      if (userRole === 'BRANCH') {
        return this.router.parseUrl('/admin/dashboard');
      }

      return this.router.parseUrl('/login');
    }

    return true;
  }
}
