import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface IAuth {
  token: string;
  user_type: string;
  user_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _loginStatus$ = new BehaviorSubject<{
    isLoggedIn: boolean;
    userType?: 'ADMIN' | 'CUSTOMER' | 'PROVIDER';
    userName?: string;
  }>({ isLoggedIn: false });

  loginStatus$ = this._loginStatus$.asObservable();

  private url: string = environment.UrlString;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      const userType = localStorage.getItem('user_type') as 'ADMIN' | 'CUSTOMER' | 'PROVIDER';
      const userName = localStorage.getItem('user_name') || '';
      this._loginStatus$.next({ isLoggedIn: true, userType, userName });
    }
  }

  login(email: string | null | undefined, password: string | null | undefined): Observable<IAuth> {
    return this.http
      .post<IAuth>(`${this.url}/authentication`, {
        email: email,
        password: password,
      })
      .pipe(
        tap((response: any) => {
          this._loginStatus$.next({
            isLoggedIn: true,
            userType: response.user_type,
            userName: response.user_name,
          });
          localStorage.setItem('token', response.token);
          localStorage.setItem('user_type', response.user_type);
          localStorage.setItem('user_name', response.user_name);
        }),
      );
  }

  logout() {
    this._loginStatus$.next({ isLoggedIn: false });
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_name');
    localStorage.removeItem('selectedService');
  }
}
