import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorData, AuthService } from '../services/auth.service'; // Import your AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  token: any;
  loginForm: FormGroup;
  errorMessage: string | null = null;
  authorId: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submitLoginForm() {
    const { email, password } = this.loginForm.value;

    if (this.loginForm.valid) {
      this.authService.login(email, password).subscribe((res) => {
        if (res && res.token) {
          this.token = res.token; // Assign response to token
          localStorage.setItem('token', this.token); // Store the token directly

          // Get author data from the token
          const authorData = this.authService.getAuthorDataFromToken(); // Fetch author data
          this.authorId = authorData?.id; // Use optional chaining to safely access id

          // Ensure authorId is defined before navigating
          // this.router.navigate(['/create-article/:authorId']); // Navigate to the author's page
          this.router.navigate([`/home`]);

        }
      }, () => {
        this.errorMessage = 'Invalid email or password'; // Update error message on error
      });
    }
  }
}
