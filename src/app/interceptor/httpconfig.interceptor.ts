import { Injectable,Injector } from '@angular/core';
//import { ErrorDialogService } from '../error-dialog/errordialog.service';
import { CommonService,GrowlerService } from '../services';
import { environment } from '../../environments/environment';

import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor { 
  constructor(private inj: Injector,private errorDialogService:GrowlerService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const containToken: any = JSON.parse(localStorage.getItem('jwt'));

    if (containToken && containToken.access_token) {
        request = request.clone({ headers: request.headers.set('Authorization', containToken.access_token) });
    }

    if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                console.log('event--->>>', event);
            }
            return event;
        }),
        catchError((error: HttpErrorResponse) => {
          let data = {};
          let message:string;
          if(error && error.error && error.message){
              if(error.error){
                  console.log("ERROR Message :",error);
                  message = error.error.message;
                  if(typeof message == 'undefined'){
                      //message = error.message;
                      message = "Server is not Responding";
                  }
              }else{
                message= error.message;
              }
          }else{
              message = '';
          }
          
          data = {
              reason: message,
              status: error.status
          };
          this.errorDialogService.error(data['reason']);
          return throwError(error);
      }));

        
  }
}