import { Component, OnInit } from '@angular/core';
import { CommonService,GrowlerService } from '../../services';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public token : string;

  constructor(private commonService: CommonService,private alertMessages: GrowlerService,private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params =>{
      this.token = params.get("token");
    });

  }

  resetForm(resetFormData){
    console.log('resetFormData :',resetFormData.value);
    let resetForm = resetFormData.value;
    if(resetForm.Confirm_password === resetForm.password){
      this.commonService.resetPassword("/users/reset-password/"+this.token,{password:resetForm.password}).subscribe((res)=>{
        //Password Change Successfully
        this.router.navigateByUrl('/users/login');
        this.alertMessages.success(res.message);
      });
    }
    else{
      this.alertMessages.error("Password Not Match");
    }
  }

}
