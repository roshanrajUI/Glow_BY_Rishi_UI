import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Service } from '../../../shared/models/common.interface';
import { MyServiceService } from '../../../features/services/my-service-services/my-service-service';
import { Work } from '../../../features/models/common.interface';
import { WorkService } from '../../../features/services/work-services/work-service';

@Component({
  selector: 'app-admin-my-work-component',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './admin-my-work-component.html',
  styleUrl: './admin-my-work-component.scss',
})
export class AdminMyWorkComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private myServiceService: MyServiceService,
    private workService: WorkService,
  ) {}

  myWorkForm: FormGroup = new FormGroup({});
  services: Service[] = [];
  myWorks: Work[] = [];
  ngOnInit(): void {
    this.createForm();
    this.getAllServices();
    this.getAllWorks();
  }

  createForm() {
    this.myWorkForm = this.fb.group({
      serviceId: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      img: ['', Validators.required],
    });
  }

  getAllServices() {
    this.myServiceService.getAllServices<Service[]>().subscribe({
      next: (res: Service[]) => {
        this.services = res;
      },
    });
  }

  getAllWorks() {
    const body = {
      serviceId: '',
      categoryId: '',
      pageSize: 10,
      pageNumber: 0,
    };
    this.workService.getAllWorks<unknown, any>(body).subscribe({
      next: (res: any) => {
        this.myWorks = res.data;
      },
    });
  }
}
