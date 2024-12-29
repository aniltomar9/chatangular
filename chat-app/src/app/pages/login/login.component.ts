import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {
    this.api.login(this.email, this.password).then(response => {
      localStorage.setItem('token', response.data.token);
      this.router.navigate(['/chat']);
    }).catch(error => {
      console.error('Login failed', error);
    });
  }
}
