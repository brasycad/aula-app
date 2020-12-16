import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService, DataService } from './services'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { SigninComponent } from './components/signin/signin.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MyPipePipe } from './pipes/my-pipe.pipe';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SigninComponent,
    LogoutComponent,
    UserComponent,
    MyPipePipe
  ],
  imports: [
    FormsModule, ReactiveFormsModule,
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          const t = new TranslateHttpLoader(http, 'assets/i18n/', '.json')
          return t
        },
        deps: [HttpClient]
      }
    }),
    TranslateModule,
  ],
  providers: [AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
