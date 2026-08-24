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
import { FieldErrorComponent } from '../../../shared/components/field-error-component/field-error-component';

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
    FieldErrorComponent,
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
  isEditMyWork = false;
  updatingMyWorkId = '';

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
      imageUrl: [''],
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

  saveWork() {
    if (this.myWorkForm.invalid) return;

    const { serviceId, title, description, imageUrl } = this.myWorkForm.value;
    const body = {
      serviceId,
      title,
      description,
      imageUrl,
    };

    this.workService.createMyWork<unknown, boolean>(body).subscribe({
      next: (res: boolean) => {
        if (res) {
          this.cancelUpdate();
          this.getAllWorks();
        }
      },
    });
  }

  editMyWork(myWork: Work) {
    this.myWorkForm.patchValue({
      serviceId: myWork.serviceId,
      title: myWork.title,
      description: myWork.description,
      imageUrl: myWork.imageUrl,
    });

    this.isEditMyWork = true;
    this.updatingMyWorkId = myWork.workId;
  }

  updateMyWork() {
    if (this.myWorkForm.invalid) return;

    const { serviceId, title, description, imageUrl } = this.myWorkForm.value;
    const body = {
      serviceId,
      title,
      description,
      imageUrl,
    };
    this.workService
      .updateMyWork<unknown, boolean>(this.updatingMyWorkId, this.myWorkForm.value)
      .subscribe({
        next: (res: boolean) => {
          this.getAllWorks();
          this.cancelUpdate();
        },
      });
  }

  deleteMyWork(myWork: Work) {
    this.workService.deleteMyWork<boolean>(myWork.workId).subscribe({
      next: (res: boolean) => {
        if (res) this.getAllWorks();
      },
    });
  }

  cancelUpdate() {
    this.myWorkForm.reset();
    this.myWorkForm.markAsUntouched();
    this.myWorkForm.updateValueAndValidity();
    this.isEditMyWork = false;
    this.updatingMyWorkId = '';
  }
}
