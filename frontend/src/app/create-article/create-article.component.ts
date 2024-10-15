import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@ngx-auth/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { AuthorData } from '../services/auth.service';


@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css'
})
export class CreateArticleComponent {
  articleForm: FormGroup;
  article = {
    title: '',
    description: '',
    content: '',
    image: '',
    tags: [] as string[], // Tags array for added tags
  };
  tag: string = ''; // Model for tag input
  hasFocus: boolean = false; // For handling file input focus state
  selectedFile: File | null = null; // To hold the selected file

  constructor(private fb: FormBuilder, private http: HttpClient, private _auth: AuthService, private dataS: DataService, private router: Router) {


    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      tag: [''], // Optional if you want to add validation for the tag
      description: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  // Add tag logic
  addTag() {
    if (this.tag) {
      this.article.tags.push(this.tag);
      this.tag = ''; // Clear input after adding tag
    }
  }

  // Handle file input change
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Store the selected file
      this.article.image = file.name; // Store the image name in the article object for later use
      console.log('Selected file:', file);
    }
  }

  // Handle focus and blur for file input
  toggleFocus() {
    this.hasFocus = !this.hasFocus;
  }

  // Handle form submission
  onSubmit() {
    if (this.articleForm.valid) {
      // Prepare the output to log
      const formOutput = {
        title: this.articleForm.get('title')?.value,
        tag: this.tag, // Using the tag model to include the latest added tag
        description: this.articleForm.get('description')?.value,
        content: this.articleForm.get('content')?.value,
        image: this.article.image, // Include the image name here
      };

      console.log('Form Submitted', formOutput); // Log the form output including the image

      this.create(); // Call create method on form submission

    }
  }
  // Create method for submitting the form data
  create() {
    const formData = new FormData(); // Create a FormData object

    // Append form values to FormData
    formData.append('title', this.articleForm.get('title')?.value);
    formData.append('description', this.articleForm.get('description')?.value);
    formData.append('content', this.articleForm.get('content')?.value);

    const authorData = this.getAuthorDataFromToken_();
    if (authorData && authorData.id) {
      formData.append('idAuthor', authorData.id);
    } else {
      console.error('No author data found.');
      return;
    }

    formData.append('tags', JSON.stringify(this.article.tags)); // Add tags as JSON string
    if (this.selectedFile) {
      formData.append('file', this.selectedFile); // Append the selected file
    }

    // Call the data service to create the article
    this.dataS.create(formData).subscribe(
      (res) => {
        console.log('Article created successfully:', res);
        console.log('Image included in submission:', this.article.image); // Log the image name
        this.router.navigate(['/home']); // Redirect to home on success
      },
      (error) => {
        console.error('Error creating article:', error);
      }
    );
  }

  getAuthorDataFromToken_(): AuthorData {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No valid token found in localStorage');
    }

    const payload = token.split('.')[1];
    const authorData = JSON.parse(atob(payload));

    return {
      id: authorData._id,
      name: authorData.name,
      lastname: authorData.lastname,
      email: authorData.email, // Make sure this property exists in the parsed data
      about: authorData.about || '' // Provide a default value if 'about' doesn't exist
    };
  }
}
