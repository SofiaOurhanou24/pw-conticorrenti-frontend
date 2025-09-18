import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  submitError: string | null = null;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/),
          ],
        ],
        confermaPassword: ['', [Validators.required]],
        nomeTitolare: ['', [Validators.required]],
        cognomeTitolare: ['', [Validators.required]],
      },
      { validators: [this.passwordsMatchValidator] }
    );
  }

  submit(): void {
    if (this.registerForm.valid) {
      this.submitError = null;
      this.isSubmitting = true;
      const { email, password, nomeTitolare, cognomeTitolare } = this.registerForm.value;
      this.auth
        .register(nomeTitolare, cognomeTitolare, email, password)
        .subscribe({
          next: () => {
            this.isSubmitting = false;
            this.router.navigate(['/login']);
          },
          error: (err) => {
            this.isSubmitting = false;
            this.submitError = err?.error?.message || 'Registrazione fallita. Riprova.';
          },
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }
  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }
  get confermaPassword(): AbstractControl | null {
    return this.registerForm.get('confermaPassword');
  }
  get nomeTitolare(): AbstractControl | null {
    return this.registerForm.get('nomeTitolare');
  }
  get cognomeTitolare(): AbstractControl | null {
    return this.registerForm.get('cognomeTitolare');
  }

  private passwordsMatchValidator = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirm = group.get('confermaPassword')?.value;
    if (password && confirm && password !== confirm) {
      group.get('confermaPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  };
}
