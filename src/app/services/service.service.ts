import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  apiURL = environment.UrlString; // URL to web api
  constructor(private http: HttpClient) {}

  // Get all services from the api
  getServices(): Observable<Service[]> {

    const userType = localStorage.getItem('user_type');
    const token = localStorage.getItem('token');
    console.log(token);
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

}
