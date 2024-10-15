// article-details.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { AuthorData } from '../services/auth.service';

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  article: any // Change to a single Article object
  author: any
  constructor(private dataService: DataService, private authService: AuthService) { }

  ngOnInit(): void {
    const articleId = localStorage.getItem('selectedArticleId');
    if (articleId) {
      this.dataService.getArticleByIdAuthor(articleId).subscribe(
        res => {
          this.article = res || null; // Set the article to the response or null
          console.log('Fetched article:', this.article);

          if (this.article) {
            this.fetchAuthorDetails(this.article.authorId); // Fetch author details
          }
        },
        error => {
          console.error('Error fetching article details:', error);
        }
      );
    }
  }

  fetchAuthorDetails(authorId: string): void {
    console.log('Fetching author details for ID:', authorId); // Log authorId before fetch
    this.authService.getById(authorId).subscribe(
      (author: AuthorData) => {
        this.author = author;
        console.log('Fetched author:', this.author);
      },
      (error: any) => {
        console.error('Error fetching author details:', error);
      }
    );
  }
}
