import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services'
import { IUser } from '../../interfaces'
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: IUser[]
  constructor(private router: Router, private DataService: DataService) { }

  async ngOnInit() {
    this.users = await this.DataService.getUsers()
    console.log(this.users)
  }
  showUser(user: IUser) {
    this.router.navigate(['user', user.id])
  }
}
