import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated = false;
  userName = '';

  constructor() {   }

  /**
   * Returns Observable<boolean> true if user login is authenticated else false.
   *
   * @param loginInfo contains the login form data.
   */
  login(loginInfo: any): Observable<boolean> {
    const isCorrectUser = loginInfo.value.username === 'admin' && loginInfo.value.password === 'admin';
    return of(isCorrectUser).
      pipe(
        delay(1000),
        tap(val => this.isAuthenticated = isCorrectUser, this.userName = loginInfo.value.username)
      );
  }

  /**
   * Set authentication to false on log out.
   */
  logout(): void {
    this.isAuthenticated = false;
    this.userName = '';
  }
}
