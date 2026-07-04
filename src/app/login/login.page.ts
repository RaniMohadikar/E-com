import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  valSubmit = false;
  showPassword = false;
  loginError = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    // If already logged in, skip login screen
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.valSubmit = true;
    this.loginError = '';
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    const user = this.authService.login(email, password);

    if (user) {
      this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
    } else {
      this.loginError = 'Invalid email or password. Please try again.';
    }
  }
}
