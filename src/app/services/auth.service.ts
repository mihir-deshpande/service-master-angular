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
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  private url: string = environment.UrlString;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('authToken');
    this._isLoggedIn$.next(!!token);
  }

  login(email: string | null | undefined, password: string | null | undefined): Observable<IAuth> {
    return this.http
      .post<IAuth>(`${this.url}/authentication`, {
        email: email,
        password: password,
      })
      .pipe(
        tap((response: any) => {
          this._isLoggedIn$.next(true);
          localStorage.setItem('token', response.token);
        }),
      );
  }

  logout() {
    this._isLoggedIn$.next(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_name');
  }
}
