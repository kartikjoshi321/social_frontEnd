import { Component, OnInit } from '@angular/core';
import { CommonService,GrowlerService } from "../../services";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor( private commonService:CommonService,private logMessages:GrowlerService) { }

  ngOnInit(): void {
  }

  forgetPassword(form){
    this.commonService.forgetPassword("/users/forget-password",form.value).subscribe(res=>{
      console.log("response:",res);
      this.logMessages.success(res.message);
    });

  }

}
