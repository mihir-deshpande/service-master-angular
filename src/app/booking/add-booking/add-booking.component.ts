import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import {BookingService} from "../../services/booking.service";
import { ServiceService } from "../../services/service.service";
import { Service } from "../../services/service.service";


interface Provider {
  _id: string;
  name: string;
}

export const urgencyOptions = ["ASAP", "Anytime", "1 week"];

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css'],
})
export class AddBookingComponent implements OnInit {
  service: any;

  providers: Provider[] = [];

  urgencyOptions = urgencyOptions;

  addBookingForm = new FormGroup({
    urgency: new FormControl('', Validators.required),
    booking_description: new FormControl('', Validators.required),
    booking_address: new FormControl('', Validators.required),
    booking_date: new FormControl('', Validators.required),
    provider: new FormControl('', Validators.required),
  });


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    const service = JSON.parse(localStorage.getItem('selectedService') || '{}');
    if (service) {
      this.service = service;
      this.providers = this.service.providers;
    }
  }

  onSubmit() {
    if (this.addBookingForm.valid) {
      const bookingData = {
        ...this.addBookingForm.value,
        service: this.service.service._id,
      };

      this.bookingService
        .createBooking(bookingData)
        .pipe(
          catchError((error) => {
            alert(JSON.stringify(error.error));
            return throwError(error);
          }),
        )
        .subscribe(() => {
          alert('Booked');
          this.router.navigate(['/customer/bookings']);
        });
    } else {
      alert('Please fill in all fields');
    }
  }
}
