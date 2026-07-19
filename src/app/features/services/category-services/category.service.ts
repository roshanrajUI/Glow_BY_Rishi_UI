import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { API_URL } from '../../../constants/rest-url';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly apiService: ApiService) {}
  getAllCategories<R>(): Observable<R> {
    return this.apiService.httpGet<R>(API_URL.CATEGORIES);
  }
}
