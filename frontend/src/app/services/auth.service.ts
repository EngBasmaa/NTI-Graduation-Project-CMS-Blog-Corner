import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ImageService } from './image.service';

export interface AuthorData {
  id: string;
  email: string;
  name: string;
  lastname: string;
  about: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:5000/author/";
  imageUrl?: string;

  constructor(private http: HttpClient, private router: Router, private imageService: ImageService) { }

  fetchImage(filename: string): void {
    this.imageService.getImage(filename).subscribe(
      (response: Blob) => {
        const objectURL = URL.createObjectURL(response);
        this.imageUrl = objectURL;
      },
      error => this.handleError('Error fetching image', error)
    );
  }

  register(formData: FormData): Observable<any> {
    return this.http.post(`${this.url}register`, formData);
  }

  // login(email: string, password: string): Observable<any> {
  //   return this.http.post<{ token: string }>(`${this.url}login`, { email, password }).pipe(
  //     tap(response => {
  //       if (response?.token) {
  //         localStorage.setItem('token', response.token);
  //         console.log('Token stored:', response.token);
  //       } else {
  //         console.error('No token received in the response.');
  //       }
  //     }),
  //     catchError(error => this.handleError('Login failed', error))
  //   );
  // }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // getAuthorDataFromToken(token?: any): AuthorData | null {
  //   token = localStorage.getItem('token');
  //   if (!token) return null;

  //   const payload = token.split('.')[1];
  //   if (!payload) return null;

  //   const decodedPayload = JSON.parse(window.atob(payload));
  //   return decodedPayload;
  // }

  getAuthorData(): Observable<AuthorData | null> {
    const authorData = this.getAuthorDataFromToken();
    return of(authorData);
  }

  // getById(id: string): Observable<AuthorData> {
  //   return this.http.get<AuthorData>(this.url + id);
  // }

  getById(id: string): Observable<AuthorData> {
    return this.http.get<AuthorData>(this.url + id);
  }


  getAllAuthors(): Observable<AuthorData[]> {
    return this.http.get<AuthorData[]>(`${this.url}`);
  }
  // getById(id: string): Observable<any> {
  //   return this.http.get<any>(`${this.url}/author/${id}`);
  // }

  // private handleError(message: string, error: any): Observable<never> {
  //   console.error(`${message}:`, error);
  //   return throwError(error);
  // }


  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.url}login`, { email, password }).pipe(
      tap(response => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
          console.log('Token stored:', response.token);
        } else {
          console.error('No token received in the response.');
        }
      }),
      catchError(error => this.handleError('Login failed', error))
    );
  }

  getAuthorDataFromToken(token?: any): AuthorData | null {
    token = localStorage.getItem('token');
    if (!token) return null;

    const payload = token.split('.')[1];
    if (!payload) return null;

    const decodedPayload = JSON.parse(window.atob(payload));
    return decodedPayload; // Ensure this contains an `id` field
  }




  private handleError(message: string, error: any): Observable<never> {
    console.error(`${message}:`, error);
    return throwError(error);
  }

  deleteArticle(articleId: string): Observable<any> {
    return this.http.delete(`${this.url}article/${articleId}`);
  }
}
