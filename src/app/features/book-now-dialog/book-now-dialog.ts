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
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { dummyCategories } from '../../../assets/images/dummy/dummy';

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
  ],
  templateUrl: './book-now-dialog.html',
  styleUrl: './book-now-dialog.scss',
})
export class BookNowDialog implements OnInit {
  constructor(private readonly fb: FormBuilder) {}
  readonly dialogRef = inject(MatDialogRef<BookNowDialog>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  customerDetailsForm: FormGroup = new FormGroup({});
  selectedDate = model<Date | null>(new Date());
  categories = dummyCategories;
  selectedServices: string[] = [];
  today = model<Date | null>(new Date());

  ngOnInit(): void {
    this.createCustomerDetailsForm();
  }

  createCustomerDetailsForm() {
    this.customerDetailsForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      notes: [''],
    });
  }

  dialogClose() {
    this.dialogRef.close();
  }

  addService(event: MatCheckboxChange, selectedServiceId: string) {
    if (event.checked) {
      this.selectedServices.push(selectedServiceId);
    } else {
      const index = this.selectedServices.indexOf(selectedServiceId);
      if (index !== -1) {
        this.selectedServices.splice(index, 1);
      }
    }
    console.log(this.selectedServices);
  }

  isSelectedService(serviceId: string): boolean {
    const result = this.selectedServices.find((id) => id === serviceId);
    return !!result;
  }

  ConfirmBooking() {
    if (this.customerDetailsForm.valid) {
      const bookingData = {
        ...this.customerDetailsForm.value,
        selectedServices: this.selectedServices,
        selectedDate: this.selectedDate,
      };
      console.log('Booking Confirmed:', bookingData);
      // Here you can send the bookingData to your backend or perform any other action
      this.dialogRef.close(bookingData); // Close the dialog and pass the booking data back
    } else {
      console.log('Form is invalid');
    }
  }
}
