import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {

  constructor(private formBuilder: FormBuilder) { }

  /**
   * Create login form.
   */
  createLoginForm(): FormGroup {
      return this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Reset the passed form.
   *
   * @param form to reset.
   */
  reset(form: FormGroup): void {
    form.reset();
  }
}
