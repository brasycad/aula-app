import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
    this.setJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2I3MDY0N2YwYWY2ZDFkYmVlMmVlOWQiLCJsZXZlbCI6MCwiZW1haWwiOiJqbXZhbGFyY29uQGdtYWlsLmNvbSIsImlhdCI6MTYwNzUzNTU3MiwiZXhwIjoxNjA4ODMxNTcyfQ.B8KX90RSKr3ITMFI6qI3VyaaYjPtoAhBR-LncOSEHrw')
    console.log('AuthService')
  }
  canActivate(): boolean {
    return Boolean(this.jwt)
  }
  logout() {
    this.setJwt(null)
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
}
