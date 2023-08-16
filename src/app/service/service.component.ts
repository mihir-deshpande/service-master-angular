import {Component, OnInit} from '@angular/core';
import {Service, ServiceService} from '../services/service.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent implements OnInit {
  services: Service[] = [];
  userType: string | undefined;
  loading = true;
  protected readonly environment = environment;

  constructor(
    private router: Router,
    private serviceService: ServiceService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.serviceService.getServices().subscribe({
      next: (services) => {
        this.services = services;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        alert(JSON.stringify(error));
        this.loading = false;
      },
    });

    this.authService.signInStatus$.subscribe({
      next: (status) => {
        this.userType = status.userType;
      },
    });
  }

  handleBook(service: Service): void {
    this.router.navigateByUrl('customer/book', {state: service}).then(() => {
    });
  }

  handleDelete(_id: string) {
    this.serviceService.deleteService(_id).subscribe({
      next: () => {
        this.services = this.services.filter((service) => service.service._id !== _id);
      },
      error: (error) => {
        console.error(error);
        alert(JSON.stringify(error));
      },
    });
  }

  handleRegister(_id: string) {
    this.serviceService.registerService(_id).subscribe({
      next: () => {
        this.router.navigateByUrl('provider/registered-services').then(() => {
        });
      },
      error: (error) => {
        console.error(error);
        alert(JSON.stringify(error));
      },
    });
  }
}
