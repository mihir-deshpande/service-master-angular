import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {Observable, of} from "rxjs";
import {Service} from "./service.service";


export interface Booking {
  booking: any;
  service: any;
  customer: any;
  provider: any;
}
@Injectable({
  providedIn: 'root',
})
export class BookingService {
  url: string = environment.UrlString;

  constructor(private http: HttpClient) {}

  createBooking(bookingData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.post(`${this.url}/booking`, bookingData, { headers });
  }

  getBookingsByUserType(userType: string): Observable<Booking[]>{
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    if (userType === 'PROVIDER') {
      return this.http.get<Booking[]>(`${this.url}/booking/provider`, { headers });
    } else if (userType === 'CUSTOMER') {
      return this.http.get<Booking[]>(`${this.url}/booking/customer`, { headers });
    }
    else {
      return this.http.get<Booking[]>(`${this.url}/booking/`, { headers });
    }
  }

  updateBookingDate(id: string, booking_date: string) {
    return this.http.put(
      `${this.url}/booking/date/${id}`,
      { booking_date },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
  }

  deleteBooking(id: string) {
    return this.http.delete(`${this.url}/booking/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
  }
}
