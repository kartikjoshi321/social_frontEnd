import { Injectable, TemplateRef, ViewContainerRef  } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ComponentPortal } from '@angular/cdk/portal';
import {LoaderComponent} from '../common/growler/growler.component';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  overlayRef: any;
  constructor(private overlay: Overlay) { }

  loaderOverlay() {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true
    });
    this.overlayRef.attach(new ComponentPortal(LoaderComponent));
  }  
  
  detachOverlay(){
    this.overlayRef.detach()
  }

}
