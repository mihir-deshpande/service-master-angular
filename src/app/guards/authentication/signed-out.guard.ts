import {inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

export const signedOutGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.signInStatus$.subscribe((status) => {
    if (status.isSignedIn) {
      return router.navigateByUrl('/');
    } else {
      return true;
    }
  });
};
