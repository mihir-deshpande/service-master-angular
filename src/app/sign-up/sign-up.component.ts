import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {environment} from "../../environments/environment";

export const userTypes = [environment.AdminString, environment.CustomerString, environment.ProviderString],
  userTypeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (userTypes.includes(control.value)) {
      return null;
    } else {
      return {type: 'invalid'};
    }
  };

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  apiUrl = environment.UrlString;
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
      this.http.post(`${this.apiUrl}/user`, {
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
        this.router.navigateByUrl('sign-in').then(() => {
        });
      });
    } else {
      alert("Invalid form")
    }
  }
}
