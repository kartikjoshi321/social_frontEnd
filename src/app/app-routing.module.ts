import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';
import { ForgotPasswordComponent } from './common/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './common/reset-password/reset-password.component';
import { HomeComponent } from './common/home/home.component';
import { AuthGuard } from './services/auth.guard';
import { OppositeAuthGuard } from './services/opposite-auth.guard';
import { CheckTokenAuthGuard } from './services/check-token-auth.guard';

const routes: Routes = [
  {path:'user',children:[
    {path:'login',component:LoginComponent,canActivate:[OppositeAuthGuard] },
    {path:'register',component:RegisterComponent,canActivate:[OppositeAuthGuard] },
    {path:'reset-password',component:ResetPasswordComponent,canActivate:[OppositeAuthGuard]},
    {path:'forgot-password',component:ForgotPasswordComponent,canActivate:[OppositeAuthGuard]},
    {path: 'reset-password/:token',component:ResetPasswordComponent,canActivate:[CheckTokenAuthGuard]},
    {path: '',redirectTo:'/user/login',pathMatch:'full'}
  ]},
  // {path:'login',component:LoginComponent },
  // {path:'register',component:RegisterComponent },
  {path:'',redirectTo:'/home',pathMatch:'full'},
  // {path:'reset-password',component:ResetPasswordComponent},
  // {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'**',redirectTo:'/user/login',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
