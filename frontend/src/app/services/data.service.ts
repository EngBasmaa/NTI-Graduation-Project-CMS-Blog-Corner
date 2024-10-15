import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorData } from './auth.service';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = "http://localhost:5000/article/";

  constructor(private http: HttpClient) { }

  create(article: any) {
    return this.http.post(this.url + 'create-article', article);
  }

  getAllArticles() {
    return this.http.get(this.url + 'all')
  }

  getArticleByIdAuthor(id: any) {
    return this.http.get(this.url + 'getArticle/' + id)

  }
  getAuthor(id: string) {
    return this.http.get<AuthorData>(this.url + '/authors/' + id); // Adjust the endpoint based on your API
  }
  // getAllAuthors() {
  //   return this.http.get(`${this.url}/authors`);
  // }
  getAllAuthors(): Observable<AuthorData[]> {
    return this.http.get<AuthorData[]>(`${this.url}`);
  }

  deleteArticle(articleId: string) {
    return this.http.delete(`${this.url}/article/${articleId}`);
  }
}
