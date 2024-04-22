import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) { //esta función se declara en el service de auth
      return true; // Si el usuario está autenticado se le permite el acceso
    } else {
      this.router.navigate(['/auth']); // te redirige a la ruta especificada. Tambien puede ser una page de 404
      return false; // No permitir acceso
    }
  }
}
