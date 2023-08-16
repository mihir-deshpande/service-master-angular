import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

export interface IAuth {
  token: string;
  user_type: string;
  user_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _signInStatus$ = new BehaviorSubject<{
    isSignedIn: boolean;
    userType?: string;
    userName?: string;
    token?: string;
  }>({isSignedIn: false});

  signInStatus$ = this._signInStatus$.asObservable();

  private url: string = environment.UrlString;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      const userType = localStorage.getItem('user_type') || undefined;
      const userName = localStorage.getItem('user_name') || undefined;
      this._signInStatus$.next({isSignedIn: true, userType, userName, token});
    }
  }

  signIn(email: string | null | undefined, password: string | null | undefined): Observable<IAuth> {
    return this.http
      .post<IAuth>(`${this.url}/authentication`, {
        email: email,
        password: password,
      })
      .pipe(
        tap((response: any) => {
          this._signInStatus$.next({
            isSignedIn: true,
            userType: response.user_type,
            userName: response.user_name,
            token: response.token,
          });
          localStorage.setItem('token', response.token);
          localStorage.setItem('user_type', response.user_type);
          localStorage.setItem('user_name', response.user_name);
        }),
      );
  }

  signOut() {
    this._signInStatus$.next({isSignedIn: false});
    localStorage.clear();
  }
}
