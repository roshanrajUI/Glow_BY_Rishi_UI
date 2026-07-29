import { Component, inject, model, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { Category, Service } from '../models/common.interface';
import { CategoryService } from '../services/category-services/category.service';
import { BookingService } from '../services/booking-services/booking-service';

@Component({
  selector: 'app-book-now-dialog',
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatTimepickerModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './book-now-dialog.html',
  styleUrl: './book-now-dialog.scss',
})
export class BookNowDialog implements OnInit {
  constructor(
    private readonly fb: FormBuilder,
    private categoryService: CategoryService,
    private bookingService: BookingService,
  ) {}
  readonly dialogRef = inject(MatDialogRef<BookNowDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  customerDetailsForm: FormGroup = new FormGroup({});
  selectedDate = model<Date | null>(new Date());
  selectedTime: any;
  categories: Category[] = [];
  selectedServices: Service[] = [];
  today = model<Date | null>(new Date());

  ngOnInit(): void {
    this.createCustomerDetailsForm();
    this.getAllCategories();
  }

  createCustomerDetailsForm() {
    this.customerDetailsForm = this.fb.group({
      clientName: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      notes: [''],
    });
  }

  getAllCategories() {
    this.categoryService.getAllCategories<Category[]>().subscribe({
      next: (res: Category[]) => {
        this.categories = res;
      },
    });
  }

  dialogClose() {
    this.dialogRef.close();
  }

  addService(event: MatCheckboxChange, selectedService: Service) {
    if (event.checked) {
      this.selectedServices.push(selectedService);
    } else {
      const index = this.selectedServices.indexOf(selectedService);
      if (index !== -1) {
        this.selectedServices.splice(index, 1);
      }
    }
  }

  isSelectedService(serviceId: string): boolean {
    const result = this.selectedServices.find((service) => service.serviceId === serviceId);
    return !!result;
  }

  getServicesName() {
    const servicesNames = this.selectedServices.map((service) => service.serviceName).join();
    return servicesNames;
  }

  get getTotalPrice() {
    return this.selectedServices.reduce((acc, item) => acc + Number(item.price), 0);
  }

  ConfirmBooking() {
    if (this.customerDetailsForm.valid) {
      const bookingData = {
        ...this.customerDetailsForm.value,
        bookedServices: this.selectedServices,
        bookingDate: this.selectedDate(),
        bookingTime: this.selectedTime,
        location: 'Nizamabad',
        gmail: 'abd@gmail.com',
        totalPrice: this.getTotalPrice,
      };
      this.bookingService.createBooking(bookingData).subscribe({
        next: (res: any) => {
          alert('Your Booking is succesful');
          this.dialogClose();
        },
      });

      // this.dialogRef.close(bookingData); // Close the dialog and pass the booking data back
    } else {
      console.log('Form is invalid');
    }
  }
}
