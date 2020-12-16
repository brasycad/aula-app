import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services'
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private Router: Router, private AuthService: AuthService) { }

  ngOnInit(): void {
    this.AuthService.logout()
  }
  goBack() {
    this.Router.navigate(['signin'])
  }
}
