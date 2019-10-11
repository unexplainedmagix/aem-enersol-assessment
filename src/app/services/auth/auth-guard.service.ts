import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService {

  constructor(public auth: AuthService, public router: Router) {
    
  }

  canActivate(route:ActivatedRouteSnapshot):boolean{
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['sign-in']);
      return false;
    }
    return true;
  }
}
