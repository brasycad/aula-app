import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services'
import { TranslateService } from '@ngx-translate/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState, IUser } from './interfaces'
import { environment } from '../environments/environment'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private ngRedux: NgRedux<IAppState>, public TranslateService: TranslateService, private AuthService: AuthService, private Router: Router) {
  }
  ngOnInit() {
    const langs = ['es', 'en', 'pt']
    this.TranslateService.addLangs(langs);
    const lang = navigator.language.substr(0, 2)
    const contain = langs.find((l) => l == lang)
    this.TranslateService.use(contain || 'en')
    this.Router.navigate(['signin'])
  }
  public menu = ['signin', 'users', 'user', 'logout']
  onMenu(item) {
    if (item == 'user')
      this.Router.navigate([item, '4'])
    else
      this.Router.navigate([item])
  }
  get store(): IAppState {
    return this.ngRedux.getState()
  }
  get user(): IUser {
    return this.store.user
  }
  get version(): string {
    return environment.VERSION
  }
}
