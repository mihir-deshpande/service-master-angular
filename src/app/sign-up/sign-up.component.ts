import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

const userTypes = ["ADMIN", "CUSTOMER", "PROVIDER"];

function userTypeValidator(formControl: FormControl) : { type: string } | null {
  if (userTypes.includes(formControl.value)) {
    return null;
  } else {
    return {"type": "invalid"};
  }
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  userTypes = userTypes;
  signUpForm = new FormGroup({
    firstName: new FormControl<string>('', [Validators.required]),
    lastName: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
    type: new FormControl<string>('', [Validators.required, userTypeValidator])
  })

  signUp() {
    if (this.signUpForm.valid) {
      alert(JSON.stringify(this.signUpForm.value));
      alert("Signed up");
    } else {
      alert("Invalid form")
    }
  }
}
