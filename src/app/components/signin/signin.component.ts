import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AsyncValidatorFn,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  color = 'yellow'
  public dataForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setupForm();
  }
  setupForm() {
    const form = {
      email: ["", { validators: [Validators.required, Validators.email] }],
      password: [
        "",
        { validators: [Validators.required, Validators.minLength(6)] }
      ]
    };
    this.dataForm = this.formBuilder.group(form);
  }
  save() {
    //this.onSendForm.emit(this.dataForm.value);
    console.log(this.dataForm.value);
  }
  get emailError(): boolean {
    return !this.dataForm.get("email").valid;
  }
  get paswordError(): boolean {
    return !this.dataForm.get("password").valid;
  }

}
