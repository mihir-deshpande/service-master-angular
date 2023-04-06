import { Component, OnInit } from '@angular/core';
import { Service } from './service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {
  services: Service[] = [
    // Dummy data for services
    {
      service: {
        _id: '1',
        name: 'Service 1',
        description: 'Description for Service 1',
        providers: ['Provider 1', 'Provider 2']
      },
      providers: [
        { _id: '1', },
        { _id: '2' }
      ]
    },
    {
      service: {
        _id: '2',
        name: 'Service 2',
        description: 'Description for Service 2',
        providers: ['Provider 1', 'Provider 2']
      },
      providers: [
        { _id: '1', },
        { _id: '2' }
      ]
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  handleBook(service: Service): void {
    // Handle the booking logic here
  }



}
