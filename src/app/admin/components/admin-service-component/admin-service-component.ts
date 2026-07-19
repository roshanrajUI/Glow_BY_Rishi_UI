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
  ],
  templateUrl: './admin-service-component.html',
  styleUrl: './admin-service-component.scss',
})
export class AdminServiceComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private myServiceService: MyServiceService,
  ) {}
  categories: Category[] = [];
  services: Service[] = [];
  serviceForm: FormGroup = new FormGroup({});

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
      imageURL: [''],
    });
  }

  getAllCategories() {
    this.categoryService.getAllCategories<Category[]>().subscribe({
      next: (res: Category[]) => {
        this.categories = res;
      },
    });
    // this.categories = this.sharedService.$categories();
    // console.log(this.sharedService.$categories());
  }

  getAllServices() {
    this.myServiceService.getAllServices<Service[]>().subscribe({
      next: (res: Service[]) => {
        this.services = res;
      },
    });
  }
}
