import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthinticationService } from './authintication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthinticationService, public router: Router) { }
  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['404']);
      return false;
    }
    return true;
  }
}
