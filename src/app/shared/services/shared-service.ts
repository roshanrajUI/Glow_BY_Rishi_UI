import { Injectable, signal } from '@angular/core';
import { Category } from '../../features/models/common.interface';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  $categories = signal<Category[]>([]);
}
