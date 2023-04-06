import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  navbarCollapsed = true;
  isLoggedIn = false;
  userType!: 'ADMIN' | 'CUSTOMER' | 'PROVIDER';
  userName: string = '';

  constructor(private router: Router, private authService: AuthService) {
    // Add any required initialization, such as checking local storage for user information.
    this.checkLoginStatus();
  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = res;
      this.checkLoginStatus();
    });
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn = true;
      this.userType = localStorage.getItem('user_type') as 'ADMIN' | 'CUSTOMER' | 'PROVIDER';
      this.userName = localStorage.getItem('user_name') || '';
    } else {
      this.isLoggedIn = false;
    }
  }

  signOut() {
    this.authService.logout();
    this.checkLoginStatus();
    // redirect to home page
    this.router.navigate(['/']);
  }
}
