import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = ''; // Preview image before upload

  constructor(private fb: FormBuilder, private _auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      image: [null, Validators.required], // For image file
      about: ['', Validators.required]
    });
  }

  // Method to handle image upload
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // Set image preview
      };
      reader.readAsDataURL(file);
      this.registerForm.patchValue({ image: file }); // Bind file to form control
    }
  }

  // Form submission
  submitRegisterForm() {
    console.log("Form submitted!"); // Add this line for testing
    if (this.registerForm.valid) {
      const formData = new FormData();
      formData.append('name', this.registerForm.get('name')?.value);
      formData.append('lastname', this.registerForm.get('lastname')?.value);
      formData.append('email', this.registerForm.get('email')?.value);
      formData.append('password', this.registerForm.get('password')?.value);
      formData.append('image', this.registerForm.get('image')?.value); // Image file
      formData.append('about', this.registerForm.get('about')?.value);

      // Call AuthService to register
      this._auth.register(formData).subscribe(
        (response) => {
          // Handle successful response and navigate to login page
          this.router.navigate(['/author/login']);
        },
        (error) => {
          // Handle error if registration fails
          console.error('Registration failed', error);
        }
      );
    }
  }

}