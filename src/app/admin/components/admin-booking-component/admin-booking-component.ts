import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule, DatePipe } from '@angular/common';
import { Booking, BookingStatus } from '../../../shared/models/common.interface';
import { BookingService } from '../../../features/services/booking-services/booking-service';

@Component({
  selector: 'app-admin-booking-component',
  imports: [MatTabsModule, DatePipe, CommonModule],
  templateUrl: './admin-booking-component.html',
  styleUrl: './admin-booking-component.scss',
})
export class AdminBookingComponent implements OnInit {
  constructor(private readonly bookingService: BookingService) {}
  bookingStatuses: BookingStatus[] = ['Pending', 'Confirmed', 'Completed', 'Cancelled'];
  allBookings: Booking[] = [];

  ngOnInit(): void {
    this.getBookings();
  }

  getBookings(status?: BookingStatus) {
    this.bookingService.getBookings<Booking[]>(status).subscribe({
      next: (bookings: Booking[]) => {
        this.allBookings = bookings;
      },
    });
  }

  updateBooking(bookingId: string, status: BookingStatus) {
    const body = { bookingId, status };
    this.bookingService
      .updateBookingStatus<Booking, { bookingId: string; status: BookingStatus }>(body)
      .subscribe({
        next: (booking: Booking) => {
          const idx = this.allBookings.findIndex((bk) => bk.bookingId === booking.bookingId);
          if (idx !== -1) {
            this.allBookings[idx] = booking;
          }
        },
      });
  }
}
