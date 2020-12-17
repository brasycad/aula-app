import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService, DataService } from '@app//services'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { SigninComponent } from './components/signin/signin.component';
import { LogoutComponent } from './components/logout/logout.component';
import { UserComponent } from './components/user/user.component';
import { Watch } from './components'
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MyPipePipe } from './pipes/my-pipe.pipe';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { IAppState } from './interfaces'
import persistState from 'redux-localstorage';
import { Reducers, INITIAL_APP_STATE, reimmutify, deimmutify, StoreSlicer, StoreActions } from './store';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors';

@NgModule({
  declarations: [
    Watch,
    AppComponent,
    UsersComponent,
    SigninComponent,
    LogoutComponent,
    UserComponent,
    MyPipePipe
  ],
  imports: [
    NgReduxModule,
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
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [AuthService, DataService,
    StoreActions,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (DataService: DataService) => new AuthInterceptor(DataService),
      multi: true,
      deps: [DataService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngRedux: NgRedux<IAppState>) {
    const LOCAL_STORE = 'MY_LOCAL_STORE'
    const enhancers = [
      persistState('', {
        key: `${LOCAL_STORE}`,
        serialize: (s: any) => JSON.stringify(deimmutify(s)),
        deserialize: (s: any) => reimmutify(JSON.parse(s)),
        slicer: StoreSlicer
      })
    ];
    this.ngRedux.configureStore(Reducers, INITIAL_APP_STATE, [], enhancers);
  }
}
