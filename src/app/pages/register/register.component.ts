import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { createUserWithEmailAndPassword, updateProfile, Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder, private auth: Auth) {
    this.registerForm = this.fb.group({
      nickname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill the form correctly.';
      this.successMessage = '';
      return;
    }

    const { nickname, email, password } = this.registerForm.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email!, password!);
      
      if (this.auth.currentUser) {
        await updateProfile(this.auth.currentUser, { displayName: nickname });
      }

      this.successMessage = 'Registration successful!';
      this.errorMessage = '';
      this.registerForm.reset();
    } catch (error: any) {
      this.errorMessage = error.message || 'Registration failed';
      this.successMessage = '';
    }
  }
}
