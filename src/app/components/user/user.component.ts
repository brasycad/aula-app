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
  public user: IUser
  constructor(private DataService: DataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getStoredUser()
    this.route.params.subscribe(async (params) => {
      if (params.id != '*') {
        this.id = params.id
      }
      if (this.id) {
        this.user = await this.DataService.getUser(this.id)
        console.log(this.user)
      }
    })
  }
  storeUser() {
    window.localStorage.setItem('LAST_USER', this.id.toString())
  }
  getStoredUser() {
    this.id = Number(window.localStorage.getItem('LAST_USER'))
  }
}
