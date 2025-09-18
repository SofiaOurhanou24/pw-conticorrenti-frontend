import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';



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
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.isSubmitting = true;
      this.authService
        .login(email, password)
        .subscribe({
          next: () => {
            this.isSubmitting = false;
            this.router.navigateByUrl('/home');
          },
          error: () => {
            this.isSubmitting = false;
            alert('Login fallito. Riprova.');
          },
        });
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
