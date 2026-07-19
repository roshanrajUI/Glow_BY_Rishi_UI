import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Category, MyWorkRequest, MyWorks, Work } from '../models/common.interface';
import { WorkService } from '../services/work-services/work-service';
import { CategoryService } from '../services/category-services/category.service';

@Component({
  selector: 'app-my-work-component',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './my-work-component.html',
  styleUrl: './my-work-component.scss',
})
export class MyWorkComponent implements OnInit {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly workService: WorkService,
  ) {}
  categories: Category[] = [];
  myAllWorks: Work[] = [];

  ngOnInit() {
    this.getCategories();
    this.getMyWorks();
  }

  getCategories() {
    this.categoryService.getAllCategories<Category[]>().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  getMyWorks(categoryId = '', serviceId = '', pageSize = 10, pageNumber = 1) {
    const body: MyWorkRequest = {
      categoryId,
      serviceId,
      pageSize,
      pageNumber,
    };
    this.workService.getAllWorks<MyWorkRequest, MyWorks>(body).subscribe((works: MyWorks) => {
      this.myAllWorks = works.data;
    });
  }

  getCategoryWorks(categoryId: string) {
    if (!categoryId) {
      this.getMyWorks();
      return;
    }
    this.getMyWorks(categoryId);
  }

  showMoreWorks() {
    this.getMyWorks('', '', this.myAllWorks.length + 10, 1);
  }
}
