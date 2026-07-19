import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { API_URL } from '../../../constants/rest-url';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly apiService: ApiService) {}

  createCategory<B, R>(body: B): Observable<R> {
    return this.apiService.httpPost(API_URL.CATEGORIES, body);
  }

  getAllCategories<R>(): Observable<R> {
    return this.apiService.httpGet<R>(API_URL.GETCATEGORIES);
  }

  updateCategory<B, R>(body: B, categoryId: string): Observable<R> {
    const apiURL = `${API_URL.CATEGORIES}/${categoryId}`;
    return this.apiService.httpPut(apiURL, body);
  }

  deleteCategory<R>(categoryId: string): Observable<R> {
    const apiURL = `${API_URL.CATEGORIES}/${categoryId}`;
    return this.apiService.httpDelete(apiURL);
  }
}
