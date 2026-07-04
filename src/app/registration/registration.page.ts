import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  regForm: FormGroup;
  valSubmit = false;
  registerError = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.regForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passWord: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {}

  reg() {
    this.valSubmit = true;
    this.registerError = '';
    if (this.regForm.invalid) return;

    const result = this.authService.register(this.regForm.value);
    if (result.success) {
      this.regForm.reset();
      this.router.navigateByUrl('/login');
    } else {
      this.registerError = result.message;
    }
  }
}
