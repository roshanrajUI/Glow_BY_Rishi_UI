import { Component, OnInit } from '@angular/core';
import { Category, Service } from '../../../shared/models/common.interface';
import { SharedService } from '../../../shared/services/shared-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../features/services/category-services/category.service';
import { MyServiceService } from '../../../features/services/my-service-services/my-service-service';
import { FieldErrorComponent } from '../../../shared/components/field-error-component/field-error-component';

@Component({
  selector: 'app-admin-service-component',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    FieldErrorComponent,
  ],
  templateUrl: './admin-service-component.html',
  styleUrl: './admin-service-component.scss',
})
export class AdminServiceComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private myServiceService: MyServiceService,
  ) {}
  categories: Category[] = [];
  services: Service[] = [];
  serviceForm: FormGroup = new FormGroup({});
  isEditService = false;
  updatingServiceId = '';
  // baseURL = 'http://localhost:3000';
  baseURL = 'http://glow-by-rishi-api.onrender.com';
  ngOnInit(): void {
    this.createServiceForm();
    this.getAllCategories();
    this.getAllServices();
  }

  createServiceForm() {
    this.serviceForm = this.fb.group({
      categoryId: ['', Validators.required],
      serviceName: ['', Validators.required],
      price: [0, Validators.required],
      description: [''],
      imageUrl: [''],
    });
  }

  getAllCategories() {
    this.categoryService.getAllCategories<Category[]>().subscribe({
      next: (res: Category[]) => {
        this.categories = res;
      },
    });
  }

  getAllServices() {
    this.myServiceService.getAllServices<Service[]>().subscribe({
      next: (res: Service[]) => {
        this.services = res;
      },
    });
  }

  editService(service: Service) {
    const { categoryId, serviceId, serviceName, price, description } = service;
    this.isEditService = true;
    this.serviceForm.patchValue({
      categoryId,
      serviceName,
      price,
      description,
    });

    this.updatingServiceId = serviceId;
  }

  submitService() {
    if (this.serviceForm.invalid) return;
    const formData = new FormData();
    const { categoryId, serviceName, price, description, imageUrl } = this.serviceForm.value;
    formData.append('categoryId', categoryId);
    formData.append('serviceName', serviceName);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('imageUrl', imageUrl);
    if (this.isEditService) {
      this.updateService(formData);
    } else {
      this.saveService(formData);
    }
  }

  saveService(formData: FormData) {
    this.myServiceService.createService<unknown, boolean>(formData).subscribe({
      next: (res: boolean) => {
        if (res) {
          this.getAllServices();
          this.serviceForm.reset();
        }
      },
    });
  }

  updateService(formData: FormData) {
    this.myServiceService
      .updateService<unknown, boolean>(this.updatingServiceId, formData)
      .subscribe({
        next: (res: boolean) => {
          if (res) {
            this.getAllServices();
            this.isEditService = false;
            this.cancelUpdate();
          }
        },
      });
  }

  deleteService(service: Service) {
    this.myServiceService.deleteService<boolean>(service.serviceId).subscribe({
      next: (res: boolean) => {
        if (res) this.getAllServices();
      },
    });
  }

  cancelUpdate() {
    this.serviceForm.reset();
    this.serviceForm.markAsUntouched();
    this.serviceForm.updateValueAndValidity();
    this.isEditService = false;
    this.updatingServiceId = '';
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.serviceForm.get('imageUrl')?.setValue(input.files[0]);
    }
  }
}
