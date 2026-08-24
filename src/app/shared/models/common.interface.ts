export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Rejected' | 'Cancelled';

export interface Client {
  clientId: string;
  clientName: string;
  phoneNumber: string;
  gmail: string;
  address: string;
  isActive: boolean;
  //   createdAt: Date;
  //   updatedAt: Date;
}

export interface Booking {
  bookingId: string;
  bookingNumber: string;
  clientId: string;
  bookingDate: Date | string;
  bookingTime: string;
  location: string;
  totalPrice: number;
  status: BookingStatus;
  notes: string | null;
  reviewRating: number | null;
  reviewText: string | null;
  reviewDate: Date | null | string;
  isActive: boolean;
  createdAt: Date | string;
  //   updatedAt: Date;
  client: Client;
  bookingServices: BookingService[];
}

export interface Category {
  categoryId: string;
  categoryName: string;
  description: string;
  isActive: boolean;
  //   createdAt: Date;
  //   updatedAt: Date;
}

export interface Service {
  serviceId: string;
  serviceName: string;
  price: number;
  description: string;
  categoryId: string;
  isActive: boolean;
  //   createdAt: Date;
  //   updatedAt: Date;
  category: Category;
}

export interface BookingService {
  bookingServiceId: string;
  bookingId: string;
  serviceId: string;
  assignedUserId: string;
  price: number;
  isActive: boolean;
  //   createdAt: Date;
  //   updatedAt: Date;
  service: Service;
}
