import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AsyncValidatorFn,
  AbstractControl
} from "@angular/forms";
import { AuthService } from '@app/services'
import { Router } from '@angular/router';
import { IUser } from '@app/interfaces'
import { StoreActions } from '@app/store'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  color = '#eee'
  public dataForm: FormGroup;
  constructor(private StoreActions: StoreActions, private AuthService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.setupForm();
  }
  setupForm() {
    const form = {
      email: [this.lastEmail || '', { validators: [Validators.required, Validators.email] }],
      password: [
        "",
        { validators: [Validators.required, Validators.minLength(6)] }
      ]
    };
    this.dataForm = this.formBuilder.group(form);
    console.log(this.dataForm.get('password'))
  }
  async save() {
    console.log(this.dataForm.value);
    const user: IUser = await this.AuthService.login(this.dataForm.value)
    this.StoreActions.STORE_USER(user)
    window.localStorage.setItem('EMAIL', user.email)
    this.router.navigate(['user', user?.id])
  }
  get emailError(): boolean {
    return !this.dataForm.get("email").valid;
  }
  get paswordError(): boolean {
    return !this.dataForm.get("password").valid && this.dataForm.get("password").value.length > 0
  }
  isPristinePasswd() {
    return this.dataForm.get('password')
  }
  get lastEmail() {
    return window.localStorage.getItem('EMAIL')
  }
}
