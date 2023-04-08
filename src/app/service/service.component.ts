import { Component, OnInit } from '@angular/core';
import { Service } from './service';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit { // Implement OnInit
  services: Service[] = []; // Initialize the services array

  constructor(private serviceService: ServiceService) {} // Inject the ServiceService

  ngOnInit(): void {
    // Call the service to get the services
    this.serviceService.getServices().subscribe(
      (services) => {
        this.services = services;
      },
      (error) => {
        console.error(error);
        alert(JSON.stringify(error));
      }
    );
  }

  handleBook(service: Service): void {
    // Handle the booking logic here
  }

  // Add other methods like handleDelete, handleRegister, etc.
}
