import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule, DatePipe } from '@angular/common';
import { Booking, BOOKINGSTATUS, BookingStatus } from '../../../shared/models/common.interface';
import { BookingService } from '../../../features/services/booking-services/booking-service';
import { AlertService } from '../../../shared/services/alert-service';

@Component({
  selector: 'app-admin-booking-component',
  imports: [MatTabsModule, DatePipe, CommonModule],
  templateUrl: './admin-booking-component.html',
  styleUrl: './admin-booking-component.scss',
})
export class AdminBookingComponent implements OnInit {
  constructor(
    private readonly bookingService: BookingService,
    private alertService: AlertService,
  ) {}
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
      .updateBookingStatus<Boolean, { bookingId: string; status: BookingStatus }>(body)
      .subscribe({
        next: (res: Boolean) => {
          const booking = this.allBookings.find((bk) => bk.bookingId === bookingId);
          if (booking) {
            booking.status = status;
          }
          let successMessage = '';
          if (res) {
            switch (status) {
              case BOOKINGSTATUS.CONFIRMED:
                successMessage = 'Booking Confirmed Successfully';
                break;
              case BOOKINGSTATUS.COMPLETED:
                successMessage = 'Booking Completed Successfully';
                break;
              case BOOKINGSTATUS.CANCELLED:
                successMessage = 'Booking Cancelled';
                break;
              default:
                successMessage = 'Unkown Status';
                break;
            }
          }
          this.alertService.showAlert('success', successMessage);
        },
      });
  }
}
