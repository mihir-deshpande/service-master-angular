import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisteredServicesComponent} from './registered-services.component';

describe('RegisteredServicesComponent', () => {
  let component: RegisteredServicesComponent;
  let fixture: ComponentFixture<RegisteredServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisteredServicesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisteredServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
