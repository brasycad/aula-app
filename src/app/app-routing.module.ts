import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent, LogoutComponent, UsersComponent, SigninComponent } from "./components";
import { AuthService } from './services'
const routes: Routes = [
  { path: "user/:id", canActivate: [AuthService], component: UserComponent },
  { path: "users", canActivate: [AuthService], component: UsersComponent },
  { path: "signin", component: SigninComponent },
  { path: "logout", component: LogoutComponent },
  { path: "**", redirectTo: "signin" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
