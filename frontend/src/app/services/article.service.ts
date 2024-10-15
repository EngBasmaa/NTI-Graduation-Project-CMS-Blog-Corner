import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ImageService } from './image.service';

export interface Article {
  id: string;
  title: string;
  content: string; // Make sure this exists if needed
  description?: string; // Add this if it exists
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  image: string; // Ensure this property exists
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private url = 'http://localhost:5000/article'; // Replace with your actual API URL
  imageUrl?: string;

  constructor(private http: HttpClient, private imageService: ImageService) { }

  fetchImage(filename: string): Observable<string> {
    return this.imageService.getImage(filename).pipe(
      map((response: Blob) => {
        const objectURL = URL.createObjectURL(response);
        return objectURL; // Return the object URL
      }),
      catchError(error => {
        this.handleError('Error fetching image', error);
        return throwError(error);
      })
    );
  }


  private handleError(message: string, error: any): Observable<never> {
    console.error(`${message}:`, error);
    return throwError(error);
  }

  getArticle(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.url}/${id}`); // Ensure URL is correct
  }

  getArticleById(id: string): Observable<Article> {
    return this.http.get<Article>(`${this.url}/getArticle/${id}`); // Ensure URL is correct
  }

  getArticleByFilename(filename: string): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.url}/getArticle/${filename}`); // Adjusted URL
  }

  getAllArticles(): Observable<Article[]> { // Specify the type of the observable
    return this.http.get<Article[]>(this.url); // Use this.url instead of this.apiUrl
  }

  createArticle(articleData: Article): Observable<Article> { // Specify input and return type
    return this.http.post<Article>(this.url, articleData); // Use this.url instead of this.apiUrl
  }

  updateArticle(id: string, articleData: Article): Observable<Article> { // Specify input and return type
    return this.http.put<Article>(`${this.url}/${id}`, articleData); // Use this.url instead of this.apiUrl
  }

  deleteArticle(id: string): Observable<any> { // Keep as any since the response can vary
    return this.http.delete(`${this.url}/${id}`); // Use this.url instead of this.apiUrl
  }

  getArticlesByAuthor(authorId: string) {
    return this.http.get<Article[]>(`${this.url}/${authorId}`);
  }
}
