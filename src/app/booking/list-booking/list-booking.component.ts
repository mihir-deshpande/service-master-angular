import { Component, OnInit } from '@angular/core';
import { BookingService, Booking } from '../../services/booking.service';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.css']
})
export class ListBookingComponent implements OnInit {
  bookings: Booking[] = [];
  newDates: { [key: string]: string } = {};

  rescheduleVisible: { [key: string]: boolean } = {};

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    const userType = localStorage.getItem('user_type') || '';
    this.bookingService.getBookingsByUserType(userType)
      .subscribe(bookings => this.bookings = bookings);
  }

  handleDelete(id: string): void {
    this.bookingService.deleteBooking(id).subscribe(() => this.fetchBookings());
  }

  handleReschedule(id: string, newDate: string): void {
    this.bookingService.updateBookingDate(id, newDate).subscribe(() => this.fetchBookings());
  }
}
