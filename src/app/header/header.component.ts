import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  navbarCollapsed = true;
  isLoggedIn = false;
  userType!: 'ADMIN' | 'CUSTOMER' | 'PROVIDER';
  userName: string = "";


  constructor(private router: Router) {
    // Add any required initialization, such as checking local storage for user information.
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = localStorage.getItem("token");
    if (token) {
      this.isLoggedIn = true;
      this.userType = localStorage.getItem("user_type") as 'ADMIN' | 'CUSTOMER' | 'PROVIDER';
      this.userName = localStorage.getItem("user_name") || "";
    } else {
      this.isLoggedIn = false;
    }
  }

  signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("user_name");
    this.checkLoginStatus();
    // redirect to home page
    this.router.navigate(['/']);
  }

}
