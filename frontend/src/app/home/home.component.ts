import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { ImageService } from '../services/image.service';



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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  articles: Article[] = [];


  public imageUrls: Map<string, string> = new Map();
  imgUrl: string | undefined;

  constructor(private router: Router, private dataS: DataService, private imageService: ImageService) { }

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
  storeArticleId(articleId: string): void {
    localStorage.setItem('selectedArticleId', articleId);
  }
  // Getter method to access the image URL in the template
  getImageUrl(articleId: string): string | undefined {
    console.log(articleId);
    return this.imageUrls.get(articleId);
  }

  goToArticles(): void {
    this.router.navigate(['/home/articles']); // Navigate to the articles page
  }


}