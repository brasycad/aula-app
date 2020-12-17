import { Injectable } from '@angular/core';
import { DataService } from '../services'
import { map } from 'rxjs/operators'
import { IUser } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private DataService: DataService) {
  }
  canActivate(): boolean {
    return Boolean(this.jwt)
  }
  logout() {
    this.setJwt(null)
  }
  async login(data): Promise<IUser> {
    const users: IUser[] = await this.DataService.getUsers() as IUser[]
    const email = data.email
    const user = users.find(user => user.email.toLowerCase() == email.toLowerCase())
    if (user)
      this.setJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2I3MDY0N2YwYWY2ZDFkYmVlMmVlOWQiLCJsZXZlbCI6MCwiZW1haWwiOiJqbXZhbGFyY29uQGdtYWlsLmNvbSIsImlhdCI6MTYwNzUzNTU3MiwiZXhwIjoxNjA4ODMxNTcyfQ.B8KX90RSKr3ITMFI6qI3VyaaYjPtoAhBR-LncOSEHrw')
    return user
  }
  get jwt() {
    const jwt = window.localStorage.getItem('JWT_KEY')
    return jwt
  }
  setJwt(jwt: string) {
    if (!jwt)
      window.localStorage.removeItem('JWT_KEY');
    else
      window.localStorage.setItem('JWT_KEY', jwt)
  }
  get logged(): boolean {
    return Boolean(this.jwt)
  }
}
