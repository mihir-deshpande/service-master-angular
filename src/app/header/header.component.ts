import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  navbarCollapsed = true;
  isLoggedIn = false;
  userType!: 'ADMIN' | 'CUSTOMER' | 'PROVIDER' | undefined;
  userName: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.loginStatus$.subscribe((status) => {
      this.isLoggedIn = status.isLoggedIn;
      this.userType = status.userType;
      this.userName = status.userName || '';
    });
  }

  signOut() {
    this.authService.logout();
    this.router.navigate(['/']).then(() => {});
  }
}
