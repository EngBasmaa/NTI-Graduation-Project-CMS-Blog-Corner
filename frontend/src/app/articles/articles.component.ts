import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { ImageService } from '../services/image.service';
import { AuthService } from '../services/auth.service';

interface Article {
  _id: string;
  title: string;
  content: string; // Assuming this exists
  description?: string; // Optional description
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  image: string; // The image filename or path
}

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {
  articles: Article[] = [];


  public imageUrls: Map<string, string> = new Map();
  imgUrl: string | undefined;

  constructor(private dataS: DataService, private imageService: ImageService, private _auth: AuthService) { }

  ngOnInit(): void {
    this.dataS.getAllArticles().subscribe(
      (res) => {
        this.articles = res as Article[];  // Typecast the response

        // Iterate through the articles and fetch images
        this.articles.forEach((article: Article) => {
          if (article.image) {
            this.imgUrl = this.getImageUrl(article._id);
            console.log(this.getImageUrl(article._id));

            console.log(this.getImageUrl(article._id)
            );
            this.imageService.getImage(article.image).subscribe(blob => {
              const url = URL.createObjectURL(blob); // Create a local URL for the blob
              this.imageUrls.set(article._id, url);
            }, err => {
              console.error(`Failed to load image for Article ID: ${article._id}`, err);
            });
          }
        });
      },
      err => {
        console.error('Failed to load articles:', err);
      }
    );
  }



  // Getter method to access the image URL in the template
  getImageUrl(articleId: string): string | undefined {
    console.log(articleId);
    return this.imageUrls.get(articleId);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  deleteArticle(articleId: string): void {
    if (confirm('Are you sure you want to delete this article?')) {
      this.dataS.deleteArticle(articleId).subscribe(
        () => {
          // Remove the deleted article from the articles array
          this.articles = this.articles.filter(article => article._id !== articleId);
          console.log(`Article with ID ${articleId} deleted successfully.`);
        },
        (err) => {
          console.error(`Failed to delete article with ID ${articleId}:`, err);
        }
      );
    }
  }
}
