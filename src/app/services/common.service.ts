import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, private route: Router) { 
    this.loadUserCridentials();
  }

  Url = environment.url;
  tokenName = 'jwt';
  user: Subject<any> = new Subject<any>();
  isAuthenticated : boolean = false;
  authToken:string = undefined;

  setUser(data: string){
    this.user.next(data);
  }

  loadUserCridentials(){
    let credentials = JSON.parse(localStorage.getItem(this.tokenName));
    console.log('credentials :',credentials);
    if(credentials && credentials.data.username !== undefined){
      this.useCredentials(credentials);
      console.log("token :",this.authToken);
      if(this.authToken){
        this.checkJwtToken();
      }
    }
  }

  clearUsername(){
    this.user.next(undefined);
  }

  setCredentials(credentials){
    localStorage.setItem(this.tokenName,JSON.stringify({data:{username:credentials.name},access_token:credentials.access_token}));
    this.useCredentials(credentials);
  }

  useCredentials(credentials){
    this.isAuthenticated = true;
    this.authToken = credentials.access_token;
    this.setUser(credentials);
  }

  removeUserCredentials(){
    localStorage.removeItem(this.tokenName);
    this.authToken = undefined;
    this.clearUsername();
    this.isAuthenticated = false;
  }

  getUser(): Observable<string> {
    return this.user.asObservable();
  }

  getToken(): string {
    return this.authToken;
  }

  isLoggedIn(): Boolean {
    return this.isAuthenticated;
  }

  logOut() {
    this.removeUserCredentials();
    this.route.navigateByUrl("/user/login");
  }

  login(method,data):Observable<any>{
    return this.http.post<any>(this.Url+method,data).pipe(map(res=>{
      console.log('Response :',res);
      this.setCredentials(res['data']);
      return res;
    }));
  }

  register(method,data):Observable<any>{
    return this.http.post<any>(this.Url+method,data);
  }

  checkJwtToken(){
    console.log("Its here");
    this.http.get<any>(this.Url+'/checkjwtToken').subscribe(res=>{
      
    },err=>{
        this.removeUserCredentials();
        this.route.navigate(['/user/login']);
    });
  }

  forgetPassword(method,data):Observable<any>{
    return this.http.post<any>(this.Url + method,data);
  }

  CheckResetToken(method):Observable<any>{
    return this.http.get<any>(this.Url+method);
  }

  resetPassword(method,data):Observable<any>{
    return this.http.post<any>(this.Url+method,data);
  }

}
