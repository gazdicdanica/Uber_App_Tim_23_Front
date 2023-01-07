import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root',
})
export class LoginGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router){}
    // Ovc ne radi...
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): 
        boolean | UrlTree | Observable<boolean 
        | UrlTree> 
        | Promise<boolean 
        | UrlTree> {
        if(this.authService.isLoggedIn()) {
            this.router.navigate(['profile']);
            console.log("Moze da se navigira");
            // TODO dodati sve zabrane rutiranja
            return false;
        }
        console.log("Ne moze da se navigira");
        return true;
    }

}