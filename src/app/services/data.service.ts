import { Injectable } from '@angular/core';
import { USERS } from "./data";
import { IUser } from "../interfaces";
import { Observable, timer, from, of } from "rxjs";
import { delay } from "rxjs/internal/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(public http: HttpClient) {


  }
  public fetchUsers(): Observable<IUser[]> {
    return of(USERS);
  }
  public usersOneByOne(): Observable<IUser> {
    return from(USERS);
  }
  get(url: string): Observable<any> {
    return this.http.get(url)
  }
}
