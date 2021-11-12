import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService,GrowlerService } from '../../services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm :FormGroup;

  constructor( private fb: FormBuilder , private commonService: CommonService, public logMessages: GrowlerService ) { }

  ngOnInit(): void {

    this.createForm();

  }

  createForm(){
    this.registerForm = this.fb.group({
      username: ['',Validators.required ],
      email: ['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required ]
    });
  }

  submitForm(){
    if(this.registerForm.valid){
      this.commonService.register('/users/signup',this.registerForm.value).subscribe(res =>{
        this.registerForm.reset();
        this.logMessages.success(res.message);
      },
      err =>{
        console.log("Error:",err.message);
        this.logMessages.error(err.message);
      });
    }
    
  }

}
