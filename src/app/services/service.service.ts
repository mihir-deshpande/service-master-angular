import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from '../../environments/environment';

// Interface for the service
export interface Service {
  service: {
    _id: string;
    name: string;
    description: string;
    providers: string[];
  };
  providers: [
    {
      _id: string;
      name: string;
    }
  ];
}

// Service for the services component
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  apiURL = environment.UrlString; // URL to web api

  // Add a new BehaviorSubject to store the selected service
  private serviceSource = new BehaviorSubject<Service | null>(null);
  selectedService = this.serviceSource.asObservable();
  constructor(private http: HttpClient) {}

  // Get all services from the api
  getServices(): Observable<Service[]> {

    const userType = localStorage.getItem('user_type');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    if (userType === 'PROVIDER') {
      return this.http.get<Service[]>(`${this.apiURL}/service/provider`, { headers });
    }
    else if (userType === 'CUSTOMER') {
      return this.http.get<Service[]>(`${this.apiURL}/service/customer`, { headers });
    }
    else {
      return this.http.get<Service[]>(`${this.apiURL}/service/`, { headers });
    }
  }

  // Method to set the selected service
  setSelectedService(service: Service): void {
    localStorage.setItem('selectedService', JSON.stringify(service));
    this.serviceSource.next(service);
  }


  // Clear the selected service
  clearSelectedService(): void {
    localStorage.removeItem('selectedService');
    this.serviceSource.next(null);
  }

  // Method to get the selected service as an Observable
  getSelectedService(): Observable<Service | null> {
    const service = JSON.parse(localStorage.getItem('selectedService') || '{}');
    this.serviceSource.next(service);
    return this.serviceSource;
  }

}
