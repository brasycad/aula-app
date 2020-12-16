import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent, LogoutComponent, MenuComponent, SigninComponent } from "./components";
import { AuthService } from './services'
const routes: Routes = [
  { path: "user/:id", canActivate: [AuthService], component: UserComponent },
  { path: "menu", canActivate: [AuthService], component: MenuComponent },
  { path: "signin", component: SigninComponent },
  { path: "logout", component: LogoutComponent },
  { path: "**", redirectTo: "signin" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
