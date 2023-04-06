import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {catchError, throwError} from "rxjs";

export const userTypes = ["ADMIN", "CUSTOMER", "PROVIDER"];

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
  constructor(private router: Router, private http: HttpClient) {
  }

  signUp() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.http.post('https://service-master-api.cyclic.app/user', {
        'first-name': this.signUpForm.value.firstName,
        'last-name': this.signUpForm.value.lastName,
        'email': this.signUpForm.value.email,
        'password': this.signUpForm.value.password,
        'type': this.signUpForm.value.type
      }).pipe(
        catchError((error) => {
          console.log(error.error.errors);
          alert(JSON.stringify(error.error.errors));
          return throwError(error);
        })
      ).subscribe((value) => {
        console.log(value);
        alert("Signed up successfully");
        this.router.navigate(['/sign-in']).then(() => {});
      });
    } else {
      alert("Invalid form")
    }
  }
}
