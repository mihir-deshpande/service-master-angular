import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {HomeComponent} from "./home/home.component";
import {ServiceComponent} from "./service/service.component";
import {AddBookingComponent} from "./booking/add-booking/add-booking.component";
import {ListBookingComponent} from "./booking/list-booking/list-booking.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {UsersComponent} from "./users/users.component";
import {UpdateUserComponent} from "./update-user/update-user.component";
import {AddServiceComponent} from "./add-service/add-service.component";
import {RegisteredServicesComponent} from "./registered-services/registered-services.component";
import {signedOutGuard} from "./guards/authentication/signed-out.guard";
import {signedInGuard} from "./guards/authentication/signed-in.guard";
import {adminGuard} from "./guards/authorization/admin.guard";
import {customerGuard} from "./guards/authorization/customer.guard";
import {providerGuard} from "./guards/authorization/provider.guard";

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'sign-up', component: SignUpComponent, canActivate: [signedOutGuard]},
  {path:'sign-in', component: SignInComponent, canActivate: [signedOutGuard]},
  {path:'admin', canActivate: [signedInGuard], canActivateChild: [adminGuard], children: [
      {path:'users', component: UsersComponent},
      {path:'update-user/:_id', component: UpdateUserComponent},
      {path:'add-service', component: AddServiceComponent},
      {path:'services', component: ServiceComponent},
    ]},
  {path: 'customer', canActivate: [signedInGuard], canActivateChild: [customerGuard], children: [
      {path:'services', component: ServiceComponent},
      {path:'bookings', component: ListBookingComponent},
      {path:'book', component: AddBookingComponent},
    ]},
  {path: 'provider', canActivate: [signedInGuard], canActivateChild: [providerGuard], children: [
      {path:'services', component: ServiceComponent},
      {path:'registered-services', component: RegisteredServicesComponent},
      {path:'bookings', component: ListBookingComponent},
    ]},
  {path:'**', component: NotFoundComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
