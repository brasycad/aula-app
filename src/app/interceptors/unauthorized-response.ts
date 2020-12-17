import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { DataService } from '@app/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private DataService: DataService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const handleAuthError = (err: HttpErrorResponse): Observable<any> => {
      console.log(err)
      if (err.status === 401 || err.status === 403) {
        return of(err.message);
      } else {
        // setTimeout(() => this.RoutesServices.goErrorPage(err), 200)
        return throwError(err);
      }
    }
    return next.handle(req).pipe(
      retry(2),
      catchError(x => handleAuthError(x)),
    )
  }
}
