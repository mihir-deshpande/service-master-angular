import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {HomeComponent} from "./home/home.component";
import {ServiceComponent} from "./service/service.component";
import {AddBookingComponent} from "./booking/add-booking/add-booking.component";
import {ListBookingComponent} from "./booking/list-booking/list-booking.component";


const routes: Routes = [
  {path:'sign-up', component:SignUpComponent},
  {path:'sign-in', component:SignInComponent},
  {path:'customer/services', component:ServiceComponent},
  {path:'customer/book', component:AddBookingComponent},
  {path:'customer/bookings', component:ListBookingComponent},
  {path:'',component:HomeComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
