import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { signInWithEmailAndPassword, Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill the form correctly.';
      this.successMessage = '';
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      await signInWithEmailAndPassword(this.auth, email!, password!);
      this.successMessage = 'Login successful!';
      this.errorMessage = '';
      this.loginForm.reset();

      this.router.navigate(['/profile']); 
    } catch (error: any) {
      this.errorMessage = error.message || 'Login failed';
      this.successMessage = '';
    }
  }
}
