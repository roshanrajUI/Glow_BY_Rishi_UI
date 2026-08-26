import { Injectable } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { API_URL } from '../../../constants/rest-url';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private readonly apiService: ApiService) {}

  getBookings<R>(status?: string): Observable<R> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.apiService.httpGet<R>(API_URL.BOOKINGS, params);
  }

  getBookingReviews<R>(): Observable<R> {
    return this.apiService.httpGet<R>(API_URL.BOOKING_REVIEWS);
  }

  updateBookingStatus<R, B>(body: B): Observable<R> {
    return this.apiService.httpPost<R>(API_URL.UPDATEBOOKINGSTATUS, body);
  }

  createBooking<B, R>(body: B): Observable<R> {
    return this.apiService.httpPost(API_URL.CREATEBOOKING, body);
  }

  createBookingReview<B, R>(body: B): Observable<R> {
    return this.apiService.httpPost(API_URL.CREATEBOOKINGREVIEW, body);
  }

  getClientBookings<B, R>(body: B): Observable<R> {
    return this.apiService.httpPost(API_URL.CLIENTBOOKINS, body);
  }

  verifyBookingOtp<B, R>(body: B): Observable<R> {
    return this.apiService.httpPost(API_URL.VERIFYBOOKINGOTP, body);
  }

  resendOtp<B, R>(body: B): Observable<R> {
    return this.apiService.httpPost(API_URL.RESENDOTP, body);
  }
}
