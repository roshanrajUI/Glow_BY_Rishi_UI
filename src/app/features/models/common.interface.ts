export type BookingStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface Category {
  categoryId: string;
  categoryName: string;
  description: string;
  isActive: boolean;
  services: Service[];
}

export interface Service {
  serviceId: string;
  serviceName: string;
  price: string;
  description: string;
  categoryId: string;
  category: Category;
  isActive: boolean;
}

export interface MyWorks extends Pagination {
  data: Work[];
}

export interface Work {
  workId: string;
  serviceId: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  workDate: Date;
  isActive: true;
  createdAt: Date;
  updatedAt: Date;
  service: Service;
  user: User;
}

export interface User {
  userId: string;
  userName: string;
  gmail: string;
  phoneNumber: string;
  password: string;
  role: string;
  isActive: true;
  createdAt: Date;
  updatedAt: Date;
}

export interface Pagination {
  pageSize: number;
  pageNumber: number;
  totalSize: number;
}

export interface MyWorkRequest {
  serviceId: string;
  categoryId: string;
  pageSize: number;
  pageNumber: number;
}

export interface Booking {
  bookingId: string;
  clientId: string;
  bookingDate: Date;
  location: string;
  status: BookingStatus;
  notes: string;
  reviewRating: number;
  reviewText: string;
  reviewDate: Date;
  isActive: true;
  client: Client;
  bookingServices: BookingServices[];
}

export interface BookingServices {
  bookingServiceId: string;
  bookingId: string;
  serviceId: string;
}

export interface Client {
  clientId: string;
  clientName: string;
  phoneNumber: string;
  gmail: string;
  address: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
