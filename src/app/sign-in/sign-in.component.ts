import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {catchError, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

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

  constructor(private router: Router, private http: HttpClient) {
  }

  signIn() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.http
        .post<{ token: string; user_type: string, user_name: string }>('https://service-master-api.cyclic.app/authentication', { email, password })
        .pipe(
          catchError((error) => {
            alert('Invalid email or password');
            return throwError(error);
          })
        )
        .subscribe((response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user_type', response.user_type);
          localStorage.setItem('user_name', response.user_name);
          alert('Signed in successfully');
          this.router.navigate(['/customer/services']);
        });
    } else {
      alert('Invalid form');
    }
  }

}
