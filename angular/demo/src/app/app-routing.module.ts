
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserComponent } from './user/user.component';
import { UserlistComponent } from './user/userlist.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'user/:id',
    component: UserComponent
  },

  {
    path:'user',
    component: UserComponent
  },
  {
    path: 'user/:id',
    component: UserComponent
  },

    {
    path: 'signup',
    component: SignupComponent
  },

  {
    path:'userlist',
    component: UserlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
