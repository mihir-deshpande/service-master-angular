import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  navbarCollapsed = true;
  isSignedIn = false;
  userType!: string | undefined;
  userName: string | undefined;
  protected readonly environment = environment;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.signInStatus$.subscribe((status) => {
      this.isSignedIn = status.isSignedIn;
      this.userType = status.userType;
      this.userName = status.userName;
    });
  }

  signOut() {
    this.authService.signOut();
    this.router.navigateByUrl('/').then(() => {
    });
  }
}
