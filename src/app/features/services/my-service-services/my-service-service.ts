import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { API_URL } from '../../../constants/rest-url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyServiceService {
  constructor(private readonly apiService: ApiService) {}

  getAllServices<R>(): Observable<R> {
    return this.apiService.httpGet<R>(API_URL.SERVICES);
  }
}
