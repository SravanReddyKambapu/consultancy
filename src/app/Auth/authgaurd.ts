import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class Authgaurd implements CanActivate{
    constructor(private authservice: AuthService, private router: Router){
        
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const currentUser = this.authservice.currentUserValue;
        if(currentUser) {
            const routeUrl = state.url;
            return true;
        }
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
