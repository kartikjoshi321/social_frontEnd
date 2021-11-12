import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { CommonService,GrowlerService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm:FormGroup;

  constructor(private fb:FormBuilder,private commonService:CommonService,private route: Router,public logMessages: GrowlerService ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password:['',Validators.required]
    });
  }

  login(){
    this.commonService.login('/login',this.loginForm.value).subscribe((res)=>{
        this.route.navigate(['/home']);
    },(err)=>{
      console.log("Error :",err);
    });
  }

}
