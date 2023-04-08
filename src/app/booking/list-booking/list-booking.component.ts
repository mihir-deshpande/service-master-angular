import { Component, OnInit } from '@angular/core';
import { BookingService, Booking } from '../../services/booking.service';

@Component({
  selector: 'app-list-booking',
  templateUrl: './list-booking.component.html',
  styleUrls: ['./list-booking.component.css']
})
export class ListBookingComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
  }

}
