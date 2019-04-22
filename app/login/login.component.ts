import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../core/authentication.service';
import { LoginFormService } from './service/login-form.service';

@Component({
  selector: 'so-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  title = 'Login';
  hidePassword = true;
  loginForm: FormGroup;

  constructor(
    private loginFormService: LoginFormService,
    private router: Router,
    private authService: AuthenticationService
    ) {
      this.loginForm = this.loginFormService.createLoginForm();
    }

  ngOnInit() {  }

  /**
   * Allow user to log in after authentication.
   */
  login(): void {

    this.authService.login(this.loginForm).subscribe(() => {
      if (this.authService.isAuthenticated) {
        const redirectToUrl = '/home/onboarding';

        // Redirect to home page
        this.router.navigateByUrl(redirectToUrl);
      } else {
        alert('Log-in credentials are incorrect.');
      }
    });
  }

  /**
   * Reset the login form.
   */
  reset(): void {
    this.loginFormService.reset(this.loginForm);
  }
}
