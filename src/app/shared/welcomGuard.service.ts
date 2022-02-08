// auth-guard.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable()
export class WelcomeGuard implements CanActivate {
  //   jwtHelper: JwtHelper = new JwtHelper();
  constructor(private router: Router) { }

  canActivate() {
    if (this.isFirst()) {
      return true;
    }
    this.router.navigate(['/welcome']);
    return false;
  }

  isFirst() {
    // console.log('isLogin => ',localStorage.getItem('cui-data'))
    if (localStorage.getItem('isFirst') === null || localStorage.getItem('isFirst') === '' ) {
      return false;
    }
    return true;
  }
}
