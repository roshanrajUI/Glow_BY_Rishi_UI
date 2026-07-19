import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../features/services/category-services/category.service';
import { Category } from '../../../shared/models/common.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-category-component',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './admin-category-component.html',
  styleUrl: './admin-category-component.scss',
})
export class AdminCategoryComponent implements OnInit {
  constructor(
    private readonly fb: FormBuilder,
    private categoryService: CategoryService,
  ) {}
  categoryForm: FormGroup = new FormGroup({});
  existingCategories: Category[] = [];
  isEditCategory = false;
  updatingCategoryId = '';

  ngOnInit(): void {
    this.createForm();
    this.getCategories();
  }

  createForm() {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      description: [''],
    });
  }

  getCategories() {
    this.categoryService.getAllCategories<Category[]>().subscribe({
      next: (res: Category[]) => {
        this.existingCategories = res;
      },
    });
  }

  saveCategory() {
    if (this.categoryForm.invalid) return;

    const { categoryName, description } = this.categoryForm.value;
    const body = {
      categoryName,
      description,
    };

    this.categoryService.createCategory<unknown, Category>(body).subscribe({
      next: (res: Category) => {
        this.getCategories();
      },
    });
  }

  editCategory(category: Category) {
    this.categoryForm.patchValue({
      categoryName: category.categoryName,
      description: category.description,
    });

    this.isEditCategory = true;
    this.updatingCategoryId = category.categoryId;
  }

  updateCategory() {
    if (this.categoryForm.invalid) return;

    const { categoryName, description } = this.categoryForm.value;
    const body = {
      categoryName,
      description,
      isActive: true,
    };
    this.categoryService.updateCategory<unknown, boolean>(body, this.updatingCategoryId).subscribe({
      next: (res: boolean) => {
        this.getCategories();
        this.cancelUpdate();
      },
    });
  }

  deleteCategory(category: Category) {
    this.categoryService.deleteCategory<boolean>(category.categoryId).subscribe({
      next: (res: boolean) => {
        this.getCategories();
      },
    });
  }

  cancelUpdate() {
    this.categoryForm.reset();
    this.categoryForm.markAsUntouched();
    this.categoryForm.updateValueAndValidity();
    this.isEditCategory = false;
    this.updatingCategoryId = '';
  }
}
