import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-gard',
  templateUrl: './auth-gard.component.html',
  styleUrls: ['./auth-gard.component.scss']
})
/*
export class AuthGardComponent implements CanActivate {

  constructor(private router: Router,
    private authService : AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }

  CanActivate() : boolean{

    const userId = this.authService.userId

    if(userId === null){
      this.router.navigate( ['/login'])
      return false
    }
    return true;
  }
}*/

export class AuthGardComponent{

}
