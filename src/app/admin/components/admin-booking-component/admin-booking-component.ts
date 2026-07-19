import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DatePipe } from '@angular/common';
import { Booking, BookingStatus } from '../../../shared/models/common.interface';
import { BookingService } from '../../../features/services/booking-services/booking-service';

@Component({
  selector: 'app-admin-booking-component',
  imports: [MatTabsModule, DatePipe],
  templateUrl: './admin-booking-component.html',
  styleUrl: './admin-booking-component.scss',
})
export class AdminBookingComponent {
  constructor(private readonly bookingService: BookingService) {}

  bookingStatuses: BookingStatus[] = ['Pending', 'Confirmed', 'Completed', 'Rejected', 'Cancelled'];
  allBookings: any[] = dummyData;

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

const dummyData: any[] = [
  {
    bookingId: 'b7f3a9d2-6c41-4e8a-9f25-1d8c7b3a5e60',
    clientId: 'c2a8f4e1-9b63-4d75-a012-6f5e8c3b7d29',
    bookingDate: '2026-07-18T16:00:00.000Z',
    bookingTime: '04:00 PM',
    location: 'Banjara Hills, Hyderabad',
    totalPrice: 5500,
    status: 'Pending',
    notes: 'Cocktail night makeup',
    reviewRating: null,
    reviewText: null,
    reviewDate: null,
    isActive: true,
    createdAt: '2026-07-12T11:04:38.000Z',
    client: {
      clientId: 'c2a8f4e1-9b63-4d75-a012-6f5e8c3b7d29',
      clientName: 'Ananya Iyer',
      phoneNumber: '+919812345678',
      email: 'ananya@example.com',
      address: 'Banjara Hills, Hyderabad',
      isActive: true,
    },
    bookingServices: [
      {
        bookingServiceId: 'bs91d4e7-2a68-4f30-bc15-8e6a3d7f9021',
        bookingId: 'b7f3a9d2-6c41-4e8a-9f25-1d8c7b3a5e60',
        serviceId: 's5c2e8a1-7d34-4f96-b021-9a6e3c8d5f47',
        assignedUserId: 'u3f8a1c6-5d72-4b90-ae34-7c2f9d6b8e15',
        servicePrice: 5500,
        isActive: true,
        service: {
          serviceId: 's5c2e8a1-7d34-4f96-b021-9a6e3c8d5f47',
          serviceName: 'Party Makeup',
          price: 5500,
          description: 'Professional party makeup',
          categoryId: 'cat8e4f2a-6b31-4d90-c725-1f9a3e7b5d62',
          isActive: true,
        },
      },
    ],
  },
  {
    bookingId: 'a1e6c9f4-3b72-4d85-8f20-6c9a7e2b5d31',
    clientId: 'd8b4f1a7-2c65-4e90-b3f8-9a6d1c7e5b42',
    bookingDate: '2026-07-20T10:30:00.000Z',
    bookingTime: '10:30 AM',
    location: 'Jubilee Hills, Hyderabad',
    totalPrice: 12000,
    status: 'Confirmed',
    notes: 'Bridal makeup appointment',
    reviewRating: null,
    reviewText: null,
    reviewDate: null,
    isActive: true,
    createdAt: '2026-07-13T09:20:00.000Z',
    client: {
      clientId: 'd8b4f1a7-2c65-4e90-b3f8-9a6d1c7e5b42',
      clientName: 'Priya Sharma',
      phoneNumber: '+919876543210',
      email: 'priya@example.com',
      address: 'Jubilee Hills, Hyderabad',
      isActive: true,
    },
    bookingServices: [
      {
        bookingServiceId: 'bs2f8c1a-6d43-4e90-b7a5-9c2f1d8e6b30',
        bookingId: 'a1e6c9f4-3b72-4d85-8f20-6c9a7e2b5d31',
        serviceId: 's7d3a9f2-1c68-4b50-e824-6f9a2d7c5b31',
        assignedUserId: 'u3f8a1c6-5d72-4b90-ae34-7c2f9d6b8e15',
        servicePrice: 12000,
        isActive: true,
        service: {
          serviceId: 's7d3a9f2-1c68-4b50-e824-6f9a2d7c5b31',
          serviceName: 'Bridal Makeup',
          price: 12000,
          description: 'Complete bridal makeup package',
          categoryId: 'cat8e4f2a-6b31-4d90-c725-1f9a3e7b5d62',
          isActive: true,
        },
      },
    ],
  },
  {
    bookingId: 'f4c8a2d6-9e31-4b75-a063-2d8f7c1e5a49',
    clientId: 'e7a2c9f5-1d63-4b80-a936-5f2e8c7a4d10',
    bookingDate: '2026-07-22T14:00:00.000Z',
    bookingTime: '02:00 PM',
    location: 'Madhapur, Hyderabad',
    totalPrice: 2500,
    status: 'Completed',
    notes: 'Arabic mehendi design',
    reviewRating: 5,
    reviewText: 'Beautiful design and excellent service!',
    reviewDate: '2026-07-23T10:00:00.000Z',
    isActive: true,
    createdAt: '2026-07-14T12:30:00.000Z',
    client: {
      clientId: 'e7a2c9f5-1d63-4b80-a936-5f2e8c7a4d10',
      clientName: 'Kavya Reddy',
      phoneNumber: '+919812345601',
      email: 'kavya@example.com',
      address: 'Madhapur, Hyderabad',
      isActive: true,
    },
    bookingServices: [
      {
        bookingServiceId: 'bs6a1e9c-4d72-8f30-b5c2-7a9e1d6f8b43',
        bookingId: 'f4c8a2d6-9e31-4b75-a063-2d8f7c1e5a49',
        serviceId: 's9f2c6a1-7d43-4e80-b528-1a6f9c3d7e25',
        assignedUserId: 'u3f8a1c6-5d72-4b90-ae34-7c2f9d6b8e15',
        servicePrice: 2500,
        isActive: true,
        service: {
          serviceId: 's9f2c6a1-7d43-4e80-b528-1a6f9c3d7e25',
          serviceName: 'Arabic Mehendi',
          price: 2500,
          description: 'Elegant Arabic mehendi design',
          categoryId: 'cat4b8e2f-6a31-4d90-c725-9f1e3b7d5c62',
          isActive: true,
        },
      },
    ],
  },
  {
    bookingId: 'c9e4a1f7-2d63-4b80-9a35-6f8c1e7d5b42',
    clientId: 'f2a7d9c5-6e31-4b80-a925-1c8f7d3e6b49',
    bookingDate: '2026-07-25T11:00:00.000Z',
    bookingTime: '11:00 AM',
    location: 'Kondapur, Hyderabad',
    totalPrice: 3500,
    status: 'Cancelled',
    notes: 'Hair styling for event',
    reviewRating: null,
    reviewText: null,
    reviewDate: null,
    isActive: false,
    createdAt: '2026-07-15T08:45:00.000Z',
    client: {
      clientId: 'f2a7d9c5-6e31-4b80-a925-1c8f7d3e6b49',
      clientName: 'Sneha Kapoor',
      phoneNumber: '+919845612378',
      email: 'sneha@example.com',
      address: 'Kondapur, Hyderabad',
      isActive: true,
    },
    bookingServices: [
      {
        bookingServiceId: 'bs8d2f6a-1c73-4e90-b528-9a6f3d7c5e41',
        bookingId: 'c9e4a1f7-2d63-4b80-9a35-6f8c1e7d5b42',
        serviceId: 's6a2f9c1-4d73-8e50-b625-1f9a3c7d8e42',
        assignedUserId: 'u3f8a1c6-5d72-4b90-ae34-7c2f9d6b8e15',
        servicePrice: 3500,
        isActive: false,
        service: {
          serviceId: 's6a2f9c1-4d73-8e50-b625-1f9a3c7d8e42',
          serviceName: 'Hair Styling',
          price: 3500,
          description: 'Professional hair styling for events',
          categoryId: 'cat7e2f9a-6b31-4d80-c525-1f8a3e7d9b62',
          isActive: true,
        },
      },
    ],
  },
  {
    bookingId: 'd5a9c2e7-1f63-4b80-a925-6c8e3d7f1b49',
    clientId: 'a8f3d1c6-7e42-4b90-b625-9f1a3c8d5e72',
    bookingDate: '2026-07-28T17:30:00.000Z',
    bookingTime: '05:30 PM',
    location: 'Gachibowli, Hyderabad',
    totalPrice: 1800,
    status: 'Pending',
    notes: 'Party hairstyle and makeup',
    reviewRating: null,
    reviewText: null,
    reviewDate: null,
    isActive: true,
    createdAt: '2026-07-16T14:10:00.000Z',
    client: {
      clientId: 'a8f3d1c6-7e42-4b90-b625-9f1a3c8d5e72',
      clientName: 'Meera Nair',
      phoneNumber: '+919912345678',
      email: 'meera@example.com',
      address: 'Gachibowli, Hyderabad',
      isActive: true,
    },
    bookingServices: [
      {
        bookingServiceId: 'bs4e8a2f-6d31-9c70-b528-1f7a3d9e5c42',
        bookingId: 'd5a9c2e7-1f63-4b80-a925-6c8e3d7f1b49',
        serviceId: 's3f7a1c9-6d42-4e80-b525-8a2f9c1d7e63',
        assignedUserId: 'u3f8a1c6-5d72-4b90-ae34-7c2f9d6b8e15',
        servicePrice: 1800,
        isActive: true,
        service: {
          serviceId: 's3f7a1c9-6d42-4e80-b525-8a2f9c1d7e63',
          serviceName: 'Party Hairstyle',
          price: 1800,
          description: 'Stylish hairstyle for parties and events',
          categoryId: 'cat7e2f9a-6b31-4d80-c525-1f8a3e7d9b62',
          isActive: true,
        },
      },
    ],
  },
];
