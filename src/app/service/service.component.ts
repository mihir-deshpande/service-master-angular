import { Component, OnInit } from '@angular/core';
import {Service, ServiceService} from '../services/service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit { // Implement OnInit
  services: Service[] = []; // Initialize the services array

  constructor(private router: Router, private serviceService: ServiceService) {} // Inject the ServiceService

  ngOnInit(): void {
    // Call the service to get the services
    this.serviceService.getServices().subscribe({
      next: (services) => {
        this.services = services;
      }, error: (error) => {
        console.error(error);
        alert(JSON.stringify(error));
      }
    });
  }

  handleBook(service: Service): void {
      this.router.navigateByUrl('customer/book', {state: service}).then(() => {});
  }
}
