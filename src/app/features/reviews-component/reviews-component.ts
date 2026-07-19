import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BookingService } from '../services/booking-services/booking-service';
import { Booking } from '../models/common.interface';

@Component({
  selector: 'app-reviews-component',
  imports: [MatIconModule],
  templateUrl: './reviews-component.html',
  styleUrl: './reviews-component.scss',
})
export class ReviewsComponent implements OnInit {
  constructor(private readonly bookingService: BookingService) {}
  bookingReviews: Booking[] = [];

  ngOnInit(): void {
    this.getBookingReviews();
  }

  getBookingReviews() {
    this.bookingService.getBookingReviews<Booking[]>().subscribe({
      next: (res: Booking[]) => {
        this.bookingReviews = res;
      },
    });
  }

  getBookingServiceName(booking: Booking): string {
    return 'dummy';
  }
}
