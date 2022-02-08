// auth-guard.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  //   jwtHelper: JwtHelper = new JwtHelper();
  constructor(private router: Router) { }

  canActivate() {
    if (this.loggedIn()) {
      return true;
    }
    // this.router.navigate(['/login']);
    this.router.navigateByUrl('login');

    return false;
  }

  loggedIn() {
    // if (localStorage.getItem('cui-data') === null || localStorage.getItem('cui-data') === '' ) {
    //   return false;
    // }
    if (localStorage.getItem('kushal_user_data') === null) {
      return false;
    }
    return true;
  }
}
