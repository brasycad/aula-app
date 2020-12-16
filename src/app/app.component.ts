import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public TranslateService: TranslateService, private AuthService: AuthService, private Router: Router) {
  }
  ngOnInit() {
    const langs = ['es', 'en', 'pt']
    this.TranslateService.addLangs(langs);
    const lang = navigator.language.substr(0, 2)
    const contain = langs.find((l) => l == lang)
    //console.log(lang, contain)
    this.TranslateService.use(contain || 'en')
    this.Router.navigate(['signin'])
  }
  public menu = ['signin', 'menu', 'user', 'logout']
  onMenu(item) {
    //console.log(item)
    if (item == 'user')
      this.Router.navigate([item, '4'])
    else
      this.Router.navigate([item])
  }
}
