import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EditService } from '../services/edit.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  articleForm: FormGroup;
  articleId: string = '';
  selectedFile: File | null = null; // To hold the selected file

  constructor(
    private fb: FormBuilder,
    private dataS: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private edit: EditService
  ) {
    // Initialize the form group
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      tags: [[]], // Initialize tags as an empty array
      image: ['']
    });
  }

  ngOnInit(): void {
    // Get article ID from route parameters
    this.route.params.subscribe(params => {
      this.articleId = params['id'];
      this.loadArticle(this.articleId);
    });
  }

  // Load article data by ID
  loadArticle(id: string): void {
    this.edit.getArticleById(id).subscribe(article => {
      // Populate form with existing article data
      this.articleForm.patchValue({
        title: article.title,
        description: article.description,
        content: article.content,
        image: article.image // This is for reference, actual file handling is done in onFileChange
      });
    });
  }

  // Handle file input change
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; // Store the selected file
      console.log('Selected file:', file);
    }
  }

  // Handle form submission
  onSubmit(): void {
    if (this.articleForm.valid) {
      const formData = new FormData();

      // Append the updated values
      formData.append('title', this.articleForm.get('title')?.value);
      formData.append('description', this.articleForm.get('description')?.value);
      formData.append('content', this.articleForm.get('content')?.value);
      formData.append('tags', JSON.stringify(this.articleForm.get('tags')?.value));

      // If a new file is selected, append it to the form data
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }

      this.edit.updateArticle(this.articleId, formData).subscribe(
        (res) => {
          console.log('Article updated successfully:', res);
          this.router.navigate(['/home']); // Redirect on success
        },
        (error) => {
          console.error('Error updating article:', error);
        }
      );
    }
  }
  hasFocus: boolean = false; // For handling file input focus state

  toggleFocus() {
    this.hasFocus = !this.hasFocus;
  }
}
