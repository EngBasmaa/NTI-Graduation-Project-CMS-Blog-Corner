import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from './article.service';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  private url = "http://localhost:5000/article/";

  constructor(private http: HttpClient) { }

  getArticleById(articleId: string) {
    return this.http.get<Article>(`${this.url}/articles/${articleId}`);
  }

  updateArticle(articleId: string, formData: FormData) {
    return this.http.put(`${this.url}/articles/${articleId}`, formData);
  }

}
