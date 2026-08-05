import { Component, OnInit } from '@angular/core';
import { BookingService } from '../services/booking-services/booking-service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Booking } from '../../shared/models/common.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-client-booking-component',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './client-booking-component.html',
  styleUrl: './client-booking-component.scss',
})
export class ClientBookingComponent {
  constructor(
    private readonly bookingService: BookingService,
    private fb: FormBuilder,
  ) {}
  clientBookingForm: FormGroup = new FormGroup({});
  clientBookings: Booking[] = [];

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.clientBookingForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      bookingNumber: [''],
    });
  }

  searchClientBooking() {
    this.bookingService
      .getClientBookings<unknown, Booking[]>(this.clientBookingForm.value)
      .subscribe({
        next: (res: Booking[]) => {
          this.clientBookings = res;
        },
      });
  }
}
