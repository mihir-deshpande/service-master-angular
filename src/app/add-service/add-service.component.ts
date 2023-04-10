import {Component, OnInit} from '@angular/core';
import {Service, ServiceService} from "../services/service.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  services: Service[] = []; // Initialize the services array
  constructor(private serviceService: ServiceService) {}

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
  } // Inject the ServiceService

  addServiceForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    providers: new FormControl<string>(''),
  });


  handleDelete(_id: string) {
    this.serviceService.deleteService(_id).subscribe({
      next: () => {
        this.services = this.services.filter((service) => service.service._id !== _id);
      }, error: (error) => {
        console.error(error);
        alert(JSON.stringify(error));
      }
    });
  }

  addService() {
    if (this.addServiceForm.valid) {
      let serviceTemp;
      if (this.addServiceForm.value.providers === "") {
        serviceTemp = {
          name: this.addServiceForm.value.name,
          description: this.addServiceForm.value.description,
        };
      } else {
        serviceTemp = {
          name: this.addServiceForm.value.name,
          description: this.addServiceForm.value.description,
          providers: this.addServiceForm.value.providers?.split(',').map(provider => provider.trim()) || []
        };
      }
      this.serviceService.addService(serviceTemp).subscribe({
        next: () => {
          this.serviceService.getServices().subscribe({
            next: (services) => {
              this.services = services;
              this.addServiceForm.reset();
            }, error: (error) => {
              console.error(error);
              alert(JSON.stringify(error));
            }
          });
        }, error: (error) => {
          console.error(error);
          alert(JSON.stringify(error));
        }
      });
    } else {
      alert("Invalid form")
    }
  }
}
