import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication.service';

@Component({
  selector: 'so-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  title = 'Student Onboarding Application';

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  /**
   * Clicking on title navigates to home page.
   */
  navigateToHome() {
    this.router.navigateByUrl('/home/onboarding');
  }

  /**
   * Logs out user and navigates to login page.
   */
  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
