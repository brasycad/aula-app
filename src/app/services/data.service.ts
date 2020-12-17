import { Injectable } from '@angular/core';
import { IUser } from "../interfaces";
import { Observable, timer, from, of } from "rxjs";
import { delay } from "rxjs/internal/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
const url = 'https://jsonplaceholder.typicode.com/users'
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(public http: HttpClient) {
  }
  getUsers(): Promise<IUser[]> {
    return new Promise((resolve) => {
      this.get(`${url}`).pipe(
        map((data) => {
          return data
        })
      )
        .subscribe((data) => {
          console.log(data)
          resolve(data)
        })
    })
  }
  getUser(_id: number): Promise<IUser> {
    return new Promise((resolve) => {
      this.get(`${url}/${_id}`).pipe(
        map((data) => {
          return data
        })
      )
        .subscribe((data) => {
          console.log(data)
          resolve(data)
        })
    })
  }
  // public fetchUsers(): Observable<IUser[]> {
  //   return of(USERS);
  // }
  // public usersOneByOne(): Observable<IUser> {
  //   return from(USERS);
  // }
  get(url: string): Observable<any> {
    return this.http.get(url)
  }

}
