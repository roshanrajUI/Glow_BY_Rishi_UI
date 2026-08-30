import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly httpClient: HttpClient) {}

  baseUrl = 'https://glow-by-rishi-api.onrender.com/api';

  httpGet<R>(endpoint: string, params?: HttpParams, headers?: HttpHeaders): Observable<R> {
    return this.httpClient.get<R>(`${this.baseUrl}/${endpoint}`, {
      params: params || undefined,
      headers: headers || undefined,
    });
  }

  httpPost<R>(endpoint: string, body: any, headers?: HttpHeaders): Observable<R> {
    return this.httpClient.post<R>(`${this.baseUrl}/${endpoint}`, body, {
      headers: headers || undefined,
    });
  }

  httpPut<R>(endpoint: string, body: any, headers?: HttpHeaders): Observable<R> {
    return this.httpClient.put<R>(`${this.baseUrl}/${endpoint}`, body, {
      headers: headers || undefined,
    });
  }

  httpDelete<R>(endpoint: string, headers?: HttpHeaders): Observable<R> {
    return this.httpClient.delete<R>(`${this.baseUrl}/${endpoint}`, {
      headers: headers || undefined,
    });
  }
}
