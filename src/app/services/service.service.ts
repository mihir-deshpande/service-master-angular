import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, switchMap} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthService} from "./auth.service";

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

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  apiURL = environment.UrlString; // URL to web api

  // Add a new BehaviorSubject to store the selected service
  private serviceSource = new BehaviorSubject<Service | null>(null);
  selectedService = this.serviceSource.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  // Get all services from the api
  getServices(): Observable<Service[]> {
    return this.authService.signInStatus$.pipe(switchMap((data) => {
      const userType = data.userType;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${data.token}`);
      if (userType === environment.ProviderString) {
        return this.http.get<Service[]>(`${this.apiURL}/service/provider`, {headers});
      } else if (userType === environment.CustomerString) {
        return this.http.get<Service[]>(`${this.apiURL}/service/customer`, {headers});
      } else {
        return this.http.get<Service[]>(`${this.apiURL}/service/`, {headers});
      }
    }));
  }

  getRegisteredServices(): Observable<Service[]> {
    return this.authService.signInStatus$.pipe(switchMap((data) => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${data.token}`);
      return this.http.get<Service[]>(`${this.apiURL}/service/provider/registered`, {headers});
    }));
  }

  deleteService(_id: string) {
    return this.authService.signInStatus$.pipe(switchMap((data) => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${data.token}`);
      return this.http.delete(`${this.apiURL}/service/${_id}`, {headers});
    }));
  }

  addService(service: any | Service): Observable<Service> {
    return this.authService.signInStatus$.pipe(switchMap((data) => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${data.token}`);
      return this.http.post<Service>(`${this.apiURL}/service/`, service, {headers});
    }));
  }

  registerService(_id: string) {
    return this.authService.signInStatus$.pipe(switchMap((data) => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${data.token}`);
      return this.http.put(`${this.apiURL}/service/provider/${_id}`, {}, {headers});
    }));
  }

  unregisterService(_id: string) {
    return this.authService.signInStatus$.pipe(switchMap((data) => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${data.token}`);
      return this.http.delete(`${this.apiURL}/service/provider/${_id}`, {headers});
    }));
  }
}
