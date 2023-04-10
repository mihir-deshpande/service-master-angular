import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {switchMap} from "rxjs";

export interface User {
  _id: any;
  first_name: any;
  last_name: any;
  password: any;
  email: any;
  type: any;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.UrlString;

  constructor(private http: HttpClient, private authService: AuthService) { }



  getUsers() {
    return this.authService.signInStatus$.pipe(switchMap((data) => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${data.token}`);
      return this.http.get<User[]>(`${this.apiUrl}/user`, {headers});
    }));
  }

  deleteUser(_id: any) {
    return this.authService.signInStatus$.pipe(switchMap((data) => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${data.token}`);
      return this.http.delete<User>(`${this.apiUrl}/user/${_id}`, {headers});
    }));
  }

  updateUser(user: User) {
    console.log(user);
    return this.authService.signInStatus$.pipe(switchMap((data) => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${data.token}`);
      return this.http.put<User>(`${this.apiUrl}/user/${user._id}`, {
        'first-name': user.first_name,
        'last-name': user.last_name,
        'email': user.email,
        'password': user.password,
        'type': user.type
      }, {headers});
    }));
  }
}
