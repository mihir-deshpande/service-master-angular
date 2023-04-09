import {environment} from "../../../environments/environment";
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

export const customerGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.signInStatus$.subscribe((status) => {
    if (status.userType === environment.CustomerString) {
      return true;
    } else {
      return router.navigateByUrl('/');
    }
  });
};
