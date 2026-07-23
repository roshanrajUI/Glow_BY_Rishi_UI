import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { API_URL } from '../../../constants/rest-url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyServiceService {
  constructor(private readonly apiService: ApiService) {}

  createService<B, R>(body: B): Observable<R> {
    return this.apiService.httpPost<R>(API_URL.SERVICES, body);
  }

  updateService<B, R>(serviceId: string, body: B): Observable<R> {
    const apiUrl = `${API_URL.SERVICES}/${serviceId}`;
    return this.apiService.httpPut<R>(apiUrl, body);
  }

  deleteService<R>(serviceId: string): Observable<R> {
    const apiUrl = `${API_URL.SERVICES}/${serviceId}`;
    return this.apiService.httpDelete(apiUrl);
  }

  getAllServices<R>(): Observable<R> {
    return this.apiService.httpGet<R>(API_URL.GETSERVICES);
  }
}
