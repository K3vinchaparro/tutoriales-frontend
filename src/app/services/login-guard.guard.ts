import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.loginService.isLoggedIn()) {
      if (this.loginService.getCurrentUser() && this.loginService.getUserRoles() == "ADMIN") {
        this.router.navigate(['admin']);
      } else if (this.loginService.getCurrentUser() && this.loginService.getUserRoles() == "NORMAL") {
        this.router.navigate(['tutoriales']);
      }
      

    }
    
    return true;
  }
}
