import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GrowlerService {
  private subject = new Subject<any>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) { 
     // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
     this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          if (this.keepAfterRouteChange) {
              // only keep for a single route change
              console.log("hello keep")

              this.keepAfterRouteChange = false;
          } else {
              // clear alert message
              console.log("hello clear")
             this.clear();
          }
      }
  });
  }

  getAlert(): Observable<any> {
    console.log("testvdvdv")
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
   console.log("test service");
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterRouteChange = false) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({ type: 'error', text: message });
  }

  clear() {
    setTimeout(()=>{  
      this.subject.next();
  }, 3000);
    
    
  }
}