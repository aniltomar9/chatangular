import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required!';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        const token = response.data.token; // Assuming the token is in the response
        console.log('token successful:', token);

        localStorage.setItem('token', token); // Save the token in localStorage
        this.errorMessage = '';
        this.successMessage = 'Login successful! Redirecting...';

        // Redirect to the chat page
         this.router.navigate(['/chat']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Invalid email or password.';
        this.successMessage = '';
      },
    });
  }
}
