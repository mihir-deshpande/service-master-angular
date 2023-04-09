import {environment} from "../../../environments/environment";
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  authService.signInStatus$.subscribe((status) => {
    if (status.userType === environment.AdminString) {
      return true;
    } else {
      return router.navigateByUrl('/');
    }
  });
};
