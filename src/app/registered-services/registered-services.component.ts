import {Component, OnInit} from '@angular/core';
import {Service, ServiceService} from "../services/service.service";

@Component({
  selector: 'app-registered-services',
  templateUrl: './registered-services.component.html',
  styleUrls: ['./registered-services.component.css']
})
export class RegisteredServicesComponent implements OnInit {
  services: Service[] = [];
  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.serviceService.getRegisteredServices().subscribe({
      next: (services) => {
        this.services = services;
      }, error: (error) => {
        console.error(error);
        alert(JSON.stringify(error));
      }
    });
  }

  unregisterService(_id: string) {
    this.serviceService.unregisterService(_id).subscribe({
      next: () => {
        this.services = this.services.filter((service) => service.service._id !== _id);
      }, error: (error) => {
        console.error(error);
        alert(JSON.stringify(error));
      }
    });
  }
}
