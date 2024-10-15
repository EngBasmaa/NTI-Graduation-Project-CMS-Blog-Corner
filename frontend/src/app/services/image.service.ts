// image.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = 'http://localhost:5000'; // Change if your backend is hosted elsewhere

  constructor(private http: HttpClient) { }

  getImage(filename: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getImage/${filename}`, { responseType: 'blob' });
  }

  getArticleImage(filename: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/article/getImage/${filename}`, { responseType: 'blob' });
  }
}
