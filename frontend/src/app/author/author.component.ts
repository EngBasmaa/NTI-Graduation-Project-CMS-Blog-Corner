import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, AuthorData } from '../services/auth.service';
import { ArticleService, Article } from '../services/article.service';
import { ImageService } from '../services/image.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  author: AuthorData | null = null;
  articles: any; id: string | null = null; // Author ID
  name: string | null = null;
  lastname: string | null = null;

  // Article properties for creation
  articletitle: string = '';
  articledescription: string = '';
  articleimage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private articleService: ArticleService,
    private router: Router,
    private data: DataService
  ) { }

  ngOnInit() {
    // Retrieve ID, name, and lastname from token
    const tokenData = this.getFromToken();
    if (tokenData) {
      this.id = tokenData._id; // Assign author ID
      this.name = tokenData.name; // Assign author name
      this.lastname = tokenData.lastname; // Assign author lastname
      console.log('Author ID:', this.id);

      // Check if ID is null
      if (!this.id) {
        console.error('Author ID is null.');
        return; // Early return if ID is null
      }

      // Fetch author data using the ID
      this.authService.getById(this.id).subscribe(res => {
        this.author = res;
        console.log('Author:', this.author); // Debugging log for author



        // Fetch articles by the author
        this.fetchArticles(); // Call the fetchArticles method
      }, error => {
        console.error('Error fetching author data:', error);
      });
    } else {
      console.error('No token found or invalid token structure.');
    }


    // Fetch articles using the author's ID
    this.data.getArticleByIdAuthor(this.id).subscribe((res) => {
      this.articles = res; // Ensure that the response is typed correctly
      console.log('Articles:', this.articles); // Debugging log for articles
    }, error => {
      console.error('Error fetching articles:', error); // Use 'error' instead of 'err'
    });

  }




  createArticle() {
    // Check if ID is null
    if (!this.id) {
      console.error('Author ID is null, cannot create article.');
      return; // Early return if ID is null
    }

    // Prepare the article data
    const articleData: Article = {
      id: '', // You might want to generate a unique ID or let the backend handle this
      title: this.articletitle,
      description: this.articledescription,
      image: this.articleimage,
      authorId: this.id,
      content: '', // You'll need to populate this when creating the article
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.articleService.createArticle(articleData).subscribe(res => {
      console.log('Article created successfully:', res);
      this.articles.push(res); // Add the created article to the articles array
      // Optionally navigate back to the author's page
      this.router.navigate(['/author', this.id]); // Use this.id for navigation
    }, error => {
      console.error('Error creating article:', error);
    });
  }

  getFromToken(): any | null {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Decode the token and extract the payload
      const payload = token.split('.')[1];
      if (payload) {
        // Decode the base64 payload
        const decodedPayload = JSON.parse(atob(payload));
        return decodedPayload; // Return the entire decoded payload
      }
    }
    // Return null if no valid token is found
    return null;
  }

  fetchArticles(): void {
    // Check if ID is null
    if (!this.id) {
      console.error('Author ID is null, cannot fetch articles.');
      return; // Early return if ID is null
    }

    // Fetch articles using the author's ID
    this.articleService.getArticlesByAuthor(this.id).subscribe(res => {
      this.articles = res; // Ensure that the response matches the Article[] type
      console.log('Articles:', this.articles); // Debugging log for articles
    }, error => {
      console.error('Error fetching articles:', error);
    });
  }
}
