import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../features/services/category-services/category.service';
import { Category } from '../../../shared/models/common.interface';
import { MatIconModule } from '@angular/material/icon';
import { FieldErrorComponent } from '../../../shared/components/field-error-component/field-error-component';
import { API_URL } from '../../../constants/rest-url';
import { AlertService } from '../../../shared/services/alert-service';

@Component({
  selector: 'app-admin-category-component',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    FieldErrorComponent,
  ],
  templateUrl: './admin-category-component.html',
  styleUrl: './admin-category-component.scss',
})
export class AdminCategoryComponent implements OnInit {
  constructor(
    private readonly fb: FormBuilder,
    private categoryService: CategoryService,
    private alertService: AlertService,
  ) {}
  categoryForm: FormGroup = new FormGroup({});
  existingCategories: Category[] = [];
  isEditCategory = false;
  updatingCategoryId = '';
  baseUrl = API_URL.BASEURL;
  @ViewChild('categoryImageInput')
  categoryImageInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.createForm();
    this.getCategories();
  }

  createForm() {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      description: [''],
      imageUrl: ['', Validators.required],
    });
  }

  getCategories() {
    this.categoryService.getAllCategories<Category[]>().subscribe({
      next: (res: Category[]) => {
        this.existingCategories = res;
      },
    });
  }

  onImageSelected(event: any) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.categoryForm.get('imageUrl')?.setValue(input.files[0]);
    }
  }

  editCategory(category: Category) {
    this.categoryForm.patchValue({
      categoryName: category.categoryName,
      description: category.description,
      imageUrl: '',
    });
    const imageUrlControl = this.categoryForm.get('imageUrl');
    imageUrlControl?.clearValidators();
    imageUrlControl?.updateValueAndValidity();
    this.isEditCategory = true;
    this.updatingCategoryId = category.categoryId;
  }

  submitCategory() {
    if (this.categoryForm.invalid) return;
    const formData = new FormData();
    const { categoryName, description, imageUrl } = this.categoryForm.value;
    formData.append('categoryName', categoryName ?? '');
    formData.append('description', description ?? '');
    if (imageUrl instanceof File) {
      formData.append('imageUrl', imageUrl);
    }
    if (this.isEditCategory) {
      this.updateCategory(formData);
    } else {
      this.saveCategory(formData);
    }
  }

  saveCategory(formData: FormData) {
    this.categoryService.createCategory<unknown, Category>(formData).subscribe({
      next: (res: Category) => {
        if (res) {
          this.alertService.showAlert(
            'success',
            `Category ${this.categoryForm.get('categoryName')?.value} Added Successfully`,
          );
          this.getCategories();
          this.cancelUpdate();
        }
      },
    });
  }

  updateCategory(formData: FormData) {
    this.categoryService
      .updateCategory<unknown, boolean>(formData, this.updatingCategoryId)
      .subscribe({
        next: (res: boolean) => {
          if (res) {
            this.alertService.showAlert(
              'success',
              `Category ${this.categoryForm.get('categoryName')?.value} Updated Successfully`,
            );
            this.getCategories();
            this.cancelUpdate();
          }
        },
      });
  }

  deleteCategory(category: Category) {
    this.categoryService.deleteCategory<boolean>(category.categoryId).subscribe({
      next: (res: boolean) => {
        if (res) {
          this.alertService.showAlert(
            'success',
            `Category ${category.categoryName} Deleted Successfully`,
          );
        }
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
    const imageUrlControl = this.categoryForm.get('imageUrl');
    imageUrlControl?.setValidators(Validators.required);
    imageUrlControl?.updateValueAndValidity();
    this.categoryImageInput?.nativeElement && (this.categoryImageInput.nativeElement.value = '');
  }
}
