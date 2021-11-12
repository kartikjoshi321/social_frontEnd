import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from '../services';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckTokenAuthGuard implements CanActivate {

  private token:string;

  constructor(private commonService : CommonService, private route : Router){

    //this.token = this.route.paramMap.get('token');

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return new Observable<boolean>(obs => {
        console.log(" Token :",next.paramMap.get('token'));
        const token = next.paramMap.get('token');
        this.commonService.CheckResetToken('/users/checkReset-token/'+token).subscribe(res =>{
          console.log("Response here yr :",res);
        //return true;
        obs.next(true);
        },err => {
          this.commonService.removeUserCredentials();
          this.route.navigateByUrl('/user/login');
          //return false;
          obs.next(false);
        });
      });

  
    }
  }
