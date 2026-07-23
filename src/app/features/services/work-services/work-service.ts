import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs';
import { API_URL } from '../../../constants/rest-url';

@Injectable({
  providedIn: 'root',
})
export class WorkService {
  constructor(private readonly apiService: ApiService) {}

  getAllWorks<B, R>(body: B): Observable<R> {
    return this.apiService.httpPost<R>(API_URL.GETMYWORKS, body);
  }

  createMyWork<B, R>(body: B): Observable<R> {
    return this.apiService.httpPost<R>(API_URL.WORKS, body);
  }

  updateMyWork<B, R>(myWorkId: string, body: B): Observable<R> {
    const apiUrl = `${API_URL.WORKS}/${myWorkId}`;
    return this.apiService.httpPut<R>(apiUrl, body);
  }

  deleteMyWork<R>(myWorkId: string): Observable<R> {
    const apiUrl = `${API_URL.WORKS}/${myWorkId}`;
    return this.apiService.httpDelete(apiUrl);
  }
}
