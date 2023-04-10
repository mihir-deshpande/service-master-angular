import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable, switchMap} from "rxjs";
import {AuthService} from "./auth.service";


interface booking {
  _id: string;
  booking_date: string;
  booking_address: string;
  booking_description: string;
}

export interface Booking {
  booking: booking;
  service: any;
  customer: any;
  provider: any;
}
@Injectable({
  providedIn: 'root',
})
export class BookingService {
  url: string = environment.UrlString;

  constructor(private http: HttpClient, private authService: AuthService) {}

  createBooking(bookingData: any): Observable<any> {
    return this.authService.signInStatus$.pipe(switchMap((data) => {
      const headers = { Authorization: `Bearer ${data.token}` };
      return this.http.post(`${this.url}/booking`, bookingData, { headers });
    }));
  }

  getBookingsByUserType(userType: string | undefined): Observable<Booking[]>{
    return this.authService.signInStatus$.pipe(switchMap((data) => {
      const headers = { Authorization: `Bearer ${data.token}` };
      if (userType === environment.ProviderString) {
        return this.http.get<Booking[]>(`${this.url}/booking/provider`, { headers });
      } else if (userType === environment.CustomerString) {
        return this.http.get<Booking[]>(`${this.url}/booking/customer`, { headers });
      } else {
        return this.http.get<Booking[]>(`${this.url}/booking/`, { headers });
      }
    }));
  }

  updateBookingDate(id: string, booking_date: string) {
    return this.authService.signInStatus$.pipe(switchMap((data) => {
      return this.http.put(`${this.url}/booking/date/${id}`, { booking_date }, { headers: { Authorization: `Bearer ${data.token}` } });
    }));
  }

  deleteBooking(id: string) {
    return this.authService.signInStatus$.pipe(switchMap((data) => {
      return this.http.delete(`${this.url}/booking/${id}`, { headers: { Authorization: `Bearer ${data.token}` } });
    }));
  }
}
