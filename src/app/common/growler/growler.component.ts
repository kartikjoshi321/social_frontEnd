import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { GrowlerService } from '../../services';

@Component({
  selector: 'app-growler',
  templateUrl: './growler.component.html',
  styleUrls: ['./growler.component.scss']
})
export class GrowlerComponent implements OnInit {
  private subscription: Subscription;
  message: any;
  @Input() position: string = 'top-right';
  @Input() timeout: number = 3000;

  constructor(private toast: GrowlerService) {
    console.log("hello data const")
  }

  ngOnInit(): void {
    console.log("hello data ng")
    this.subscription = this.toast.getAlert()
      .subscribe(message => {
        switch (message && message.type) {
          case 'success':
            console.log("success");
            message.cssClass = 'alert alert-success';
            setTimeout(() => this.toast.clear(), 3000);
            break;
          case 'error':
            message.cssClass = 'alert alert-danger';
            setTimeout(() => this.toast.clear(), 5000);
            break;
          case 'info':
            message.cssClass = 'alert alert-info';
            setTimeout(() => this.toast.clear(), 5000);
            break;
        }

        this.message = message;

      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

@Component({
  selector: 'app-loader',
  template:
    `<mat-progress-spinner
        mode="indeterminate"
      ></mat-progress-spinner>`
})
export class LoaderComponent {

  constructor() { }
}
