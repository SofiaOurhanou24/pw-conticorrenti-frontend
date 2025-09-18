import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  timedOut: boolean = false;
  private timeoutId: any;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submit(): void {
    if (this.loginForm.valid) {
      console.log('Login', this.loginForm.value);
      this.clearTimeoutIfAny();
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }
  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.startTimeout();
  }

  ngOnDestroy(): void {
    this.clearTimeoutIfAny();
  }

  private startTimeout(): void {
    this.clearTimeoutIfAny();
    this.timeoutId = setTimeout(() => {
      this.loginForm.reset();
      this.timedOut = true;
    }, 30000);
  }

  private clearTimeoutIfAny(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
