import {Component, OnInit} from '@angular/core';
import {Booking, BookingService} from '../../services/booking.service';
import {AuthService} from '../../services/auth.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.css'],
})
export class ListBookingComponent implements OnInit {
  bookings: Booking[] = [];
  newDates: { [key: string]: string } = {};
  userType: string | undefined;
  loading = true;

  rescheduleVisible: { [key: string]: boolean } = {};
  protected readonly environment = environment;

  constructor(private bookingService: BookingService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.fetchBookings();
    this.authService.signInStatus$.subscribe({
      next: (status) => {
        this.userType = status.userType;
      },
    });
  }

  fetchBookings(): void {
    this.authService.signInStatus$.subscribe((status) => {
      this.bookingService.getBookingsByUserType(status.userType).subscribe((bookings) => {
        this.bookings = bookings;
        this.loading = false;
      });
    });
  }

  handleDelete(id: string): void {
    this.bookingService.deleteBooking(id).subscribe(() => this.fetchBookings());
  }

  handleReschedule(id: string, newDate: string): void {
    this.bookingService.updateBookingDate(id, newDate).subscribe(() => {
      this.fetchBookings();
      this.rescheduleVisible[id] = false;
    });
  }
}
