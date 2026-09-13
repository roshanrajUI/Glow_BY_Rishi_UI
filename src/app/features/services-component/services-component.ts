import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Category } from '../models/common.interface';
import { SharedService } from '../../shared/services/shared-service';
import { API_URL } from '../../constants/rest-url';

@Component({
  selector: 'app-services-component',
  imports: [CommonModule],
  templateUrl: './services-component.html',
  styleUrl: './services-component.scss',
})
export class ServicesComponent {
  constructor(readonly sharedService: SharedService) {}
  categories: Category[] = [];
  baseUrl = API_URL.BASEURL;
}
