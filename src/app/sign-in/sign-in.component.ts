import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required])
  })

  signIn() {
    if (this.signInForm.valid) {
      alert(JSON.stringify(this.signInForm.value));
      alert("Signed In");
    } else {
      alert("Invalid form")
    }
  }

}
