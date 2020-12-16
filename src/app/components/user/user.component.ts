import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services'
import { IUser, IData } from '../../interfaces'
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private id: number
  public users: IUser[]
  public user: IUser
  public data: IData
  constructor(private DataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getStoredUser()
    this.route.params.subscribe(async (params) => {
      if (params.id != '*') {
        this.id = params.id
      }
      // const result = await this.fetchUsers()
      if (this.id) {
        this.data = await this.getId(this.id.toString())
        console.log(this.data)
      }
    })
  }
  getUser() {
    this.user = this.users.find((u: IUser) => u.id == this.id)
    this.storeUser()
  }
  async fetchUsers(): Promise<boolean> {
    return new Promise((resolve) => {
      this.DataService.fetchUsers()
        .subscribe((users: IUser[]) => {
          console.log(users)
          this.users = users
          resolve(true)
        })
    })
  }
  getId(id: string): Promise<IData> {
    const url = 'https://jsonplaceholder.typicode.com/todos/'
    return new Promise((resolve) => {
      this.DataService.get(`${url}/${id}`).pipe(
        map((data: IData) => {
          data.value = data.id * data.userId * 28
          return data
        })
      )
        .subscribe((data: IData) => {
          resolve(data)
        })
    })
  }
  storeUser() {
    window.localStorage.setItem('LAST_USER', this.id.toString())
  }
  getStoredUser() {
    this.id = Number(window.localStorage.getItem('LAST_USER'))
  }

}
